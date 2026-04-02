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
