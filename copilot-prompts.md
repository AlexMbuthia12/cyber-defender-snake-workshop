# Copilot Rescue Prompts

Stuck? Find your problem below and paste the prompt into Copilot Chat or [claude.ai](https://claude.ai).

---

## Canvas shows nothing at all (blank white/green area)

```
My game.js should call draw() once at the bottom of the file so the idle screen shows
immediately. The draw() function should check if state.status === "idle" and if so draw
centered text "PRESS [SPACE] TO START" on the canvas using ctx.fillText. Make sure:
(1) const canvas = document.getElementById("gameCanvas") is at the top of the file
(2) const ctx = canvas.getContext("2d") is right after it
(3) draw() is called at the very bottom of the file
(4) draw() fills the canvas background with #f0faf0 before drawing anything
Here is my game.js: [paste file]. Find the specific bug and output only the fixed lines.
```

## Snake not moving after pressing Space

```
My game.js has a startGame() function and a keydown event listener. When I press Space
nothing happens. Check that:
(1) the keydown listener is attached to "window" (not "document") and is outside all functions
(2) the listener checks for event.code === "Space" (not event.key === " ")
(3) startGame() is called when state.status is "idle" OR "gameover"
(4) startGame() calls setInterval(move, state.speed) and stores it in state.gameInterval
(5) startGame() sets state.status = "playing"
(6) spawnFood() is called before the interval starts
Here is my game.js: [paste file]. Find the specific bug and output only the fixed lines.
```

## Snake moves but doesn't change direction

```
My keydown listener should handle ArrowUp, ArrowDown, ArrowLeft, ArrowRight AND w, a, s, d.
Each key should set state.nextDirection (not state.direction directly). The move() function
should copy nextDirection into direction at the start of each tick. Also prevent reversing:
if currently going right (direction.x === 1), ignore left (nextDirection.x === -1).
Here is my keydown listener and my move() function: [paste both]. Fix and output both.
```

## Snake doesn't grow when eating food

```
In my move() function, when newHead matches state.food position (newHead.x === state.food.x
&& newHead.y === state.food.y), the function should: increment state.score, call spawnFood(),
and SKIP the pop() call (do not remove the tail). The pop() that removes the tail should only
happen in an else block when no food/defense/threat was eaten.
Here is my move() function: [paste]. Fix it and output the complete move() function.
```

## lessons.json fetch error in console

The error looks like: `Failed to fetch lessons.json` or `404 Not Found`.

Fix: make sure `lessons.json` is in the **same folder** as `index.html`, not inside a
subfolder. Then reload the page.

If it still fails, check the fetch code at the top of game.js is:
```javascript
let CURRICULUM = [];
fetch("lessons.json")
  .then(r => r.json())
  .then(data => { CURRICULUM = data; })
  .catch(err => console.warn("Could not load lessons.json:", err));
```

## Threat/defense nodes never appear

```
In my move() function, after the food check, I need code that spawns threat pairs. Add this:
if state.threat is null AND CURRICULUM.length > 0 AND Math.random() < 0.02, call
spawnThreatPair(). Make sure spawnThreatPair() exists and picks a random lesson from
CURRICULUM, generates random positions for threat and defense (not on snake or food), and
sets state.threat and state.defense.
Here is my move() function and my spawnThreatPair() function (if it exists): [paste].
Fix and output both functions.
```

## Lesson card not showing when eating defense node

```
In my move() function DEFENSE CHECK section, after adding score and logging, I should call
showCard("defense") if state.activeCurriculum is not null, then return immediately.
In my showCard(type) function, it should: remove class "hidden" from
document.getElementById("lesson-overlay"), set state.status = "paused",
clearInterval(state.gameInterval), and call startCardTimer().
Here is my move() DEFENSE CHECK code and my showCard() function: [paste both].
Fix and output both sections.
```

## Card timer bar not animating

```
Fix my startCardTimer() function. It should: set state.cardTimeLeft = 20, start a
setInterval every 100ms, each tick decrease state.cardTimeLeft by 0.1, set
document.getElementById("card-timer-bar").style.width = (state.cardTimeLeft / 20 * 100) + "%",
set document.getElementById("card-countdown").textContent = Math.ceil(state.cardTimeLeft) + "s",
when state.cardTimeLeft <= 0 clearInterval and call dismissCard().
Here is my current function: [paste]. Output the corrected function only.
```

## Game won't restart after game over

```
My gameOver() function clears gameInterval but when Space is pressed again startGame()
doesn't work. Check that: (1) gameOver() sets state.status = "gameover", (2) the keydown
listener calls startGame() when status is "idle" OR "gameover". Here is my keydown listener
and gameOver function: [paste]. Fix and output only those sections.
```

## Difficulty buttons don't change speed

```
My difficulty buttons have class "diff-btn" and data-speed attributes 160, 120, 80, and 50.
Each click should: remove class "active" from all .diff-btn elements, add "active" to the
clicked button, set state.speed to parseInt(button.dataset.speed), and if state.status
is "playing" clear state.gameInterval and restart it with setInterval(move, state.speed).
Here is my current button event code: [paste]. Fix and output only the event listener code.
```

## Game doesn't resume after dismissing lesson card

```
My dismissCard() function should: clearInterval(state.cardTimer), add class "hidden" to
document.getElementById("lesson-overlay"), set state.status = "playing", and restart the
game loop with state.gameInterval = setInterval(move, state.speed).
Also check that my keydown listener handles Space when state.status === "paused" by calling
dismissCard().
Here is my dismissCard() and keydown listener: [paste both]. Fix and output both.
```