const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

const reverseString = (input) => {
    let output = '';
    for (let i = input.length - 1; i >= 0; i--) {
        output += input[i];
    }
    return output;
}

rl.on('line', (input) => {
    console.log(reverseString(input));
});
