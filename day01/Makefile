.PHONY: one

build:
	@echo "Building image"
	@docker build -t day01 .

one: build
	@echo "Running part one"
	@docker run -e part=part1 day01

two: build
	@echo "Running part two"
	@docker run -e part=part2 day01
