using System;
using System.Collections.Generic;
using System.Linq;
List<int> parseInput(string filename) => System.IO.File.ReadLines(filename).First().Split(",").Select(line => Int32.Parse(line)).ToList();
long solve(List<int> input, int days) {
    var fishes = new long[9];
    foreach (var i in input) fishes[i]++;
    for (var day = 0; day < days; day++) {
        var newFishes = fishes[0];
        for (var i = 0; i < fishes.Length - 1; i++) fishes[i] = fishes[i+1];
        fishes[6] += newFishes;
        fishes[8] = newFishes;
    }
    return fishes.ToList().Sum();
}
var input = parseInput("input.txt");
Console.WriteLine(solve(input, Environment.GetEnvironmentVariable("part") == "part2" ? 256 : 80));