# 03 — Build the Game (Step by Step)

Open **Copilot Chat** (`Ctrl+Shift+I` or click the Copilot icon in the sidebar).

**How this works:** You'll paste each prompt below into Copilot Chat. Copilot will generate code. Copy the **entire** output into the correct file, save, and check your browser before moving on.

> **Important:** Use the prompts **in order**. Each one builds on the last. Save (`Ctrl+S`) after every paste — Live Server will auto-refresh your browser.

---

## Step 1 — HTML Structure

> Open `index.html` in VS Code, then paste this prompt into Copilot Chat:

```
Generate a complete index.html file for a game called "CyberDefender".

Requirements:
1. Add a <link> to Google Fonts "Inter" (weights 400, 600, 700).
2. Add a <link rel="stylesheet" href="style.css">.
3. Add <script src="game.js" defer></script> at the end of <body>.

Build this exact structure using these exact element IDs:

TOP NAV BAR (<nav id="top-bar">):
- Left: brand text "CyberDefender" in a <span class="brand">, then "[v1.0.4]" in a <span class="version">, then a <span class="connection-badge">● CONNECTION: STABLE</span>
- Center: <span id="latency">[LAT: 520ms]</span> and <span id="session-timer">[SESSION: 00:00:00]</span>
- Right: <span id="security-posture">SECURITY POSTURE<br><strong>99.98% EFFECTIVE</strong></span>

MAIN LAYOUT (<div id="dashboard"> with three children):

LEFT SIDEBAR (<aside id="left-sidebar">):
- <h3>OPERATOR CONSOLE</h3> and <p>LEVEL 4 CLEARANCE</p>
- <div id="difficulty-section"> with label "DIFFICULTY" and four buttons:
    <button class="diff-btn" data-speed="160">Easy</button>
    <button class="diff-btn active" data-speed="120">Normal</button>
    <button class="diff-btn" data-speed="80">Hard</button>
    <button class="diff-btn" data-speed="50">Expert</button>
- <div id="score-accumulation"> with heading "SCORE ACCUMULATION" and <div id="score-log">No recent activity...</div>
- <div id="mobile-controls"> at the bottom with 4 arrow buttons (↑ ↓ ← →) with classes "ctrl-btn" and data-dir attributes "up", "down", "left", "right"

CENTER (<main id="game-container">):
- <canvas id="gameCanvas" width="480" height="480"></canvas>
- Below the canvas: <div id="canvas-footer"> with <span id="coordinates">[X: 0, Y: 0]</span> and <span id="zone-label">[ZONE: SECTOR-7C]</span>

RIGHT SIDEBAR (<aside id="right-sidebar">):
- <div id="score-section"> with label "CURRENT SCORE" and <div id="score-value">0</div>
- <div id="rank-section"> with "RANK: " text and <span id="rank-label">GUARDIAN PRIME</span> and <span id="rank-percent">0%</span>
- <div id="progress-section"> with a <div id="progress-track"><div id="progress-fill"></div></div>
- <div id="telemetry-section"> with heading "LIVE TELEMETRY" and <div id="telemetry-log"></div>
- <div id="node-distribution"> with heading "NODE DISTRIBUTION" and three stat rows for THREATS, DEFENSE, PACKETS (each with a <span> for the count, IDs: threats-count, defense-count, packets-count)

OVERLAY (after #dashboard):
- <div id="lesson-overlay" class="hidden"></div>

Output ONLY the complete HTML file, nothing else.
```

**Paste** the output into `index.html`. **Save.**

### ✅ Check: Open your browser — you should see the layout elements (unstyled). If the page is completely blank, check the browser console (`F12`) for errors.

---

## Step 2 — CSS Styling

> Open `style.css`, then paste this prompt into Copilot Chat:

```
Create a complete style.css for the CyberDefender game dashboard. Use these exact specifications:

GLOBAL:
- *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
- body: font-family "Inter", sans-serif; background #f8fafb; color #1f2937; min-height 100vh; display flex; flex-direction column

TOP BAR (#top-bar):
- White background, border-bottom 1px solid #e5e7eb, padding 8px 20px
- Display flex, align-items center, justify-content space-between
- .brand: color #00A651, font-weight 700, font-size 16px
- .version: color #9ca3af, font-size 11px, margin-left 4px
- .connection-badge: color #00A651, font-size 12px, margin-left 16px
- #session-timer, #latency: color #6b7280, font-size 11px, font-family monospace
- #security-posture: text-align right, font-size 11px, color #00A651

DASHBOARD (#dashboard):
- display flex, flex 1, overflow hidden

LEFT SIDEBAR (#left-sidebar):
- width 200px, min-width 200px, background white, border-right 1px solid #e5e7eb
- padding 16px, display flex, flex-direction column, gap 20px, overflow-y auto
- h3: font-size 13px, font-weight 700, letter-spacing 0.5px, color #1f2937
- p: font-size 11px, color #6b7280

DIFFICULTY BUTTONS (.diff-btn):
- padding 6px 14px, border-radius 20px, border 1px solid #e5e7eb
- background #f3f4f6, color #374151, font-size 11px, cursor pointer
- .diff-btn.active: background #00A651, color white, border-color #00A651

GAME CONTAINER (#game-container):
- flex 1, display flex, flex-direction column, align-items center, justify-content center
- padding 20px, background #f8fafb

CANVAS (#gameCanvas):
- border 1px solid #e5e7eb, border-radius 8px
- box-shadow 0 1px 3px rgba(0,166,81,0.08)
- background #f0faf0
- max-width 100%

CANVAS FOOTER (#canvas-footer):
- width 480px, display flex, justify-content space-between, margin-top 4px
- font-size 10px, color #9ca3af, font-family monospace

RIGHT SIDEBAR (#right-sidebar):
- width 220px, min-width 220px, background white, border-left 1px solid #e5e7eb
- padding 16px, display flex, flex-direction column, gap 16px, overflow-y auto

SCORE (#score-value):
- font-size 36px, font-weight 700, color #1f2937

RANK:
- #rank-label: font-weight 600
- #rank-percent: color #00A651, font-weight 700

PROGRESS (#progress-track):
- height 4px, background #e5e7eb, border-radius 2px, overflow hidden
- #progress-fill: height 100%, background #00A651, width 0%, transition width 0.3s

TELEMETRY (#telemetry-log):
- max-height 200px, overflow-y auto, font-family monospace, font-size 11px
- .log-entry: padding 6px 0, border-bottom 1px solid #f3f4f6
- .log-time: color #9ca3af, margin-right 8px
- .log-success: color #00A651, font-weight 600
- .log-danger: color #E31937, font-weight 600

SCORE ACCUMULATION (#score-log):
- max-height 150px, overflow-y auto, font-size 11px, color #6b7280
- .score-entry: display flex, justify-content space-between, padding 4px 0, border-bottom 1px solid #f9fafb
- .event-score: font-weight 700, font-size 12px

MOBILE CONTROLS (#mobile-controls):
- margin-top auto, display grid, grid-template-columns repeat(3, 1fr), gap 4px, max-width 120px
- .ctrl-btn: width 32px, height 32px, border-radius 6px, border 1px solid #e5e7eb, background #f9fafb, cursor pointer, display flex, align-items center, justify-content center

LESSON OVERLAY (#lesson-overlay):
- position fixed, inset 0, background rgba(255,255,255,0.6), backdrop-filter blur(8px)
- display flex, align-items center, justify-content center, z-index 1000
- #lesson-overlay.hidden: display none

NODE DISTRIBUTION (#node-distribution):
- .stat-row: display flex, justify-content space-between, font-size 11px, padding 4px 0

RESPONSIVE (max-width 768px):
- #left-sidebar, #right-sidebar: display none
- #mobile-controls: display grid

Output ONLY the CSS code.
```

**Paste** into `style.css`. **Save.**

### ✅ Check: Your browser should now show a clean three-column dashboard with a white top bar, white sidebars, and a light green canvas area in the center. It won't do anything yet — that's next.

---

## Step 3 — Core Snake Game

This is the most important step. The prompt is long because it specifies exact behavior to ensure a working game.

> Open `game.js`, then paste this prompt into Copilot Chat:

```
Write the complete game.js for CyberDefender Snake. This must be a fully working snake game.

CANVAS SETUP:
- Get canvas with: document.getElementById("gameCanvas")
- Get context: canvas.getContext("2d")
- Grid: 20 columns x 20 rows, cell size = 24px (canvas is 480x480)

GAME STATE (use a single object called "state"):
- status: "idle" (values: "idle", "playing", "paused", "gameover")
- snake: array of {x, y} objects, initially [{x:10,y:10}, {x:9,y:10}, {x:8,y:10}]
- direction: {x:1, y:0} (moving right initially)
- nextDirection: {x:1, y:0} (buffered input)
- food: {x, y} object (random position, not on snake)
- score: 0
- speed: 120 (milliseconds per tick)
- gameInterval: null
- sessionSeconds: 0
- sessionTimer: null
- threat: null (will be used later)
- defense: null (will be used later)
- activeCurriculum: null (will be used later)
- lessonsCompleted: 0
- totalThreats: 0
- totalDefenses: 0
- totalPackets: 0

CORE FUNCTIONS:

1. spawnFood(): Set state.food to a random {x, y} where x and y are 0-19, ensuring the position is NOT occupied by any snake segment. Keep generating until a free cell is found.

2. draw(): Clear the canvas. Draw the background color #f0faf0. Draw faint grid lines using strokeStyle "rgba(0,166,81,0.08)". Then:
   - Draw each snake segment as a filled rounded rectangle (24px with 3px radius) in color #00A651. Make the head slightly brighter (#00C261).
   - Draw food as a small chip: a 36x36 rounded rect centered on the cell with fill "rgba(255,255,255,0.9)", stroke "rgba(156,163,175,0.5)", a "◈" symbol centered inside in grey, and text "DATA_INT" below it in 8px font.
   - If state.threat exists, draw it as a chip with fill "rgba(239,68,68,0.1)", stroke "rgba(239,68,68,0.5)", a "✉" symbol in red, and label below.
   - If state.defense exists, draw it as a chip with fill "rgba(0,166,81,0.1)", stroke "rgba(0,166,81,0.5)", a "🛡" symbol in green, and label below.
   - If BOTH threat and defense exist, draw a dashed line between them using strokeStyle "rgba(0,0,0,0.15)", lineWidth 1, setLineDash([4,4]).
   - If status is "idle", draw centered text "PRESS [SPACE] TO START" in 16px Inter, color #6b7280.
   - If status is "gameover", draw centered text "GAME OVER — PRESS [SPACE]" in 16px Inter, color #E31937.
   - Update #coordinates span with current head position.

3. move(): This runs every tick when playing.
   - Set state.direction = state.nextDirection
   - Calculate newHead = { x: state.snake[0].x + state.direction.x, y: state.snake[0].y + state.direction.y }
   - WALL COLLISION: if newHead.x < 0 or >= 20 or newHead.y < 0 or >= 20, call gameOver() and return
   - SELF COLLISION: if any snake segment matches newHead, call gameOver() and return
   - Add newHead to the FRONT of state.snake (unshift)
   - FOOD CHECK: if newHead matches state.food position, increment state.score, call spawnFood(), update the dashboard, add telemetry log, increment totalPackets. Do NOT remove tail.
   - DEFENSE CHECK: if state.defense exists and newHead matches state.defense position, add 500 to score, set state.defense = null, update dashboard, add telemetry log, increment totalDefenses. Then if state.threat still exists, also remove state.threat (pair cleared). Do NOT remove tail (snake grows).
   - THREAT CHECK: if state.threat exists and newHead matches state.threat position, subtract 1000 from score (minimum 0), set state.threat = null, update dashboard, add telemetry log "THREAT DETECTED" in red, increment totalThreats. Remove tail normally.
   - OTHERWISE (no collision with food/defense/threat): remove the last segment (pop) — normal movement.
   - Call draw()
   - Call updateDashboard()

4. startGame(): Only run if status is "idle" or "gameover".
   - Reset state: snake back to initial, direction {x:1,y:0}, nextDirection {x:1,y:0}, score 0, status "playing", threat null, defense null, totalThreats 0, totalDefenses 0, totalPackets 0, lessonsCompleted 0.
   - Call spawnFood()
   - Clear any existing gameInterval, then: state.gameInterval = setInterval(move, state.speed)
   - Clear any existing sessionTimer. Reset sessionSeconds to 0. Start: state.sessionTimer = setInterval(() => { state.sessionSeconds++; update #session-timer text to formatted time }, 1000)
   - Call draw()

5. gameOver(): Set status to "gameover". clearInterval(state.gameInterval). clearInterval(state.sessionTimer). Call draw(). Add telemetry log "SESSION TERMINATED".

6. updateDashboard():
   - Set #score-value textContent to state.score
   - Set #progress-fill width to min(state.score / 50 * 100, 100) + "%"
   - Set #rank-percent textContent to min(state.score, 100) + "%"
   - Set #threats-count to state.totalThreats
   - Set #defense-count to state.totalDefenses
   - Set #packets-count to state.totalPackets

7. addTelemetryLog(message, type): Prepend an entry to #telemetry-log.
   - Create a div with class "log-entry"
   - Inside: <span class="log-time">HH:MM:SS</span> <span class="log-success or log-danger">MESSAGE</span>
   - type "success" uses class "log-success", type "danger" uses "log-danger"
   - Use the current time for the timestamp

8. addScoreEntry(label, points, color): Prepend to #score-log.
   - Create div with class "score-entry"
   - Inside: <span class="event-label" style="color:${color}">${label}</span><span class="event-score" style="color:${color}">+${points}</span>

EVENT LISTENERS (attach to window, outside any function):

1. "keydown" listener:
   - Space: if status is "idle" or "gameover", call startGame(). If status is "playing", do nothing. Prevent default for Space.
   - Arrow keys AND WASD: change state.nextDirection. Prevent reversing (e.g., if going right, can't go left). Map: ArrowUp/w/W = {x:0,y:-1}, ArrowDown/s/S = {x:0,y:1}, ArrowLeft/a/A = {x:-1,y:0}, ArrowRight/d/D = {x:1,y:0}.

2. Difficulty buttons: document.querySelectorAll(".diff-btn").forEach — on click, remove "active" from all, add "active" to clicked, set state.speed = parseInt(button.dataset.speed). If currently playing, clearInterval(state.gameInterval), state.gameInterval = setInterval(move, state.speed).

3. Mobile control buttons: document.querySelectorAll(".ctrl-btn").forEach — on click, map data-dir to direction changes same as arrow keys.

INITIALIZATION (at the bottom of the file):
- Call spawnFood()
- Call draw() — this shows the idle screen with "PRESS [SPACE] TO START"

Output the COMPLETE game.js file with ALL functions fully implemented. Do NOT use placeholders or TODO comments. Every function must have real working code.
```

**Paste** the full output into `game.js`. **Save.**

### ✅ Check — Stop and test EACH of these:

Open your browser at `http://127.0.0.1:5500`.

1. **You should see the canvas with "PRESS [SPACE] TO START" text** — if the canvas is blank, open the console (`F12` → Console) and share any red error with Copilot.
2. **Press Space** — the snake should start moving to the right.
3. **Arrow keys or WASD** — the snake should change direction.
4. **Eat a DATA_INT chip** — the snake should grow and the score should increase.
5. **Hit a wall** — "GAME OVER" should appear. Press Space to restart.
6. **Check the right sidebar** — score and telemetry log should update.
7. **Click a difficulty button** — the snake speed should change.

**If something doesn't work**, open the browser console (`F12` → Console tab), copy the red error message, and paste it into Copilot Chat:

```
Fix this error in my game.js: [paste the error here]

Here is my current game.js:
[paste your game.js]
```

> **Don't move to Step 4 until the snake moves and you can eat food.** This is the foundation — everything else builds on it.

---

## Step 4 — Add Threat & Defense Spawning

Now that the snake works, let's add cybersecurity threat/defense node pairs.

> Paste this prompt into Copilot Chat:

```
I have a working CyberDefender snake game in game.js. I need to add threat/defense pair spawning.

Add these functions to my existing game.js (do NOT rewrite the whole file — output ONLY the new/modified code):

1. At the top of the file, add: let CURRICULUM = []; and then a fetch call:
   fetch("lessons.json").then(r => r.json()).then(data => { CURRICULUM = data; }).catch(err => console.warn("Could not load lessons.json:", err));

2. spawnThreatPair(): Pick a random lesson from CURRICULUM. Store it in state.activeCurriculum. Generate a random position for the threat (not on snake, not on food, not on defense). Generate a random position for the defense (not on snake, not on food, not on threat). Set:
   state.threat = { x, y, name: lesson.threat.name }
   state.defense = { x, y, name: lesson.defense.name }

3. Modify the move() function: After the food check, add a random chance to spawn a threat pair. If state.threat is null and Math.random() < 0.02, call spawnThreatPair(). This gives roughly a 2% chance per tick.

4. In the DEFENSE CHECK section of move(): When the snake eats a defense node, after adding score, also call addTelemetryLog with "NODE SECURED" as success, and call addScoreEntry. Log: "Input " + state.activeCurriculum.defense.description.substring(0,50) + "..."

5. In the THREAT CHECK section of move(): When the snake hits a threat, after subtracting score, also call addTelemetryLog with "THREAT DETECTED" as danger. Log: state.activeCurriculum.threat.description.substring(0,50) + "..."

Output ONLY the new fetch code, the spawnThreatPair function, and the modified move() function. Show the COMPLETE move() function so I can replace it entirely.
```

**Paste** the new code into `game.js` — add the `fetch` and `spawnThreatPair` function, and **replace** your existing `move()` function with the updated one. **Save.**

### ✅ Check:

1. Play the game for 10-20 seconds — a red **threat node** and green **defense node** should appear.
2. A dashed line should connect them.
3. Eating the defense node gives +500 points and a green telemetry log.
4. Hitting the threat subtracts 1000 points and logs a red warning.
5. Check the console — there should be no fetch errors for `lessons.json`.

---

→ **[04-threats-and-lessons.md](./04-threats-and-lessons.md)**