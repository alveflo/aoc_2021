import std/[strutils, sequtils, math, os]

func solve(input: openArray[string], useAim: bool): int =
  var horizontal = 0
  var depth = 0
  var aim = 0

  for line in input:
    var instruction = line.split(' ')[0]
    var value = parseInt(line.split(' ')[1])
    case instruction:
      of "forward":
        horizontal += value
        if useAim:
          depth += value * aim
      of "down":
        if useAim:
          aim += value
        else:
          depth += value
      of "up":
        if useAim:
          aim -= value
        else:
          depth -= value

  return (horizontal * depth)

when isMainModule:
  echo "Nim"
  echo solve(readFile("input.txt").strip().splitLines(), getEnv("part") == "part2")

