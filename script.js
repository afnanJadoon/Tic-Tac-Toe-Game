let mainGame = document.querySelector(".mainGame");
let hideGame = document.querySelector(".hideGame");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGameBtn");
let msgContainer = document.querySelector(".msgContainer");
let win = document.querySelector(".win");
let winHide = document.querySelector(".winHide");
let draw = document.querySelector(".draw");
let drawHide = document.querySelector(".drawHide")

mainGame.classList.remove("hideGame");

let turnO = true;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableboxes();
    msgContainer.classList.add("hideMsgContainer");
    mainGame.classList.remove("hideGame");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) { // playerO
            box.innerText = "O";
            box.style.color = "white";
            turnO = false;
        }
        else { //playerX
            box.innerText = "X";
            box.style.color = "black";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        checkDraw();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
    checkDraw();
};

const checkDraw = () => {
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false; 
        }
    });

    if (isDraw) {
        showDraw();
    }
};

const showWinner = (winner) => {
    draw.classList.add("drawHide");
    win.classList.remove("winHide");
    win.innerText = `${winner} Wins`;
    msgContainer.classList.remove("hideMsgContainer");
    mainGame.classList.add("hideGame");
};

const showDraw = () => {
    win.classList.add("winHide");
    draw.classList.remove("drawHide");
    draw.innerText = "Match Draw";
    msgContainer.classList.remove("hideMsgContainer");
    mainGame.classList.add("hideGame");
};