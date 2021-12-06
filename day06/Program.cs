using System;
using System.Collections.Generic;
using System.Linq;

List<int> parseInput(string filename)
    => System.IO.File.ReadLines(filename)
    .First()
    .Split(",")
    .Select(line => Int32.Parse(line))
    .ToList();

long solve(List<int> input, int days)
{
    var currentDay = 0;
    var fishes = new long[9];

    foreach (var i in input) fishes[i]++;

    while (currentDay < days) {
        var newFishes = fishes[0];
        var temp = new long[fishes.Length];
        for (var i = 0; i < temp.Length-1; i++)
            temp[i] = fishes[i+1];

        temp[6] += newFishes;
        temp[8] += newFishes;

        fishes = temp;
        currentDay++;
    }

    return fishes.ToList().Sum();
}

var input = parseInput("input.txt");

var part = Environment.GetEnvironmentVariable("part");

Console.WriteLine("C#");
Console.WriteLine(solve(input, part == "part2" ? 256 : 80));