import re
from bs4 import BeautifulSoup

with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    text = f.read()

soup = BeautifulSoup(text, 'html.parser')

keywords = [
    ("Find warm leads", "Find warm leads", 3),
    ("Drafts in your voice", "Drafts in your voice", 3),
    ("Lead enrichment", "Lead enrichment", 3),
    ("Auto warm-up", "Auto warm-up", 3),
    ("One inbox for every account", "One inbox for every account", 4)
]

with open('formatted_card_snippets.txt', 'w', encoding='utf-8') as out:
    for title, kw, levels in keywords:
        out.write(f"\n==================================================\n")
        out.write(f"SECTION: {title}\n")
        out.write(f"==================================================\n")
        
        elem = soup.find(string=re.compile(kw))
        if elem:
            curr = elem
            for _ in range(levels):
                if curr.parent:
                    curr = curr.parent
            out.write(curr.prettify())
        else:
            out.write("NOT FOUND\n")

print("Done! Up-level snippets written to formatted_card_snippets.txt")
