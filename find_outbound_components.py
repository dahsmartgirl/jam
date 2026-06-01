from bs4 import BeautifulSoup
import json

with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

print("Page Title:", soup.title.get_text() if soup.title else "None")

# Find main headings (h1, h2, h3)
headings = []
for tag in ['h1', 'h2', 'h3', 'h4']:
    for h in soup.find_all(tag):
        text = h.get_text().strip()
        if text and len(text) < 150:
            headings.append(f"[{tag}] {text}")

print("\nHeadings found:")
for h in headings[:30]:
    print(h)

# Let's inspect some other elements, or JSON data for Next.js payload
import re
next_f_pushes = re.findall(r'self\.__next_f\.push\(\[1,"(.*?[^\\])"\]\)', html_content)
print(f"\nFound {len(next_f_pushes)} next_f push scripts.")

# Let's write the first few pushes to check if there are copy items
with open('outbound_extracted_text.txt', 'w', encoding='utf-8') as out:
    for i, p in enumerate(next_f_pushes):
        # clean escapes
        clean = p.replace('\\"', '"').replace('\\\\', '\\').replace('\\/', '/')
        out.write(f"--- PUSH {i} ---\n{clean}\n\n")

print("\nFirst 10 pushes dumped to outbound_extracted_text.txt")
