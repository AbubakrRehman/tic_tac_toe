let squares = document.querySelectorAll(".square");
let gameContainer = document.querySelector("#game-container");
let reset = document.querySelector("#reset");
let result = document.querySelector("#result");

let mapp = {}
let chance = true;
let allFilled = 0;

function checkWin() {
    //check row wise
    for (var i = 0; i < 3; i++) {
        let set = new Set();
        for (var j = 0; j < 3; j++) {
            set.add(mapp[`${i}-${j}`]);
        }
        if (set.size === 1 && (set.has("O") || set.has("X"))) {
            return true;
        }
    }

    //check column wise
    for (var i = 0; i < 3; i++) {
        let set = new Set();
        for (var j = 0; j < 3; j++) {
            set.add(mapp[`${j}-${i}`]);
        }
        if (set.size === 1 && (set.has("O") || set.has("X"))) {
            return true;
        }
    }

    //diagonal
    let set = new Set();
    for (var i = 0; i < 3; i++) {
        set.add(mapp[`${i}-${i}`]);
    }
    if (set.size === 1 && (set.has("O") || set.has("X"))) {
        return true;
    }

    //anti-diagonal
    i = 0;
    j = 2;
    set = new Set();
    while (i < 3) {
        set.add(mapp[`${i}-${j}`]);
        i++;
        j--;
    }
    if (set.size === 1 && (set.has("O") || set.has("X"))) {
        return true;
    }

    return false;
}

gameContainer.addEventListener("click", (e) => {
    if (e.target.dataset.index) {
        if (!mapp[e.target.dataset.index]) {
            if (chance === true) {
                mapp[e.target.dataset.index] = "X";
                e.target.classList.add("squareWithX");
                chance = false;
            } else {
                mapp[e.target.dataset.index] = "O";
                e.target.classList.add("squareWithO");
                chance = true;
            }
            allFilled++;
        }
    }
    let res = checkWin();
    if (res === true) {
        result.innerHTML = `Player ${mapp[e.target.dataset.index]} won.`;
        gameContainer.style.pointerEvents = "none";
    }

    if (allFilled === 9 && res === false) {
        result.innerHTML = `Match Tie!! `;
        gameContainer.style.pointerEvents = "none";
    }



});


reset.addEventListener("click", (e) => {
    for (let i = 0; i < 9; i++) {
        if (squares[i].classList.contains("squareWithX")) {
            squares[i].classList.remove("squareWithX");
        } else {
            squares[i].classList.remove("squareWithO");
        }

    }

    chance = true;
    mapp = {};
    allFilled = 0;
    result.innerHTML = "";
    gameContainer.style.pointerEvents = "auto";
})