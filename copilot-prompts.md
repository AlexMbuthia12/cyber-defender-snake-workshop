# Copilot Rescue Prompts

Stuck? Find your step below and paste the prompt into Copilot Chat or [claude.ai](https://claude.ai).

---

## Snake not moving after Space

```
My game.js has a startGame() function and a keydown event listener. When I press Space
nothing happens. Check that: (1) the keydown listener is attached to window — not document
— and is outside all functions, (2) startGame() calls setInterval(move, state.speed) and
stores it in gameInterval, (3) the initial draw() call at the bottom of the file runs.
Here is my game.js: [paste file]. Find the specific bug and output only the fixed lines.
```

## Canvas is blank on load

```
My game.js should call draw() once at the bottom of the file so the idle screen shows
immediately. The draw() function should check if state.status === 'idle' and if so draw
centered text "PRESS SPACE TO START" on the canvas. Here is my draw() function: [paste].
Fix it and output only the corrected draw() function.
```

## lessons.json fetch error in console

The error looks like: `Failed to fetch lessons.json` or `404 Not Found`.

Fix: make sure `lessons.json` is in the **same folder** as `index.html`, not inside a
subfolder. Then reload the page.

If it still fails, replace the fetch at the top of game.js with this instead — paste
your full lessons.json content directly as a variable:

```javascript
// Replace the fetch() call with this:
const CURRICULUM = [ /* paste lessons.json array contents here */ ];
```

## Lesson card not showing

```
In my game.js, when triggerCard() is called it should call showCard(type). showCard()
should remove class "hidden" from document.getElementById("lesson-overlay"). Here is
my triggerCard() and showCard(): [paste both functions]. Check that showCard is actually
called and that the element ID "lesson-overlay" matches the HTML. Fix and output both
functions.
```

## Card timer bar not animating

```
Fix my startCardTimer() function. It should: set timerSecondsLeft = 20, start a
setInterval every 100ms, each tick decrease timerSecondsLeft by 0.1, set
document.getElementById("card-timer-bar").style.width = (timerSecondsLeft / 20 * 100) + "%",
set document.getElementById("card-countdown").textContent = Math.ceil(timerSecondsLeft) + "s",
when timerSecondsLeft <= 0 clearInterval and call dismissCard().
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
My difficulty buttons have class "diff-btn" and data-speed attributes of 140, 100, and 70.
Each click should: remove class "active" from all .diff-btn elements, add "active" to the
clicked button, set state.speed to parseInt(button.dataset.speed), and if state.status
is "playing" clear gameInterval and restart it with the new speed.
Here is my current button event code: [paste]. Fix and output only the event listener code.
```