#!/usr/bin/env python3
"""
Simple wrapper function for extracting Hot Pepper middle areas
and creating individual JSON files for each service area.
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src', 'tools'))
from area_extractor import extract_middle_areas_from_select

def create_area_json(select_html: str, service_area_code: str, output_dir: str = "areas") -> str:
    """
    Simple wrapper function to create individual JSON files for Hot Pepper areas.
    
    Takes HTML select content, extracts middle areas (Y codes), and creates a JSON file
    named after the first option text with the following structure:
    {
      "service_area_code": "SA##",
      "area_name": "Prefecture name",
      "middle_area": [...],
      "small_area": {}
    }
    
    Args:
        select_html (str): HTML select content with middle area options
        service_area_code (str): Parent service area code (e.g., "SA41")
        output_dir (str): Directory to save JSON files (default: "areas")
    
    Returns:
        str: Path to the created JSON file
        
    Example:
        html = '''
        <select name="MA" class="selectArea">
            <option value="">北海道のエリアすべて</option>
            <option value="Y500">すすきの</option>
        </select>
        '''
        file_path = create_area_json(html, "SA41")
        # Creates: areas/北海道のエリアすべて.json
    """
    return extract_middle_areas_from_select(select_html, service_area_code, output_dir)

if __name__ == "__main__":
    # Example usage
    sample_html = """
    <select name="MA" class="selectArea">
        <option value="">北海道のエリアすべて</option>
        <option value="Y500">すすきの</option>
        <option value="Y505">札幌（札幌駅・大通）</option>
        <option value="Y530">旭川</option>
    </select>
    """
    
    file_path = create_area_json(sample_html, "SA41", "example_areas")
    print(f"✅ Created: {file_path}")