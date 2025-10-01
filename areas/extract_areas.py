#!/usr/bin/env python3
"""
Script to extract area codes and names from Hot Pepper HTML structure
and organize them into a structured JSON format.
"""

import json
import re
from bs4 import BeautifulSoup

def extract_middle_areas_from_select(select_html, service_area_code):
    """
    Extract middle area information from HTML select structure.
    
    Args:
        select_html (str): HTML content containing select element with middle areas
        service_area_code (str): The parent service area code (e.g., "SA41")
    
    Returns:
        list: List of middle area dictionaries with code, name, and parent reference
    """
    soup = BeautifulSoup(select_html, 'html.parser')
    middle_areas = []
    
    # Find all option elements with Y codes
    options = soup.find_all('option')
    for option in options:
        value = option.get('value')
        name = option.get_text(strip=True)
        
        # Extract Y codes (middle areas) - ensure value is a string and not empty
        if value and isinstance(value, str) and value.startswith('Y'):
            middle_area_data = {
                "code": value,
                "name": name,
                "service_area": service_area_code  # Reference to parent service area
            }
            middle_areas.append(middle_area_data)
    
    return middle_areas

def extract_areas_from_html():
    """
    Extract area information from the provided HTML structure.
    
    Returns:
        dict: Structured area data organized by type
    """
    
    # The HTML content provided by the user
    html_content = """
    <ul class="areaSelectList">
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="北海道・東北">北海道・東北</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="北海道・東北" style="transform: translateX(-40px);">
						<ul class="saList">
							<li>
									<a href="/SA41/">北海道</a>
								</li>
							<li>
									<a href="/SA51/">青森</a>
								</li>
							<li>
									<a href="/SA54/">秋田</a>
								</li>
							<li>
									<a href="/SA55/">山形</a>
								</li>
							<li>
									<a href="/SA52/">岩手</a>
								</li>
							<li>
									<a href="/SA53/">宮城</a>
								</li>
							<li>
									<a href="/SA56/">福島</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="関東">関東</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="関東" style="transform: translateX(79px);">
						<ul class="saList">
							<li>
									<a href="/SA11/">東京</a>
								</li>
							<li>
									<a href="/SA12/">神奈川</a>
								</li>
							<li>
									<a href="/SA13/">埼玉</a>
								</li>
							<li>
									<a href="/SA14/">千葉</a>
								</li>
							<li>
									<a href="/SA16/">栃木</a>
								</li>
							<li>
									<a href="/SA15/">茨城</a>
								</li>
							<li>
									<a href="/SA17/">群馬</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="北陸・甲信越">北陸・甲信越</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="北陸・甲信越" style="transform: translateX(142px);">
						<ul class="saList">
							<li>
									<a href="/SA61/">新潟</a>
								</li>
							<li>
									<a href="/SA65/">山梨</a>
								</li>
							<li>
									<a href="/SA66/">長野</a>
								</li>
							<li>
									<a href="/SA63/">石川</a>
								</li>
							<li>
									<a href="/SA62/">富山</a>
								</li>
							<li>
									<a href="/SA64/">福井</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="中部">中部</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="中部" style="transform: translateX(261px);">
						<ul class="saList">
							<li>
									<a href="/SA33/">愛知</a>
								</li>
							<li>
									<a href="/SA31/">岐阜</a>
								</li>
							<li>
									<a href="/SA32/">静岡</a>
								</li>
							<li>
									<a href="/SA34/">三重</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="関西">関西</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="関西" style="transform: translateX(90px);">
						<ul class="saList">
							<li>
									<a href="/SA23/">大阪</a>
								</li>
							<li>
									<a href="/SA24/">兵庫</a>
								</li>
							<li>
									<a href="/SA22/">京都</a>
								</li>
							<li>
									<a href="/SA21/">滋賀</a>
								</li>
							<li>
									<a href="/SA25/">奈良</a>
								</li>
							<li>
									<a href="/SA26/">和歌山</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="中国">中国</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="中国" style="transform: translateX(214px);">
						<ul class="saList">
							<li>
									<a href="/SA73/">岡山</a>
								</li>
							<li>
									<a href="/SA74/">広島</a>
								</li>
							<li>
									<a href="/SA71/">鳥取</a>
								</li>
							<li>
									<a href="/SA72/">島根</a>
								</li>
							<li>
									<a href="/SA75/">山口</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="四国">四国</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="四国" style="transform: translateX(326px);">
						<ul class="saList">
							<li>
									<a href="/SA82/">香川</a>
								</li>
							<li>
									<a href="/SA81/">徳島</a>
								</li>
							<li>
									<a href="/SA83/">愛媛</a>
								</li>
							<li>
									<a href="/SA84/">高知</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		<li>
				<dl class="globalAreaList">
					<dt>
						<a href="javascript:void(0);" class="jscAppearArealistTrigger" data-ga="九州・沖縄">九州・沖縄</a>
					</dt>
					<dd class="jscAppearArealistTarget" data-ga="九州・沖縄" style="transform: translateX(223px);">
						<ul class="saList">
							<li>
									<a href="/SA91/">福岡</a>
								</li>
							<li>
									<a href="/SA92/">佐賀</a>
								</li>
							<li>
									<a href="/SA93/">長崎</a>
								</li>
							<li>
									<a href="/SA94/">熊本</a>
								</li>
							<li>
									<a href="/SA95/">大分</a>
								</li>
							<li>
									<a href="/SA96/">宮崎</a>
								</li>
							<li>
									<a href="/SA97/">鹿児島</a>
								</li>
							<li>
									<a href="/SA98/">沖縄</a>
								</li>
							</ul>
					</dd>
				</dl>
			</li>
		</ul>
    """
    
    # Parse HTML with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Initialize the structure
    areas_data = {
        "large_service_area": [],  # SS codes - Regional groupings
        "service_area": [],        # SA codes - Prefectures
        "large_area": [],          # Z codes - Not found in provided HTML
        "middle_area": [],         # Y codes - Not found in provided HTML  
        "small_area": []           # X codes - Not found in provided HTML
    }
    
    # Extract large service areas and service areas
    global_area_lists = soup.find_all('dl', class_='globalAreaList')
    
    ss_code_counter = 1  # Generate SS codes starting from SS01
    
    for global_area in global_area_lists:
        # Extract large service area (regional grouping)
        dt_element = global_area.find('dt')
        ss_code = ""  # Initialize to avoid unbound variable
        
        if dt_element:
            anchor = dt_element.find('a')
            if anchor and anchor.get('data-ga'):
                large_service_area_name = anchor['data-ga']
                ss_code = f"SS{ss_code_counter:02d}"
                
                large_service_area_data = {
                    "code": ss_code,
                    "name": large_service_area_name
                }
                areas_data["large_service_area"].append(large_service_area_data)
                
                ss_code_counter += 1
        
        # Extract service areas (prefectures)
        sa_list = global_area.find('ul', class_='saList')
        if sa_list and ss_code:  # Only process if we have a valid ss_code
            sa_items = sa_list.find_all('li')
            for sa_item in sa_items:
                link = sa_item.find('a')
                if link:
                    href = link.get('href')
                    name = link.get_text(strip=True)
                    
                    # Extract SA code from href (e.g., "/SA41/" -> "SA41")
                    if href and isinstance(href, str):
                        sa_match = re.search(r'/SA(\d+)/', href)
                        if sa_match:
                            sa_code = f"SA{sa_match.group(1)}"
                            
                            service_area_data = {
                                "code": sa_code,
                                "name": name,
                                "large_service_area": ss_code  # Reference to parent region
                            }
                            areas_data["service_area"].append(service_area_data)
    
    return areas_data

def demo_middle_area_extraction():
    """Demonstrate middle area extraction from select HTML."""
    print("\n🔍 Demonstrating Middle Area Extraction...")
    
    # Import the new extraction function
    import sys
    import os
    sys.path.append(os.path.join(os.path.dirname(__file__), 'src', 'tools'))
    from area_extractor import extract_middle_areas_from_select
    
    # Sample select HTML provided by user
    sample_select_html = """
    <select name="MA" class="selectArea">
        <option value="">北海道のエリアすべて</option>
        <option value="Y500">すすきの</option>
        <option value="Y505">札幌（札幌駅・大通）</option>
        <option value="Y510">麻生・北24条（北区・東区）</option>
        <option value="Y511">南郷・新札幌　白石・厚別・清田</option>
        <option value="Y512">琴似・円山公園　中央・西・手稲</option>
        <option value="Y513">平岸・澄川（豊平区・南区）</option>
        <option value="Y530">旭川</option>
        <option value="Y883">函館</option>
        <option value="Y884">小樽・千歳・苫小牧・札幌近郊</option>
        <option value="Y501">室蘭・登別・白老</option>
        <option value="Y885">帯広・釧路・北見・河東郡</option>
        <option value="Y502">富良野・その他北海道</option>
    </select>
    """
    
    # Extract middle areas for Hokkaido (SA41) and create individual JSON file
    output_file = extract_middle_areas_from_select(sample_select_html, "SA41")
    print(f"📁 Created individual area file: {output_file}")
    
    # Read the created file and display information
    with open(output_file, 'r', encoding='utf-8') as f:
        area_data = json.load(f)
    
    print(f"📊 File contains {len(area_data['middle_area'])} middle areas for {area_data['area_name']} ({area_data['service_area_code']}):")
    for area in area_data['middle_area']:
        print(f"   {area['code']}: {area['name']} (belongs to {area['service_area']})")
    
    print(f"🔧 File structure includes 'small_area' object ready to be filled: {type(area_data['small_area']).__name__}")
    
    return area_data['middle_area']

def main():
    """Main function to extract areas and save to JSON file."""
    print("Extracting area data from HTML...")
    
    # Extract the areas
    areas = extract_areas_from_html()
    
    # Demonstrate middle area extraction
    sample_middle_areas = demo_middle_area_extraction()
    
    # Add sample middle areas to the main data structure for demonstration
    areas["middle_area"].extend(sample_middle_areas)
    
    # Save to JSON file
    output_file = "hotpepper_areas.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(areas, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Area data extracted successfully!")
    print(f"📁 Saved to: {output_file}")
    print(f"📊 Statistics:")
    print(f"   - Large Service Areas (SS): {len(areas['large_service_area'])}")
    print(f"   - Service Areas (SA): {len(areas['service_area'])}")
    print(f"   - Large Areas (Z): {len(areas['large_area'])}")
    print(f"   - Middle Areas (Y): {len(areas['middle_area'])}")
    print(f"   - Small Areas (X): {len(areas['small_area'])}")
    
    # Display sample data
    print(f"\n📋 Sample Large Service Areas:")
    for area in areas['large_service_area'][:3]:
        print(f"   {area['code']}: {area['name']}")
    
    print(f"\n📋 Sample Service Areas:")
    for area in areas['service_area'][:5]:
        print(f"   {area['code']}: {area['name']} (belongs to {area['large_service_area']})")
    
    if areas['middle_area']:
        print(f"\n📋 Sample Middle Areas:")
        for area in areas['middle_area'][:5]:
            print(f"   {area['code']}: {area['name']} (belongs to {area['service_area']})")

if __name__ == "__main__":
    main()