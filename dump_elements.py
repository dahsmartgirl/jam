import re
from bs4 import BeautifulSoup

with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

sections = {
    "Find warm leads": None,
    "Drafts in your voice": None,
    "Lead enrichment": None,
    "Auto warm-up": None,
    "One inbox for every account": None
}

for heading_text in sections.keys():
    # Find h3 or h2 with this text
    for tag in ['h2', 'h3']:
        element = soup.find(tag, string=lambda text: text and heading_text in text)
        if element:
            # Go up to the card container
            # Usually, the card container is a div parent of the heading's wrapper, or we can go up a few levels.
            # Let's find the ancestor that represents the card/section.
            curr = element
            # We look for a parent that is a direct child of the grid or has border/rounded classes
            while curr.parent:
                parent_classes = curr.parent.get('class', [])
                if any(cls in ['relative', 'border-border', 'bg-card', 'flex'] for cls in parent_classes):
                    if 'grid' in parent_classes or 'main' in parent_classes or len(parent_classes) == 0:
                        break
                    curr = curr.parent
                else:
                    curr = curr.parent
            sections[heading_text] = curr
            break

# Print HTML for each section
for name, elem in sections.items():
    print(f"\n==================================================")
    print(f"SECTION: {name}")
    print(f"==================================================")
    if elem:
        print(elem.prettify()[:4000]) # Print first 4k chars of prettified HTML
        if len(elem.prettify()) > 4000:
            print("... [TRUNCATED] ...")
    else:
        print("NOT FOUND")
