# Pharmacy Directory

Take-home exercise for Pharmacy Innovations.

## Features
- Displays a list of pharmacies with Name, City, Phone, and Status.
- Live, case-insensitive text filter (Name or City).
- Toggleable alphabetical sorting (A→Z, Z→A) using `localeCompare`.
- Simulated 1-second loading state.
- Empty state for zero results.
- Bonus: Active-only toggle, dynamic result counter, and "Clear Filters" button.

## Tech Stack
- React 19
- Vite
- Tailwind CSS 3

## AI Usage
Built using ChatGPT Codex in Cursor. See the `screenshots/ai-chat-history` folder for prompts and screenshots of the AI oversight process.

## UI Screenshots

**Initial Table View:**
![Initial Table](./screenshots/initial%20table.png)

**Sorting & Filtering Added:**
![Sorting and Filtering](./screenshots/table%20with%20sorting%20filter%20added.png)

**Final Table View (with count):**
![Final Table](./screenshots/final%20table.png)

### AI Oversight Proof
**Main Prompt:**
![Main Prompt](./screenshots/ai-chat-history/main%20prompt%201.png)

**AI Hallucination Caught:**
![AI Hallucination](./screenshots/ai-chat-history/ai%20hallucination.png)
