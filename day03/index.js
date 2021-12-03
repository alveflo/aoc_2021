const fs = require('fs')

function inputDataLinesIntegers(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function solvePart1(input) {
    var gamma = "", epsilon = "", byteSize = input[0].length;

    for (var i = 0; i < byteSize; i++) {
        var sum = input.map(x => parseInt(x.toString().charAt(i)))
            .reduce((accumulator, current) => accumulator + current);
        var mostCommonBit = sum > (input.length / 2) ? 1 : 0;
        var leastCommonBit = sum > (input.length / 2) ? 0 : 1;

        gamma += mostCommonBit.toString();
        epsilon += leastCommonBit.toString();
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function solvePart2() {
    const input = inputDataLinesIntegers();

    var oxygen = "";
    var co2 = "";

    var oxygens = input;
    var co2s = input;

    var byteLength = input[0].length;
    while (oxygens.length > 1) {
        for (var j = 0; j < byteLength; j++) {
            var ones = 0;
            var zeroes = 0;
            for (var i = 0; i < oxygens.length; i++) {
                if (oxygens[i].charAt(j) === '1')
                    ones++;
                else
                    zeroes++;
            }
            if (ones > zeroes) {
                oxygen += "1";
                co2 += "0";
            } else {
                oxygen += "0";
                co2 += "1";
            }
    
            var mostCommon = ones > zeroes ? "1" : "0";
    
            var leastCommon = ones > zeroes ? "0" : "1";
    
            var apa = mostCommon;
            apa = ones === zeroes ? "1" : mostCommon;
            var temp = oxygens.filter(x => {
                return x.toString().charAt(j) === apa;
            });
            oxygens = temp;
        }
    }
    while (co2s.length > 1) {
        for (var j = 0; j < byteLength; j++) {
            var ones = 0;
            var zeroes = 0;
            for (var i = 0; i < co2s.length; i++) {
                if (co2s[i].charAt(j) === '1')
                    ones++;
                else
                    zeroes++;
            }
            if (ones > zeroes) {
                oxygen += "1";
                co2 += "0";
            } else {
                oxygen += "0";
                co2 += "1";
            }
    
            var mostCommon = ones > zeroes ? "1" : "0";
    
            var leastCommon = ones > zeroes ? "0" : "1";
    
            var apa = leastCommon;
            apa = ones === zeroes ? "0" : leastCommon;
            if (co2s.length > 1) {
                var temp = co2s.filter(x => {
                    return x.toString().charAt(j) === apa;
                });
                co2s = temp;
            }
        }
    }

    var result = parseInt(oxygens[0],2) * parseInt(co2s[0], 2);
    return result;
}


console.log("Javascript")
const part = process.env.part || "part1"

if (part === "part1")
    console.log(solvePart1(inputDataLinesIntegers()))
else
    console.log(solvePart2())

module.exports = {
    solvePart1, solvePart2, inputDataLinesIntegers
}
