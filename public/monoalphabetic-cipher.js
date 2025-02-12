const substitution = document.getElementById("substitution");
const MEPlainText = document.getElementById("MEPlainText");
const MECipherText = document.getElementById("MECipherText");
const MDPlainText = document.getElementById("MDPlainText");
const MDCipherText = document.getElementById("MDCipherText");

let substitutionkey = '';
const numeric = '0123456789'

// Handles the input of substitution key
substitution.addEventListener("input", (e) =>{

    const subText = e.target.value.toLowerCase();
    
    // Disable duplicate and numeric for substitution key
    if(subText.slice(0,-1).includes(subText[subText.length - 1]) || numeric.includes(subText[subText.length - 1])){
        e.target.value = subText.slice(0, -1);
    }

    substitutionkey = e.target.value.toLowerCase(); // Convert to lowercase
});

// Handles the input of plain text for encryption
MEPlainText.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();
    result = MonoalphabetShiftText(text, "encrypt"); //Shift text
    MECipherText.value = result; // Display result
});

// Handles the input of cipher text for decryption
MDCipherText.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();
    result = MonoalphabetShiftText(text, "decrypt"); //Shift text
    MDPlainText.value = result; // Display result
});

// Function to encrypt and decrypt text
function MonoalphabetShiftText(text, type){
    let newText = '';

    // Iteration
    for(let i = 0; i < text.length; i++){

        // Accepts numbers and characters outside a-z
        if(alphabetList.indexOf(text[i]) === -1){
            newText += text[i];
        }
        else{
            switch(type){
                case "encrypt":
                    // Concatenate values
                    newText += substitutionkey[alphabetList.indexOf(text[i])] ? substitutionkey[alphabetList.indexOf(text[i])].toUpperCase() : text[i].toUpperCase();
                    break;
                case "decrypt":
                    // Concatenate values
                    newText += alphabetList[substitutionkey.indexOf(text[i])] ? alphabetList[substitutionkey.indexOf(text[i])].toUpperCase() : text[i].toUpperCase();
                    break;
            }       
        }
    }
    
    return newText;
}
