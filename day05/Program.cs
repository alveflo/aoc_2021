using System;
using System.Collections.Generic;
using System.Linq;

namespace Day05
{
    class Program
    {
        private record Coordinate(int x1, int y1, int x2, int y2);

        static (List<Coordinate> coordinates, List<List<int>> matrix) parseInput(string filename) {
            var input = System.IO.File.ReadLines(filename)
                .ToArray();
            var coordinates = new List<Coordinate>();
            var maxX = 0;
            var maxY = 0;

            for (var i = 0; i < input.Length; i++) {
                var line = input[i];
                var split = line.Split(" -> ");
                (var coordinate1, var coordinate2) = (split[0].Split(','), split[1].Split(','));

                var c = new Coordinate(int.Parse(coordinate1[0]), int.Parse(coordinate1[1]), int.Parse(coordinate2[0]), int.Parse(coordinate2[1]));

                if (c.x1 > maxX) maxX = c.x1;
                if (c.x2 > maxX) maxX = c.x2;
                if (c.y1 > maxY) maxY = c.y1;
                if (c.y2 > maxY) maxY = c.y2;

                coordinates.Add(c);
            }

            var matrix = new List<List<int>>();
            for (var i = 0; i <= maxY+1; i++)
            {
                var inner = new List<int>();
                for (var j = 0; j <= maxX+1; j++)
                {
                    inner.Add(0);
                }
                matrix.Add(inner);
            }

            return (coordinates, matrix);
        }

        static int solve(List<Coordinate> coordinates, List<List<int>> matrix, bool includeDiagonals)
        {
            var coordinatesWithGreaterThanTwoOverlaps = 0;

            foreach (var c in coordinates)
            {
                if (c.y1 == c.y2)
                {
                    var min = c.x1 > c.x2 ? c.x2 : c.x1;
                    var max = c.x1 > c.x2 ? c.x1 : c.x2;

                    for (var l = min; l <= max; l++)
                    {
                        matrix[l][c.y1]++;
                    }
                }
                else if (c.x1 == c.x2)
                {
                    var min = c.y1 > c.y2 ? c.y2 : c.y1;
                    var max = c.y1 > c.y2 ? c.y1 : c.y2;

                    for (var l = min; l <= max; l++)
                    {
                        matrix[c.x1][l]++;
                    }
                }
                else if (includeDiagonals)
                {
                    var x = c.x1;
                    var y = c.y1;

                    matrix[x][y]++;
                    while (y != c.y2) {
                        x = (x < c.x2) ? x + 1 : x - 1;
                        y = (y < c.y2) ? y + 1 : y - 1;

                        matrix[x][y]++;
                    }
                }
            }

            for (var i = 0; i < matrix.Count; i++)
            for (var j = 0; j < matrix.Count; j++)
            {
                if (matrix[i][j] > 1)
                    coordinatesWithGreaterThanTwoOverlaps++;
            }

            return coordinatesWithGreaterThanTwoOverlaps;
        }

        static void Main(string[] args)
        {
            var input = parseInput("input.txt");

            var part = Environment.GetEnvironmentVariable("part");

            Console.WriteLine("C#");
            Console.WriteLine(solve(input.coordinates, input.matrix, part == "part2"));
        }
    } 
}
