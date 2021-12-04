const fs = require('fs')
function inputDataLinesIntegers(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getPlayerDatas(input) {
    var boards = [];

    input = input.filter(x => x != "");
    for (var i = 0; i < input.length; i+=5) {
        var currentBoard = [];
        for (var j = 0; j < 5; j++) {
            var line = input[i+j];
            var nums = line.trim().split(' ')
                .filter(x => x !== '');

            var temp = [];
            for (var x = 0; x < nums.length; x++) {
                temp.push(nums[x]);
            }
            currentBoard.push(temp);
        }

        boards.push(currentBoard);
    }

    return boards;
}

function solve() {
    const input = inputDataLinesIntegers();

    var bingoInputs = input[0].split(',');
    input.splice(0,1);
    var boards = getPlayerDatas(input);
    var winners = {};
    var nrOfWinners = 0;
    var lastWinner = 0;
    var firstWinner = 0;

    for (var i = 0; i < bingoInputs.length; i++) {
        var num = bingoInputs[i];
        for (var b = 0; b < boards.length; b++) {
            var board = boards[b];

            var rowCount = 0;
            for (var row = 0; row < 5; row++)
            {
                for (var column = 0; column < 5; column++) {
                    if (board[row][column] == num) {
                        board[row][column] = 1;
                    }
                }
            }

            var bingo = false;
            for (var row = 0; row < 5; row++)
            {
                var rowBingo = 0;
                var columnBingo = 0;
                for (var column = 0; column < 5; column++) {
                    if (board[row][column] == 1) {
                        rowBingo++;
                    }
                    if (board[column][row] == 1) {
                        columnBingo++;
                    }
                }
                bingo = rowBingo == 5 || columnBingo == 5;
                if (bingo) {
                    break;
                }                
            }

            if (bingo) {
                var sum = 0;
                for (var row = 0; row < 5; row++)
                {
                    for (var column = 0; column < 5; column++) {
                        if (board[row][column] != 1) {
                            sum += parseInt(board[row][column]);
                        }
                    }
                }

                if (!winners[b]) {
                    nrOfWinners++;
                    winners[b] = {
                        "sum": sum * parseInt(num),
                        "order": nrOfWinners
                    };
                    lastWinner = sum * parseInt(num);
                    if (firstWinner == 0) firstWinner = lastWinner;
                }
            }
        }
    }

    return [firstWinner, lastWinner];
} 

console.log("Javascript")
const part = process.env.part || "part1"

if (part === "part1")
    console.log(solve()[0])
else
    console.log(solve()[1])

module.exports = {
    solve, inputDataLinesIntegers
}
