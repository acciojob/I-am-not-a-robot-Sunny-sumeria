//your code here
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const h = document.getElementById("h");

// Image classes representing different images
const images = ["img1", "img2", "img3", "img4", "img5"];
let selectedTiles = [];

function setup() {
    // Pick 5 unique + 1 duplicate
    let gameImages = [...images];
    const duplicate = images[Math.floor(Math.random() * images.length)];
    gameImages.push(duplicate);

    // Shuffle
    gameImages.sort(() => Math.random() - 0.5);

    container.innerHTML = "";
    gameImages.forEach((imgClass, index) => {
        const div = document.createElement("div");
        div.className = `img ${imgClass}`;
        div.onclick = () => selectTile(div);
        container.appendChild(div);
    });
}

function selectTile(tile) {
    if (selectedTiles.length < 2 && !selectedTiles.includes(tile)) {
        tile.classList.add("selected");
        selectedTiles.push(tile);

        resetBtn.style.display = "inline";

        if (selectedTiles.length === 2) {
            verifyBtn.style.display = "inline";
        }
    }
}

resetBtn.onclick = () => {
    selectedTiles.forEach(t => t.classList.remove("selected"));
    selectedTiles = [];
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    para.innerText = "";
};

verifyBtn.onclick = () => {
    verifyBtn.style.display = "none";
    const [t1, t2] = selectedTiles;

    // Check if class lists match (ignoring 'selected' class)
    if (t1.className === t2.className) {
        para.innerText = "You are a human. Congratulations!";
    } else {
        para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
};

setup();