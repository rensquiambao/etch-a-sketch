const gridContainer = document.querySelector("#grid-container");
const gridItem = document.querySelector("#grid-item");
const gridbtn = document.querySelector("#grid-btn");
const resetBtn = document.querySelector("#reset-btn");
const colorBtn = document.querySelector("#color-btn");
const selectColor = document.querySelector("#select-color");
const colorStorage = document.querySelector("#color-storage");

createGrid(50, 50);

function createGrid(rows, cols) {
    for (let i = 0; i < cols; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("cols");
        gridContainer.appendChild(gridItem);

        for (let i = 0; i < rows; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            gridItem.appendChild(square);
        }
    }
}

gridContainer.addEventListener("mouseover", (e) => {
    // console.log(e.target.style.backgroundColor);
    if (colorStorage.textContent === "rainbow") {
        if (e.target.classList.contains("square")) {
            e.target.style.backgroundColor = getRandomColor();
        }
    } else if (colorStorage.textContent === "gray") {
        if (e.target.classList.contains("square")) {
            const bgColor = e.target.style.backgroundColor;
            console.log("bgColor", bgColor);
            if (bgColor === "") {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            } else {
                let currentColor = e.target.style.backgroundColor;
                currentColor = parseFloat(
                    currentColor.split(",")[3].replace(")", "").trim()
                );
                const newColor = currentColor + 0.1;
                console.log("New Color", newColor);

                const rgbaString = `rgba(0, 0, 0, ${newColor})`;
                console.log("rgbaString", rgbaString);

                e.target.style.backgroundColor = rgbaString;
            }
        }
    } else {
        if (e.target.classList.contains("square")) {
            e.target.style.backgroundColor = "black";
        }
    }
});

gridbtn.addEventListener("click", function () {
    let userInput;
    do {
        userInput = prompt("Enter desired grid size.");
        if (userInput === null) {
            break;
        } else if (userInput >= 2 && userInput <= 100) {
            break;
        } else {
            alert("Please enter a valid number from 2 to 100.");
        }
    } while (true);

    const gridElements = document.querySelectorAll(".cols");
    for (let i = gridElements.length - 1; i >= 0; i--) {
        gridElements[i].remove();
    }
    createGrid(userInput, userInput);
});

function removeGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}
function resetPage() {
    removeGrid();
    createGrid(50, 50);
}
resetBtn.addEventListener("click", function () {
    resetPage();
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.querySelector("#color-btn").addEventListener("click", function () {
    const isHidden = window.getComputedStyle(selectColor).display === "none";
    if (isHidden) {
        selectColor.style.display = "flex";
    } else {
        selectColor.style.display = "none";
    }
});

document.querySelector("#black-btn").addEventListener("click", function () {
    colorStorage.textContent = "black";
    selectColor.style.display = "none";
    const colorBtn = document.querySelector("#color-btn");
    const img = colorBtn.querySelector("img");
    img.src =
        "file:///home/wes/Coding/rens/etch-a-sketch/icons8-color-40 (black).png";
});
document.querySelector("#gray-btn").addEventListener("click", function () {
    colorStorage.textContent = "gray";
    selectColor.style.display = "none";
    const colorBtn = document.querySelector("#color-btn");
    const img = colorBtn.querySelector("img");
    img.src =
        "file:///home/wes/Coding/rens/etch-a-sketch/icons8-color-40 (gray).png";
});
document.querySelector("#rainbow").addEventListener("click", function () {
    colorStorage.textContent = "rainbow";
    selectColor.style.display = "none";
});

colorBtn.addEventListener("mouseover", function (e) {
    e.target.src =
        "file:///home/wes/Coding/rens/etch-a-sketch/icons8-color.gif";
});
colorBtn.addEventListener("mouseout", function (e) {
    e.target.src =
        "file:///home/wes/Coding/rens/etch-a-sketch/icons8-color-50 (rainbow).png";
});
