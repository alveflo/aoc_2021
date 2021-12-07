using System;
using System.Linq;

namespace day08
{
    class Program
    {
        public static int getSolutionPart1(int[] input)
        {
            var max = input.Max();
            var minCost = int.MaxValue;

            for (var i = 0; i < input.Length; i++) {
                var cCost = 0;
                var a = input[i];

                for (var j = 0; j < input.Length; j++) {
                    var b = input[j];
                    var c = Math.Abs(a - b);
                    cCost += c;
                }

                if (cCost < minCost) {
                    minCost = cCost;
                }
            }

            return minCost;
        }

        public static int getSolutionPart2(int[] input)
        {
            var max = input.Max();
            var minCost = int.MaxValue;

            for (var i = 1; i < max; i++) {
                var cCost = 0;
                var a = i;

                for (var j = 0; j < input.Length; j++) {
                    var b = input[j];
                    var steps = Math.Abs(a - b);

                    var totCCost = 0;
                    for (var k = 1; k <= steps; k++)
                        totCCost += k;

                    cCost += totCCost;
                }

                if (cCost < minCost) {
                    minCost = cCost;
                }
            }

            return minCost;
        }

        static void Main(string[] args)
        {
            int[] input = parseInput("input.txt");

            var part = Environment.GetEnvironmentVariable("part");

            Console.WriteLine("C#");
            if ("part2".Equals(part)) {
                Console.WriteLine(getSolutionPart2(input));
            } else {
                Console.WriteLine(getSolutionPart1(input));
            }
        }

        static int[] parseInput(string filename) {
            return System.IO.File.ReadLines(filename)
            .First()
            .Split(',')
            .Select(line => Int32.Parse(line))
            .ToArray();
        }
    }
}
