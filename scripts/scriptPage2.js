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
        const selectedTiles = document.querySelectorAll(".letter.selected");
        const currentString = Array.from(selectedTiles).map(t => t.textContent).join("");
        
        wordList.forEach(word => {
            // Check if the selected letters match the word exactly
            if (!foundWords.includes(word) && currentString === word) {
                foundWords.push(word);
                
                // --- Specific Sound Logic ---
                // This looks for the audio tag with the ID "sound-ILOVEYOU", etc.
                const sound = document.getElementById(`sound-${word}`);
                if (sound) {
                    sound.currentTime = 0; // Reset to start
                    sound.play();
                }
                
                // Visual feedback: Strike through the word in the list
                const wordElement = document.getElementById(`word-${word}`);
                if (wordElement) {
                    wordElement.style.textDecoration = "line-through";
                    wordElement.style.color = "gray";
                }
                
                // Change style of letters in the grid
                selectedTiles.forEach(t => {
                    t.classList.remove("selected");
                    t.classList.add("found");
                });
    
                // If all words are found, reveal the Next button
                if (foundWords.length === wordList.length) {
                    const nextBtn = document.getElementById("final-next-btn");
                    if (nextBtn) nextBtn.style.display = "block";
                }
            }
        });
    }
    setupWordSearch();
});