const shift = document.getElementById("shift");
const CEPlainText = document.getElementById("CEPlainText");
const CECipherText = document.getElementById("CECipherText");
const CDPlainText = document.getElementById("CDPlainText");
const CDCipherText = document.getElementById("CDCipherText");

let shiftVal = 0 

const alphabetList = 'abcdefghijklmnopqrstuvwxyz';

// Handles of the shift value
shift.addEventListener("input", (e) => {
    shiftVal = e.target.value ? e.target.value : 0;
});

// Handles the input of plain text for encryption
CEPlainText.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();
    result = CaesarShiftText(text, "+"); // Shift text
    CECipherText.value = result; // Display the result
})

// Handles the input of cipher text for decryption
CDCipherText.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();
    result = CaesarShiftText(text, "-"); // Shift text
    CDPlainText.value = result; // Display the result
})

// Function to encrypt and decrypt text
function CaesarShiftText(text, operator){
    let newText = '';

    // Iteration
    for(let i = 0; i < text.length ; i++){

        // Accepts numeric and characters outside a-z
        if(alphabetList.indexOf(text[i]) === -1) {
            newText += text[i]
        }
        else{
            newText += (operator === "+" ? 
                alphabetList[(alphabetList.indexOf(text[i]) + parseInt(shiftVal)) % 26].toUpperCase() : // Encrpytion (e + k) % 26    
                alphabetList[(alphabetList.indexOf(text[i]) - parseInt(shiftVal) + 26) % 26].toUpperCase() // Decryption (d - k) % 26
            )
        }
    }

    return newText;
}
