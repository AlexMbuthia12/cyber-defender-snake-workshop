# 01 — How the Game Works

Before writing any code, understand what you're building.

---

## The Grid

The game is a **20×20 invisible grid**. Every object — snake, food, threats — is just a set of `{x, y}` coordinates.

```
snake = [
  { x: 10, y: 10 },   ← head
  { x:  9, y: 10 },
  { x:  8, y: 10 },   ← tail
]
```

## How the Snake Moves

Every tick (~140ms):
1. Calculate the new head position (one step in current direction)
2. **Add** it to the front of the array
3. **Remove** the tail from the end

When food is eaten — skip step 3. The snake grows by one.

## The Three Files

```
cyber-defender-snake/
├── index.html     ← page structure + canvas element
├── style.css      ← dashboard styling
├── game.js        ← all game logic
└── lessons.json   ← cybersecurity lesson content (provided)
```

## Cyber Defender Snake's Extra Rules

| Item                   | What happens                               |
| ---------------------- | ------------------------------------------ |
| ◈ Data packet (food)   | Snake grows, score +1                      |
| ⚠ Threat node (red)    | Hit it → risk briefing shown, score -1000  |
| 🛡 Defense node (green) | Collect it → lesson card shown, score +500 |

Threats and defenses are **tethered** — they always spawn as a pair. Collect the defense before touching the threat.

---

→ **[02-setup.md](./02-setup.md)**