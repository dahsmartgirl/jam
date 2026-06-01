with open(r'c:\Users\DELL\Desktop\jam\email-oubound.txt', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = [
    "Find warm leads",
    "Drafts in your voice",
    "Lead enrichment",
    "Auto warm-up",
    "One inbox for every account"
]

with open('outbound_card_snippets.txt', 'w', encoding='utf-8') as out:
    out.write("Dumping snippets...\n")
    for kw in keywords:
        idx = text.find(kw)
        if idx != -1:
            out.write(f"\n==================================================\n")
            out.write(f"KEYWORD: {kw}\n")
            out.write(f"==================================================\n")
            start = max(0, idx - 1000)
            end = min(len(text), idx + 2500)
            snippet = text[start:end]
            out.write(snippet)
            out.write("\n")
        else:
            out.write(f"NOT FOUND: {kw}\n")

print("Done! Snippets written to outbound_card_snippets.txt")
