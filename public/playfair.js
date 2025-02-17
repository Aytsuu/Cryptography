const keyword = document.getElementById('keyword');
const PEPlainText = document.getElementById('PEPlainText');
const PECipherText = document.getElementById('PECipherText');
const PDPlainText = document.getElementById('PDPlainText');
const PDCipherText = document.getElementById('PDCipherText'); 
const gridTable = document.getElementById('grid');

const rows = cols = 5
let alphabetGrid = []

// Handles the input of keyword
keyword.addEventListener('input', (e) =>{
    const keywordVal = e.target.value;
    generateGrid(keywordVal); // Generate grid
})

// Handles the input of plain text for encryption
PEPlainText.addEventListener('input', (e) =>{
    let text = e.target.value.toUpperCase();
    text += (text.replace(/\s+/g, '').length % 2 === 1 ? 'X': ''); // Adds X to odd strings, excluding whitespaces
    text = text.replace(/\s+/g, ''); // Removes all whitespaces
    result = playfairShiftText(text, "+"); // Shift text
    PECipherText.value = result; // Display result
});

// Handles the input of cipher text for decryption
PDCipherText.addEventListener('input', (e) => {
    const text = e.target.value.toUpperCase(); 
    result = playfairShiftText(text, "-"); // Shift text
    PDPlainText.value = result; // Display result
})

// Function to encrypt and decrypt text
function playfairShiftText(text, operator){

    console.log(text)

    // Initialization
    let newText = '';
    let tempText = text;
    const first = { x: -1, y: -1}
    const second = { x: -1, y: -1} 
    let x = 0;


    // Iteration
    while (x < text.length && text.length % 2 === 0){

        // Determine the x and y coordinates of pair chars in the 5x5 alphabet grid
        for(let i = 0; i < alphabetGrid.length; i++){

            // Check for letter J and convert to I
            tempText = tempText.includes('J') ? tempText.replace(/J/g, 'I') : tempText;

            // Check for duplicates and convert second char to X
            tempText = tempText[1] === tempText[0] ? tempText.substring(0, 1) + 'X' + tempText.substring(2) : tempText;
            
            // Executes when the coordinates of the first character is -1
            if(first.x === -1){
                first.x = alphabetGrid[i].includes(tempText[0]) ? i : -1; // x
                first.y = alphabetGrid[i].indexOf(tempText[0]); // y
            }

            // Executes when the coordinates of the second character is -1
            if(second.x === -1){
                second.x = alphabetGrid[i].includes(tempText[1]) ? i : -1; // x
                second.y = alphabetGrid[i].indexOf(tempText[1]); // y
            }

            // Exit the loop if both positions have been determined
            if(first.x !== -1 && second.x !== -1) break;

        }

        // If both characters are on the same row
        if(first.x === second.x && first.x !== -1){

            // Takes the index of the right (encrypt) or left (decrpyt) character 
            const firstNextY = (operator === "+" ? 
                (first.y + 1) % alphabetGrid[first.x].length: 
                ((first.y - 1) % alphabetGrid[first.x].length + alphabetGrid[first.x].length) % alphabetGrid[first.x].length
            );

            const secondNextY = (operator === "+" ? 
                (second.y + 1) % alphabetGrid[second.x].length: 
                ((second.y - 1) % alphabetGrid[second.x].length + alphabetGrid[second.x].length) % alphabetGrid[second.x].length
            );

            console.log(firstNextY, secondNextY);

            // Concatenate values
            newText += alphabetGrid[first.x][firstNextY];
            newText += alphabetGrid[second.x][secondNextY];

            // Remove the two characters
            tempText = tempText.slice(2);

        } else { 

            // If both characters are on the same column
            if (first.y === second.y && first.y !== -1){ 

                // Takes the index of the character below (encrypt) or above (decrypt)
                const firstNextX = (operator === "+" ? 
                    first.x + 1 % alphabetGrid.length : 
                    ((first.x - 1) % alphabetGrid.length + alphabetGrid.length) % alphabetGrid.length
                );

                const secondNextX = (operator === "+" ? 
                    (second.x + 1) % alphabetGrid.length : 
                    ((second.x - 1) % alphabetGrid.length + alphabetGrid.length) % alphabetGrid.length
                );

                // Concatenate values
                newText += alphabetGrid[firstNextX][first.y];
                newText += alphabetGrid[secondNextX][second.y];

            } else { // The pair are not on the same row and column

                // Concatenate values
                newText += alphabetGrid[first.x][second.y]
                newText += alphabetGrid[second.x][first.y]

            }

            // Remove the two characters 
            tempText = tempText.slice(2);

        }

        // Increment
        x += 2;

        // Reset
        first.x = -1;
        first.y = -1;
        second.x = -1
        second.y = -1;

        // Exit from the main loop
        if(text.length === 0) break;
    }

    return newText;
    
}

// Generates the grid ui and shifts the characters whenever a keyword is added/updated
function generateGrid(keywordVal = ''){

    // Initialization
    const concat = keywordVal + alphabetList;
    const newAlphabetList = concat.split('').filter(char => char !== 'j');  // Change J -> I
    let alphabetIndex = 0;
    let usedLetters = new Set() // A set of unique characters 
    gridTable.innerHTML = '';

    // Iteration
    for(let i = 0; i < rows; i++){

        const row = document.createElement('tr'); // Creates the grid row element
        alphabetGrid[i] = []

        for(let j = 0; j < cols; j++){

            const cell = document.createElement('td'); // Creates the grid cell element

            // Checks if a character is already in the grid
            while(usedLetters.has(newAlphabetList[alphabetIndex].toUpperCase())){
                alphabetIndex ++;
            }

            // Adds the character to the grid
            alphabetGrid[i][j] = newAlphabetList[alphabetIndex].toUpperCase();
            usedLetters.add(alphabetGrid[i][j]) // Adds the used character to the set

            alphabetIndex ++; // Increment

            // Adding the cell to the UI
            cell.className = 'border border-gray-300 text-center p-4 text-gray-700';
            cell.textContent = alphabetGrid[i][j];
            row.appendChild(cell)
        }

        // Adding the row to the UI
        gridTable.appendChild(row);
    }
    
}

// Generate grid on render
generateGrid();