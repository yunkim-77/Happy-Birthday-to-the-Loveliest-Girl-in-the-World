document.addEventListener("DOMContentLoaded", () => {
    const wordList = ["LOVE","YOU", "BIRTHDAY", "TWENTY", "STELLA","HAPPY"];
    let foundWords = [];

    function setupWordSearch() {
        const gridSize = 9;
        const gridElement = document.getElementById("grid");
        if (!gridElement) return;

        let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));

        // Place words into the grid array
        wordList.forEach(word => {
            let placed = false;
            while (!placed) {
                const isVertical = Math.random() > 0.5;
                const row = Math.floor(Math.random() * (gridSize - (isVertical ? word.length : 0)));
                const col = Math.floor(Math.random() * (gridSize - (isVertical ? 0 : word.length)));
                
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    let r = row + (isVertical ? i : 0);
                    let c = col + (isVertical ? 0 : i);
                    if (grid[r][c] !== null && grid[r][c] !== word[i]) {
                        canPlace = false;
                        break;
                    }

                }

                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        grid[row + (isVertical ? i : 0)][col + (isVertical ? 0 : i)] = word[i];
                    }
                    placed = true;
                }
            }
        });

        // Render the grid
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                const div = document.createElement("div");
                div.className = "letter";
                div.dataset.row = r; // Add this line
                div.dataset.col = c; // Add this line
                // Fill null spots with random letters
                div.textContent = grid[r][c] || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
                
                div.addEventListener("click", () => {
                    div.classList.toggle("selected");
                    checkSelected();
                });
                gridElement.appendChild(div);
            }
        }
    }

    function checkSelected() {
        const selectedTiles = Array.from(document.querySelectorAll(".letter.selected"));
        if (selectedTiles.length === 0) return;
    
        // Get the string of currently selected letters
        const currentString = selectedTiles.map(t => t.textContent).join("");
        
        wordList.forEach(word => {
            if (!foundWords.includes(word) && currentString === word) {
                // NEW: Check if the selected tiles are actually in a straight line
                if (isStraightLine(selectedTiles)) {
                    foundWords.push(word);
                    
                    // Play specific sound
                    const sound = document.getElementById(`sound-${word}`);
                    if (sound) { sound.currentTime = 0; sound.play(); }
                    
                    // Update UI
                    document.getElementById(`word-${word}`).style.textDecoration = "line-through";
                    
                    selectedTiles.forEach(t => {
                        t.classList.remove("selected");
                        t.classList.add("found");
                    });
    
                    if (foundWords.length === wordList.length) {
                        document.getElementById("final-next-btn").style.display = "block";
                    }
                }
            }
        });
    }
    
    // Helper function to ensure letters are neighbors in a line
    function isStraightLine(tiles) {
        if (tiles.length < 2) return true;
    
        // Get coordinates from the dataset we set up in setupWordSearch
        const coords = tiles.map(t => ({
            r: parseInt(t.dataset.row),
            c: parseInt(t.dataset.col)
        }));
    
        const dr = coords[1].r - coords[0].r;
        const dc = coords[1].c - coords[0].c;
    
        // Check if every subsequent tile follows the same direction (step of 1)
        for (let i = 1; i < coords.length; i++) {
            if (coords[i].r - coords[i-1].r !== dr || coords[i].c - coords[i-1].c !== dc) {
                return false;
            }
        }
        return true;
    }    setupWordSearch();
});