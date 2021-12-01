const fs = require('fs')

function inputDataLinesIntegers(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n").map((x)=>parseInt(x))
}

function getSolutionPart1() {
    const input = inputDataLinesIntegers();
    let increases = 0;

    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i-1]) {
            increases++;
        }
    }

    return increases;
}

function getSolutionPart2() {
    const input = inputDataLinesIntegers();
    let increases = 0;
    let previousWindowSum = -1;

    for (let i = 2; i < input.length; i++) {
        let windowSum = input[i-2] + input[i-1] + input[i];

        if (windowSum > previousWindowSum && previousWindowSum > -1) {
            increases++;
        }
        previousWindowSum = windowSum;
    }

    return increases;
}

console.log("Javascript")
const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1())
else
    console.log(getSolutionPart2())

module.exports = {
    getSolutionPart1, getSolutionPart2, inputDataLinesIntegers
}
