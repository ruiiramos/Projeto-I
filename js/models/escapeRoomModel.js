export class EscapeRoom {
    #name = '';

    #image = '';

    #puzzles = [];

    #completedPuzzles = 0;

    constructor(name, image) {
        this.#name = name;
        this.#image = image;
    }

    get name() {
        return this.#name;
    }
    
    set name(name) {
        this.#name = name;
    }

    get image() {
        return this.#image;
    }
    
    set image(image) {
        this.#image = image;
    }

    get puzzles() {
        return this.#puzzles;
    }
    
    addPuzzle(puzzle) {
        this.#puzzles.push(puzzle);
    }

    getPuzzle(challengeNumber) {
        return this.puzzles.find((puzzle) => puzzle.number === challengeNumber);
    }

    getPuzzleIndex(puzzle) {
        return this.puzzles.indexOf(puzzle) + 1;
    }
}