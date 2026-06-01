import re
from bs4 import BeautifulSoup

with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("=== HEADINGS ===")
for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    parent_classes = h.parent.get('class', []) if h.parent else []
    print(f"<{h.name} class='{' '.join(h.get('class', []))}'> {h.get_text()} (Parent classes: {parent_classes})")

print("\n=== GRID SECTIONS ===")
for grid in soup.find_all(class_=re.compile(r'grid')):
    print(f"Grid classes: {grid.get('class')}")
    for child in grid.find_all(['h3', 'h4'], recursive=False):
        print(f"  Child: {child.name} - {child.get_text()}")
