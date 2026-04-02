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
        state.score += 500;
        state.totalDefenses++;
        ate = true;
        addTelemetryLog("NODE SECURED — " + state.defense.name, "success");
        addScoreEntry("Defense: " + state.defense.name, 500, "#00A651");
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
