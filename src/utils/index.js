/**
 * Check is the text is a valid input
 * @param {string} text The text to be testd
 */
function isValidText(text){
    if (text == null){
        return false;
    }
    if (typeof(text) == undefined){
        return false;
    }
    if (text === ""){
        return false;
    }
    return true
}

export {isValidText}