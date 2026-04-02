// CANVAS SETUP
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const COLS = 20;
const ROWS = 20;
const CELL = 24;

// GAME STATE
const state = {
    status: "idle",
    snake: [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}],
    direction: {x:1, y:0},
    nextDirection: {x:1, y:0},
    food: null,
    score: 0,
    speed: 120,
    gameInterval: null,
    sessionSeconds: 0,
    sessionTimer: null,
    threat: null,
    defense: null,
    activeCurriculum: null,
    lessonsCompleted: 0,
    totalThreats: 0,
    totalDefenses: 0,
    totalPackets: 0,
    cardTimeLeft: 20,
    cardTimer: null
};

let CURRICULUM = [];
fetch("lessons.json").then(r => r.json()).then(data => { CURRICULUM = data; }).catch(err => console.warn("Could not load lessons.json:", err));

function spawnFood() {
    let foodPosition;
    let valid = false;
    
    while (!valid) {
        foodPosition = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
        valid = !state.snake.some(segment => 
            segment.x === foodPosition.x && segment.y === foodPosition.y
        );
    }
    
    state.food = foodPosition;
}

function drawRoundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function drawChip(cx, cy, fillColor, strokeColor, symbol, symbolColor, label) {
    const px = cx * CELL + CELL / 2;
    const py = cy * CELL + CELL / 2;
    const chipSize = 36;
    const halfSize = chipSize / 2;
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    drawRoundedRect(px - halfSize, py - halfSize, chipSize, chipSize, 4);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = symbolColor;
    ctx.font = "16px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, px, py);
    
    ctx.fillStyle = "#9ca3af";
    ctx.font = "9px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(label, px, py + halfSize + 8);
}

function spawnThreatPair() {
    if (!CURRICULUM || CURRICULUM.length === 0) return;
    
    const lesson = CURRICULUM[Math.floor(Math.random() * CURRICULUM.length)];
    state.activeCurriculum = lesson;
    
    let threatPos, defensePos;
    let validThreat = false;
    let validDefense = false;
    
    while (!validThreat) {
        threatPos = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
        validThreat = true;
        if (state.snake.some(s => s.x === threatPos.x && s.y === threatPos.y)) validThreat = false;
        if (state.food && state.food.x === threatPos.x && state.food.y === threatPos.y) validThreat = false;
        if (state.defense && state.defense.x === threatPos.x && state.defense.y === threatPos.y) validThreat = false;
    }
    
    while (!validDefense) {
        defensePos = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
        validDefense = true;
        if (state.snake.some(s => s.x === defensePos.x && s.y === defensePos.y)) validDefense = false;
        if (state.food && state.food.x === defensePos.x && state.food.y === defensePos.y) validDefense = false;
        if (threatPos.x === defensePos.x && threatPos.y === defensePos.y) validDefense = false;
    }
    
    state.threat = { x: threatPos.x, y: threatPos.y, name: lesson.threat.name };
    state.defense = { x: defensePos.x, y: defensePos.y, name: lesson.defense.name };
}

function draw() {
    // Clear canvas with background color
    ctx.fillStyle = "#f0faf0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = "rgba(0,166,81,0.08)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= COLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL, 0);
        ctx.lineTo(i * CELL, canvas.height);
        ctx.stroke();
    }
    
    for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CELL);
        ctx.lineTo(canvas.width, i * CELL);
        ctx.stroke();
    }
    
    // Draw snake segments
    state.snake.forEach((segment, index) => {
        const isHead = index === 0;
        const color = isHead ? "#00C261" : "#00A651";
        const x = segment.x * CELL + 1;
        const y = segment.y * CELL + 1;
        const size = CELL - 2;
        
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        drawRoundedRect(x, y, size, size, 3);
        ctx.fill();
        ctx.stroke();
    });
    
    // Draw food
    if (state.food) {
        drawChip(
            state.food.x,
            state.food.y,
            "rgba(255,255,255,0.9)",
            "rgba(156,163,175,0.5)",
            "◈",
            "#9ca3af",
            "DATA_INT"
        );
    }
    
    // Draw threat
    if (state.threat) {
        const threatLabel = "THREAT: " + state.threat.name.substring(0, 12);
        drawChip(
            state.threat.x,
            state.threat.y,
            "rgba(239,68,68,0.1)",
            "rgba(239,68,68,0.5)",
            "✉",
            "rgba(239,68,68,0.8)",
            threatLabel
        );
    }
    
    // Draw defense
    if (state.defense) {
        const defenseLabel = "DEFENSE: " + state.defense.name.substring(0, 12);
        drawChip(
            state.defense.x,
            state.defense.y,
            "rgba(0,166,81,0.1)",
            "rgba(0,166,81,0.5)",
            "🛡",
            "rgba(0,166,81,0.8)",
            defenseLabel
        );
    }
    
    // Draw dashed tether between threat and defense
    if (state.threat && state.defense) {
        ctx.save();
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        
        const threatX = state.threat.x * CELL + CELL / 2;
        const threatY = state.threat.y * CELL + CELL / 2;
        const defenseX = state.defense.x * CELL + CELL / 2;
        const defenseY = state.defense.y * CELL + CELL / 2;
        
        ctx.beginPath();
        ctx.moveTo(threatX, threatY);
        ctx.lineTo(defenseX, defenseY);
        ctx.stroke();
        
        ctx.restore();
    }
    
    // Draw idle overlay and message
    if (state.status === "idle") {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#6b7280";
        ctx.font = "16px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("PRESS [SPACE] TO START", canvas.width / 2, canvas.height / 2);
    }
    
    // Draw gameover overlay and message
    if (state.status === "gameover") {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#E31937";
        ctx.font = "16px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER — PRESS [SPACE]", canvas.width / 2, canvas.height / 2);
    }
    
    // Update coordinates display
    const head = state.snake[0];
    document.getElementById("coordinates").textContent = `[X: ${head.x}, Y: ${head.y}]`;
}

function move() {
    state.direction = { ...state.nextDirection };
    
    const newHead = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y
    };
    
    if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
        gameOver();
        return;
    }
    
    if (state.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return;
    }
    
    state.snake.unshift(newHead);
    let ate = false;
    
    if (state.food.x === newHead.x && state.food.y === newHead.y) {
        state.score += 1;
        state.totalPackets++;
        spawnFood();
        ate = true;
        addTelemetryLog("DATA PACKET COLLECTED +1", "success");
        addScoreEntry("Data Packet", 1, "#6b7280");
    }
    
    if (state.defense && state.defense.x === newHead.x && state.defense.y === newHead.y) {
        state.score += 5000;
        state.totalDefenses++;
        ate = true;
        addTelemetryLog("NODE SECURED — " + state.defense.name, "success");
        addScoreEntry("Defense: " + state.defense.name, 5000, "#00A651");
        state.defense = null;
        if (state.threat) state.threat = null;
        if (state.activeCurriculum) {
            if (typeof showCard === "function") showCard("defense");
            return;
        }
    }
    
    if (state.threat && state.threat.x === newHead.x && state.threat.y === newHead.y) {
        state.score = Math.max(0, state.score - 1000);
        state.totalThreats++;
        addTelemetryLog("THREAT DETECTED — " + state.threat.name, "danger");
        addScoreEntry("Threat: " + state.threat.name, -1000, "#E31937");
        state.threat = null;
        if (state.defense) state.defense = null;
        if (state.activeCurriculum) {
            if (typeof showCard === "function") showCard("threat");
            return;
        }
    }
    
    if (!ate) state.snake.pop();
    
    if (state.threat === null && typeof CURRICULUM !== "undefined" && CURRICULUM.length > 0 && Math.random() < 0.02) {
        if (typeof spawnThreatPair === "function") spawnThreatPair();
    }
    
    draw();
    updateDashboard();
}

function startGame() {
    if (state.status !== "idle" && state.status !== "gameover") return;
    
    state.snake = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}];
    state.direction = {x:1, y:0};
    state.nextDirection = {x:1, y:0};
    state.score = 0;
    state.status = "playing";
    state.threat = null;
    state.defense = null;
    state.activeCurriculum = null;
    state.totalThreats = 0;
    state.totalDefenses = 0;
    state.totalPackets = 0;
    state.lessonsCompleted = 0;
    
    document.getElementById("score-log").innerHTML = "";
    document.getElementById("telemetry-log").innerHTML = "";
    
    spawnFood();
    
    if (state.gameInterval) clearInterval(state.gameInterval);
    state.gameInterval = setInterval(move, state.speed);
    
    if (state.sessionTimer) clearInterval(state.sessionTimer);
    state.sessionSeconds = 0;
    state.sessionTimer = setInterval(() => {
        state.sessionSeconds++;
        const hours = Math.floor(state.sessionSeconds / 3600);
        const minutes = Math.floor((state.sessionSeconds % 3600) / 60);
        const seconds = state.sessionSeconds % 60;
        const timeStr = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
        document.getElementById("session-timer").textContent = "[SESSION: " + timeStr + "]";
    }, 1000);
    
    addTelemetryLog("SESSION INITIALIZED", "success");
    updateDashboard();
    draw();
}

function gameOver() {
    state.status = "gameover";
    if (state.gameInterval) clearInterval(state.gameInterval);
    if (state.sessionTimer) clearInterval(state.sessionTimer);
    addTelemetryLog("SESSION TERMINATED", "danger");
    updateDashboard();
    draw();
}

function updateDashboard() {
    document.getElementById("score-value").textContent = state.score;
    document.getElementById("progress-fill").style.width = Math.min(state.score / 50 * 100, 100) + "%";
    document.getElementById("rank-percent").textContent = Math.min(state.score, 100) + "%";
    document.getElementById("threats-count").textContent = state.totalThreats;
    document.getElementById("defense-count").textContent = state.totalDefenses;
    document.getElementById("packets-count").textContent = state.totalPackets;
}

function addTelemetryLog(message, type) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timeStr = hours + ":" + minutes + ":" + seconds;
    
    const entry = document.createElement("div");
    entry.className = "log-entry";
    
    const timeSpan = document.createElement("span");
    timeSpan.className = "log-time";
    timeSpan.textContent = timeStr;
    
    const messageSpan = document.createElement("span");
    messageSpan.className = type === "success" ? "log-success" : "log-danger";
    messageSpan.textContent = message;
    
    entry.appendChild(timeSpan);
    entry.appendChild(messageSpan);
    
    const telemetryLog = document.getElementById("telemetry-log");
    telemetryLog.insertBefore(entry, telemetryLog.firstChild);
}

function addScoreEntry(label, points, color) {
    const scoreLog = document.getElementById("score-log");
    if (scoreLog.textContent === "No recent activity...") {
        scoreLog.innerHTML = "";
    }
    
    const entry = document.createElement("div");
    entry.className = "score-entry";
    
    const labelSpan = document.createElement("span");
    labelSpan.className = "event-label";
    labelSpan.textContent = label;
    labelSpan.style.color = color;
    
    const scoreSpan = document.createElement("span");
    scoreSpan.className = "event-score";
    scoreSpan.textContent = (points >= 0 ? "+" : "") + points;
    scoreSpan.style.color = color;
    
    entry.appendChild(labelSpan);
    entry.appendChild(scoreSpan);
    
    scoreLog.insertBefore(entry, scoreLog.firstChild);
}

function showCard(type) {
    const lesson = state.activeCurriculum;
    document.getElementById("card-category").textContent = lesson.category;
    document.getElementById("card-title").textContent = lesson[type].name;
    document.querySelector(".threat-label").textContent = "THREAT: " + lesson.threat.name;
    document.getElementById("threat-desc").textContent = lesson.threat.description;
    document.querySelector(".defense-label").textContent = "DEFENSE: " + lesson.defense.name;
    document.getElementById("defense-desc").textContent = lesson.defense.description;
    
    const continueBtn = document.getElementById("continue-btn");
    continueBtn.classList.remove("defense-btn", "threat-btn");
    continueBtn.classList.add(type + "-btn");
    
    if (type === "defense") {
        continueBtn.textContent = "CONTINUE (+5000 PTS) [SPACE]";
    } else if (type === "threat") {
        continueBtn.textContent = "CONTINUE (-1000 PTS) [SPACE]";
    }
    
    document.getElementById("lesson-overlay").classList.remove("hidden");
    state.status = "paused";
    clearInterval(state.gameInterval);
    startCardTimer();
}

function startCardTimer() {
    state.cardTimeLeft = 20;
    const timerBar = document.getElementById("card-timer-bar");
    const countdown = document.getElementById("card-countdown");
    
    state.cardTimer = setInterval(() => {
        state.cardTimeLeft -= 0.1;
        timerBar.style.width = (state.cardTimeLeft / 20 * 100) + "%";
        countdown.textContent = Math.ceil(state.cardTimeLeft) + "s";
        
        if (state.cardTimeLeft <= 0) {
            dismissCard();
        }
    }, 100);
}

function extendTimer() {
    state.cardTimeLeft = Math.min(state.cardTimeLeft + 10, 30);
    document.getElementById("card-timer-bar").style.width = (state.cardTimeLeft / 20 * 100) + "%";
    document.getElementById("card-countdown").textContent = Math.ceil(state.cardTimeLeft) + "s";
}

function dismissCard() {
    clearInterval(state.cardTimer);
    document.getElementById("lesson-overlay").classList.add("hidden");
    state.status = "playing";
    state.gameInterval = setInterval(move, state.speed);
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        if (state.status === "idle" || state.status === "gameover") {
            startGame();
        } else if (state.status === "paused") {
            if (typeof dismissCard === "function") dismissCard();
        }
        return;
    }
    
    if (state.status !== "playing") return;
    
    const keyMap = {
        ArrowUp: {x:0, y:-1},
        KeyW: {x:0, y:-1},
        ArrowDown: {x:0, y:1},
        KeyS: {x:0, y:1},
        ArrowLeft: {x:-1, y:0},
        KeyA: {x:-1, y:0},
        ArrowRight: {x:1, y:0},
        KeyD: {x:1, y:0}
    };
    
    const newDir = keyMap[e.code];
    if (newDir) {
        if (newDir.x !== -state.direction.x || newDir.y !== -state.direction.y) {
            state.nextDirection = newDir;
        }
        e.preventDefault();
    }
});

document.querySelectorAll(".diff-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.speed = parseInt(btn.dataset.speed);
        if (state.status === "playing") {
            clearInterval(state.gameInterval);
            state.gameInterval = setInterval(move, state.speed);
        }
    });
});

document.querySelectorAll(".ctrl-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (state.status !== "playing") return;
        
        const dirMap = {
            up: {x:0, y:-1},
            down: {x:0, y:1},
            left: {x:-1, y:0},
            right: {x:1, y:0}
        };
        
        const newDir = dirMap[btn.dataset.dir];
        if (newDir) {
            if (newDir.x !== -state.direction.x || newDir.y !== -state.direction.y) {
                state.nextDirection = newDir;
            }
        }
    });
});

document.getElementById("extend-btn").addEventListener("click", () => {
    extendTimer();
});

document.getElementById("continue-btn").addEventListener("click", () => {
    dismissCard();
});

spawnFood();
draw();
