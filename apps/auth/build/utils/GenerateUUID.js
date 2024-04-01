"use strict";
exports.__esModule = true;
function generateUUID(len) {
    var chars = [];
    var allowedChars = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
    ];
    for (var i = 0; i < len; i++) {
        var index = Math.floor(Math.random() * allowedChars.length);
        chars.push(allowedChars[index]);
    }
    return chars.join("");
}
exports["default"] = generateUUID;
