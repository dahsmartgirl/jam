with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    text = f.read()

import re

keywords = [
    "Find warm leads",
    "Drafts in your voice",
    "Lead enrichment",
    "Auto warm-up",
    "One inbox for every account"
]

print("Searching copy in email-oubound.txt...")
for kw in keywords:
    idx = text.find(kw)
    if idx != -1:
        print(f"\n--- MATCH FOR: {kw} ---")
        # Print surrounding characters
        snippet = text[idx-100:idx+900]
        # Clean escapes to make it easy to read
        clean_snippet = snippet.replace('\\n', '\n').replace('\\t', '\t')
        # Encode and decode as ascii ignoring errors
        ascii_snippet = clean_snippet.encode('ascii', 'ignore').decode('ascii')
        print(ascii_snippet)
        print("="*80)
    else:
        print(f"NOT FOUND: {kw}")
