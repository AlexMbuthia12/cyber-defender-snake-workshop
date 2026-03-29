# 04 — Threats, Defenses & Lesson Cards

The snake game is already wired to call `spawnThreat()`, `triggerCard()`, and `showCard()` — these were built in Step 3. This step just verifies the curriculum loads and fixes any remaining issues.

---

## Step 1 — Confirm lessons.json is in the right place

Your project folder must look exactly like this:

```
cyber-defender-snake/
├── index.html
├── style.css
├── game.js
└── lessons.json   ← must be here
```

If you don't have it yet, download it from the workshop repo root.

Open your browser console (`F12` → Console). Reload the page. You should see **no errors** about lessons.json. If you see a fetch error, check the file is in the same folder as index.html.

---

## Step 2 — Prompt D: Building the Lesson Card

To finish the technical implementation, use this prompt to build the lesson card UI and timer logic. This will ensure players see a beautiful, informative breakdown of security risks when they trigger a node.

> Paste this into Copilot Chat:

Generate the HTML structure and JavaScript logic for the CyberDefender lesson card.

**UI Design Requirements:**
- **Overlay**: Create a full-screen frosted glass overlay (`backdrop-filter: blur(8px)`, `rgba(255,255,255,0.6)`) that centers the card.
- **Card**: A clean white card (max-width 480px) with a `3px` colored progress bar at the very TOP (not bottom) that depletes from left-to-right as the timer runs.
- **Header Row**: Left side shows a small icon square, a grey caps category label (e.g. "EMERGING AI RISK"), and a large bold title. Right side shows a "RESUME IN" label and a large bold countdown number.
- **Content Blocks**:
    - **Threat Section**: A small red icon, a "THREAT: [NAME]" red caps bold label, and a description with a red left-border line.
    - **Defense Section**: A small green icon, a "DEFENSE: [NAME]" green caps bold label, and a description with a green left-border line.
- **Buttons**: Two pill-shaped buttons at the bottom: a grey "+10S" button and a large solid green (for defense) or red (for threat) "CONTINUE (+1000 PTS) [SPACE]" button.

**Logic Requirements:**
- **showCard(type)**: Populates the card with data from `state.activeCurriculum`. Truncate descriptions to 1-2 sentences. Set the "CONTINUE" button color based on the node type.
- **startCardTimer()**: Animate the top progress bar and the countdown number starting from 20s. If the timer hits zero, automatically call `dismissCard()`.
- **extendTimer()**: The "+10S" button should add time to the current countdown.

Output the corrected HTML snippet for the overlay and the full JavaScript functions for `showCard`, `startCardTimer`, `extendTimer`, and `dismissCard`.


---

## ✅ Done

- [ ] Threat + defense node pair appears during gameplay
- [ ] Animated dashed tether connects them
- [ ] Collecting defense node shows lesson card
- [ ] Hitting threat node shows red card
- [ ] Timer bar depletes, countdown shows
- [ ] +10S and CONTINUE buttons work
- [ ] Game resumes cleanly after card dismissal

**You've built CyberDefender. 🛡️**