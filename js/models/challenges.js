export class Challenge {
  #text = '';
  #answers = [];
  #solution = 0;
  #pointId = 0;
  #solved = false;

  constructor(text, answers, solution, pointId) {
    this.#text = text;
    this.#answers = answers;
    this.#solution = solution;
    this.#pointId = pointId;
    this.selectedAnswer = null;
  }

  get text() {
    return this.#text;
  }

  get answers() {
    return this.#answers;
  }

  get solution() {
    return this.#solution;
  }

  get solved() {
    return this.#solved;
  }

  set solved(value) {
    this.#solved = value;
  }

  get pointId() {
    return this.#pointId;
  }

  isCorrect() {
    return this.selectedAnswer === this.solution;
  }
}