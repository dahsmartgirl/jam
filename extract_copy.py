with open('outbound_extracted_text.txt', 'r', encoding='utf-8') as f:
    text = f.read()

import re

keywords = [
    "Find warm leads",
    "Drafts in your voice",
    "Lead enrichment",
    "Auto warm-up",
    "One inbox for every account",
    "Will my emails land in spam?",
    "Do I send from my own inbox?",
    "How does warm-up work?",
    "Can I personalize at scale?",
    "How are replies handled?",
    "What are the daily send limits?",
    "Does Jam handle opt-outs and compliance?",
    "Should I use a separate sending domain?",
    "How long does warm-up take"
]

print("Searching copy in extracted text...")
for kw in keywords:
    idx = text.find(kw)
    if idx != -1:
        print(f"\n--- MATCH FOR: {kw} ---")
        # Print surrounding characters
        snippet = text[idx:idx+800]
        # Clean escapes to make it easy to read
        clean_snippet = snippet.replace('\\n', '\n').replace('\\t', '\t')
        print(clean_snippet)
    else:
        print(f"NOT FOUND: {kw}")
