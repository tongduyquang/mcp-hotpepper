"""
Hot Pepper Area Extraction Utilities

This module provides functions to extract area codes and names from Hot Pepper's 
HTML structures, including large service areas, service areas, and middle areas.
"""

import json
import re
from typing import List, Dict, Any
from bs4 import BeautifulSoup


def extract_middle_areas_from_select(select_html: str, service_area_code: str, output_dir: str = "areas") -> str:
    """
    Extract middle area information from HTML select structure and save to individual JSON file.
    
    This function parses HTML select elements containing option tags with Y-codes
    (middle areas), extracts the area codes and names, and creates a separate JSON file
    for each service area using the first option text as the filename.
    
    Args:
        select_html (str): HTML content containing select element with middle areas
        service_area_code (str): The parent service area code (e.g., "SA41")
        output_dir (str): Directory to save the JSON files (default: "areas")
    
    Returns:
        str: Path to the created JSON file
    
    Example:
        >>> html = '<select><option value="">北海道のエリアすべて</option><option value="Y500">すすきの</option></select>'
        >>> extract_middle_areas_from_select(html, "SA41")
        'areas/北海道のエリアすべて.json'
    """
    import os
    
    soup = BeautifulSoup(select_html, 'html.parser')
    middle_areas = []
    area_name = ""
    
    # Find all option elements
    options = soup.find_all('option')
    
    # Get the first option (usually the "all areas" option) for filename
    if options:
        first_option = options[0]
        area_name = first_option.get_text(strip=True)
        # Clean filename (remove invalid characters)
        area_name = re.sub(r'[<>:"/\\|?*]', '_', area_name)
    
    # Extract Y codes (middle areas) from remaining options
    for option in options:
        value = option.get('value')
        name = option.get_text(strip=True)
        
        # Extract Y codes (middle areas) - ensure value is a string and not empty
        if value and isinstance(value, str) and value.startswith('Y'):
            middle_area_data = {
                "code": value,
                "name": name,
                "service_area": service_area_code,  # Reference to parent service area
                "small_area": []  # Empty array ready to be filled with X-codes
            }
            middle_areas.append(middle_area_data)
    
    # Create the data structure
    area_data = {
        "service_area_code": service_area_code,
        "area_name": area_name,
        "middle_area": middle_areas
    }
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Create filename from area name
    if not area_name:
        area_name = f"area_{service_area_code}"
    
    filename = f"{area_name}.json"
    filepath = os.path.join(output_dir, filename)
    
    # Save to JSON file
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(area_data, f, ensure_ascii=False, indent=2)
    
    return filepath


def add_small_areas_to_json(json_file_path: str, middle_area_code: str, small_areas_html: str) -> str:
    """
    Add small areas to a specific middle area in an existing JSON file.
    
    Args:
        json_file_path (str): Path to the existing area JSON file
        middle_area_code (str): The middle area code to add small areas to (e.g., "Y200")
        small_areas_html (str): HTML content containing select element with small areas (X-codes)
    
    Returns:
        str: Path to the updated JSON file
        
    Example:
        add_small_areas_to_json("areas/大阪のエリアすべて.json", "Y200", small_areas_html)
    """
    # Extract small areas from HTML
    small_areas = extract_small_areas_from_select(small_areas_html, middle_area_code)
    
    # Read existing JSON file
    with open(json_file_path, 'r', encoding='utf-8') as f:
        area_data = json.load(f)
    
    # Find the middle area and update its small_area array
    for middle_area in area_data['middle_area']:
        if middle_area['code'] == middle_area_code:
            middle_area['small_area'] = small_areas
            break
    
    # Save updated data back to file
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(area_data, f, ensure_ascii=False, indent=2)
    
    return json_file_path


def extract_small_areas_from_select(select_html: str, middle_area_code: str) -> List[Dict[str, str]]:
    """
    Extract small area information from HTML select structure.
    
    This function would be used for extracting X-codes (small areas) if available.
    
    Args:
        select_html (str): HTML content containing select element with small areas
        middle_area_code (str): The parent middle area code (e.g., "Y500")
    
    Returns:
        List[Dict[str, str]]: List of small area dictionaries with:
            - code: The X-code identifier (e.g., "X123")
            - name: The area name
            - middle_area: Reference to parent middle area code
    """
    soup = BeautifulSoup(select_html, 'html.parser')
    small_areas = []
    
    # Find all option elements with X codes
    options = soup.find_all('option')
    for option in options:
        value = option.get('value')
        name = option.get_text(strip=True)
        
        # Extract X codes (small areas) - ensure value is a string and not empty
        if value and isinstance(value, str) and value.startswith('X'):
            small_area_data = {
                "code": value,
                "name": name,
                "middle_area": middle_area_code  # Reference to parent middle area
            }
            small_areas.append(small_area_data)
    
    return small_areas


def demo_usage():
    """Demonstrate usage of the area extraction utilities."""
    print("🏗️  Hot Pepper Area Extraction Utilities Demo")
    print("=" * 50)
    
    # Example middle area extraction
    sample_html = """
    <select name="MA" class="selectArea">
        <option value="">北海道のエリアすべて</option>
        <option value="Y500">すすきの</option>
        <option value="Y505">札幌（札幌駅・大通）</option>
        <option value="Y530">旭川</option>
    </select>
    """
    
    # Extract and save to file
    output_file = extract_middle_areas_from_select(sample_html, "SA41")
    print(f"\n📁 Created file: {output_file}")
    
    # Read and display the created file
    with open(output_file, 'r', encoding='utf-8') as f:
        area_data = json.load(f)
    
    print(f"\n📍 File contains {len(area_data['middle_area'])} middle areas:")
    for area in area_data['middle_area']:
        print(f"   {area['code']}: {area['name']} (small_area: {area['small_area']})")
    
    print(f"\n🔧 Structure includes:")
    print(f"   - service_area_code: {area_data['service_area_code']}")
    print(f"   - area_name: {area_data['area_name']}")
    print(f"   - middle_area: {len(area_data['middle_area'])} items (each with empty small_area array)")
    
    # Show sample structure of middle areas
    if area_data['middle_area']:
        sample_area = area_data['middle_area'][0]
        print(f"   - Each middle area has small_area: {sample_area['small_area']} (ready to be filled)")
    
    # Demo adding small areas
    print(f"\n🔧 Demo: Adding small areas to middle area Y500...")
    sample_small_areas_html = """
    <select name="SA" class="selectArea">
        <option value="">すすきののエリアすべて</option>
        <option value="X100">すすきの南</option>
        <option value="X101">すすきの北</option>
    </select>
    """
    
    updated_file = add_small_areas_to_json(output_file, "Y500", sample_small_areas_html)
    
    # Read and show updated structure
    with open(updated_file, 'r', encoding='utf-8') as f:
        updated_data = json.load(f)
    
    susukino_area = next(area for area in updated_data['middle_area'] if area['code'] == 'Y500')
    print(f"   - Y500 now contains {len(susukino_area['small_area'])} small areas:")
    for small_area in susukino_area['small_area']:
        print(f"     * {small_area['code']}: {small_area['name']}")


if __name__ == "__main__":
    demo_usage()