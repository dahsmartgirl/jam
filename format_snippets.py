import re
from bs4 import BeautifulSoup

with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    text = f.read()

soup = BeautifulSoup(text, 'html.parser')

keywords = [
    ("Find warm leads", "Find warm leads"),
    ("Drafts in your voice", "Drafts in your voice"),
    ("Lead enrichment", "Lead enrichment"),
    ("Auto warm-up", "Auto warm-up"),
    ("One inbox for every account", "One inbox for every account")
]

with open('formatted_card_snippets.txt', 'w', encoding='utf-8') as out:
    for title, kw in keywords:
        out.write(f"\n==================================================\n")
        out.write(f"SECTION: {title}\n")
        out.write(f"==================================================\n")
        
        # Find element by string text
        elem = soup.find(text=re.compile(kw))
        if elem:
            # Let's find the card container by going up levels until we hit something representing the card
            # For "Find warm leads", "Drafts in your voice", "Lead enrichment", "Auto warm-up", it's an ancestor
            # representing the grid item. Let's find the parent which has classes like "p-6" or similar.
            curr = elem
            found_card = False
            for i in range(12):
                if curr.parent:
                    curr = curr.parent
                    classes = curr.get('class', [])
                    if any('p-6' in c or 'p-8' in c or 'p-10' in c for c in classes) or 'relative' in classes:
                        out.write(curr.prettify())
                        found_card = True
                        break
            if not found_card:
                out.write(elem.parent.prettify())
        else:
            out.write("NOT FOUND\n")

print("Done! Formatted snippets written to formatted_card_snippets.txt")
