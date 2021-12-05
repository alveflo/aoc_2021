DAY :=  $(shell basename $(CURDIR))

.PHONY: one

build:
	@echo "Building image"
	docker build -t $(DAY) .

one: build
	@echo "Running part one"
	@docker run -e part=part1 $(DAY)

two: build
	@echo "Running part two"
	@docker run -e part=part2 $(DAY)

time-one:
	@echo "Measure part one"
	@time docker run -e part=part1 $(DAY)

time-two:
	@echo "Measure part two"
	@time docker run -e part=part2 $(DAY)

