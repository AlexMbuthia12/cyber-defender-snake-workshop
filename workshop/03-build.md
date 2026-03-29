# 03 — Build the Arena & Snake

Open **Copilot Chat** (`Ctrl+Shift+I`). Use each prompt below in order. After each response, paste the output into the correct file and **save (`Ctrl+S`) before moving to the next prompt**.

---

## Prompt A — HTML Shell

> Open `index.html`, then paste this into Copilot Chat:

Generate the complete `index.html` for CyberDefender. Build a professional three-column dashboard with a top metadata bar.

The structure should follow this layout:

- A top `<nav>` bar containing the brand "CyberDefender [v1.0.4]" in green, a "● CONNECTION: STABLE" green badge, "[LAT: 520ms]", a "[SESSION: 00:00:00]" timer, and a right-aligned "SECURITY POSTURE 99.98% EFFECTIVE" status.
- A main `#dashboard` container using a three-column flex layout.
- The left sidebar (`#left-sidebar`) should feature an "OPERATOR CONSOLE / LEVEL 4 CLEARANCE" header, a difficulty section with four buttons (Easy, Normal, Hard, Expert), a `#score-accumulation` log, and a `#mobile-controls` section at the bottom with arrow buttons.
- The center area should house the `#game-container` with a `480x480` `<canvas id="gameCanvas">`.
- The right sidebar (`#right-sidebar`) should show the "CURRENT SCORE" label, a large `#score-value`, a green `#progress-track`, a "RANK: GUARDIAN PRIME 98%" indicator, a "LIVE TELEMETRY" scrollable log, and a "NODE DISTRIBUTION" section for a bar chart at the bottom.
- Include an empty `<div id="lesson-overlay" class="hidden"></div>` for the future lesson cards.

Use "Inter" from Google Fonts for all typography. Ensure all panel backgrounds are white. Output only the final HTML file.


Paste the full output into `index.html`. Save.

---

## Prompt B — CSS Styling

> Open `style.css`, then paste this into Copilot Chat:

Create a complete `style.css` that implements a clean SaaS dashboard aesthetic. The overall theme should use a light grey background (`#f8fafb`) with white panels and sidebars.

- **Layout**: Use flexbox for the three-column layout. Set the left sidebar width to 200px and the right sidebar to 220px. Both sidebars should have a 1px light grey border (`#e5e7eb`) and subtle box shadows.
- **Top Bar**: Style the navigation bar with a white background and a bottom border. The "CyberDefender" brand and "CONNECTION" badge should use a vibrant green (`#00A651`).
- **Typography**: Use "Inter" (or a similar clean sans-serif) for general UI and a small monospace font specifically for the telemetry log.
- **Difficulty Buttons**: Create pill-shaped radio selectors. The active button should have a solid green background (`#00A651`) with white text, while others use a light grey background (`#f3f4f6`) with dark grey text (`#374151`).
- **Telemetry Log**: Make the log section scrollable with a fixed height. Use `#00A651` for success messages and `#E31937` for danger/threat messages.
- **Canvas**: Style the `gameCanvas` with 1px solid `#e5e7eb` and a very subtle green shadow. The background should feel like a custom light greenish-white.
- **Node Chips**: Design the nodes as small, rounded-md card chips. They should have very light tinted backgrounds matching their type (light red for threats, light green for defenses) and a clean, flat appearance with no neon or scanlines.
- **Score Accumulation**: Each entry in `#score-accumulation` is a flex row with `justify-content: space-between` — the event label on the left in small dark grey text (`#374151`, `11px`) and the score amount on the right in bold (`12px`). Entries are separated by a very faint divider. The section should be scrollable with a fixed max-height.

Output only the CSS code.


Paste into `style.css`. Save. Your browser should now show the three-column layout with the canvas area visible.

---

## Prompt C — Snake Game Logic

> Open `game.js`, then paste this into Copilot Chat:

Write the complete `game.js` for CyberDefender. The game uses a `480x480` canvas with a `20x20` grid (cell size 24px).

Follow these rendering and logic requirements:

- **Snake Rendering**: Each segment should be a solid `#00A651` green square with a `3px` corner radius (using `ctx.roundRect`). The head should be slightly brighter. No glow or pulse effects.
- **Node Chips**: Threats, Defenses, and Data Packets are rendered as `~36x36px` rounded square chips with a light-tinted fill, a Unicode symbol centered inside (drawn with `ctx.fillText`), and a corresponding label centered beneath them.
    - **Threats**: Fill `rgba(239,68,68,0.1)`, border `rgba(239,68,68,0.5)`, symbol `⚠` in `rgba(239,68,68,0.8)`, label "THREAT: [NAME]".
    - **Defenses**: Fill `rgba(0,166,81,0.1)`, border `rgba(0,166,81,0.5)`, symbol `🔑` (or draw a simple key path), label "DEFENSE: [NAME]".
    - **Data (Food)**: Fill `rgba(255,255,255,0.8)`, border `rgba(156,163,175,0.5)`, symbol `◈` in grey, label "DATA_INT".
- **Dynamic Background**: Draw very faint grid lines using `rgba(0,166,81,0.08)` on a clean `#f0faf0` canvas.
- **Dashed Tether**: When a threat and defense pair are active, draw a thin dashed line between them using `rgba(0,0,0,0.15)` with an animated `dashOffset` to show movement.
- **Dashboard Synchronization**: Every game tick, update the right sidebar's score display and progress bar. Add telemetry log entries for every significant event (e.g., "+500 DEFENSE NODE SECURED" in green or "THREAT NEUTRALIZED" in red). Update the top bar's session timer and rank information. Also prepend a new entry to the `#score-accumulation` div in the left sidebar for each scoring event — format: `<span class="event-label">Event Name</span><span class="event-score">+N</span>` — use blue (`#3b82f6`) for lesson completions (+1000), green (`#00A651`) for defense nodes (+500), and grey (`#6b7280`) for data packets (+1).
- **Controls**: Support both WASD/Arrow keys for navigation and handle difficulty speed changes by resetting the game interval mapping to the buttons' data-speed attributes.

Output the entire `game.js` file with all functions fully implemented.


Paste the full output into `game.js`. Save.

---

## ✅ Test Now

Open your browser at `127.0.0.1:5500`. You should see the three-column layout. Press **Space** — the snake should start moving.

- [ ] Space starts the game
- [ ] Arrow keys / WASD move the snake
- [ ] Snake grows when it eats the white DATA chip
- [ ] Score increments in the right panel
- [ ] Session timer ticks in the top bar

If nothing happens after pressing Space, open the browser console (`F12` → Console tab) and share any red errors with Copilot: *"Fix this error in game.js: [paste error]"*

---

→ **[04-threats-and-lessons.md](./04-threats-and-lessons.md)**