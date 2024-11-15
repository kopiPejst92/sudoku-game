import { Injectable } from '@angular/core';
import { Sudoku } from '../models/sudoku';

const posSizes = [9, 30]
let mN: [number, number]

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private sudoku: Sudoku;

  constructor() {
    let savedSudoku = localStorage.getItem("sudoku");
    this.sudoku = savedSudoku ? JSON.parse(savedSudoku) : [];
  }

  initializeBoard(): number[][] {
    let newBoard: number[][] = []
    this.sudoku = {
      size: posSizes[0],
      board: []
    }

    for (let m = 0; m < this.sudoku.size; m++) {
      let row: number[] = []
      for (let n = 0; n < this.sudoku.size; n++) {
        row.push(0)
      }
      newBoard.push(row)
    }
    this.sudoku.board = newBoard
    return this.sudoku.board;
  }

  getBoard(): number[][] {
    return this.sudoku.board;
  }

  generate() {
    let times = randomNumberRange(17, 81);
    console.log("Times: " + times);
    for (let t = 1; t < times; t++) {
      let mN = randomColAndRow();
      // console.log("Picked cell: [" + mN[0] + "," + mN[1] + "]");
      let value = randomNumberRange(1, 9);

      // console.log("Random value to fill: " + value);
      this.sudoku.board[mN[0]][mN[1]] = value
    }
  }
}

function randomColAndRow() {
  var randomCol = randomNumberRange(0, 8);
  var randomRow = randomNumberRange(0, 8);
  mN = [randomRow, randomCol];
  return mN

}

function getQuadrant(row: number, col: number) {
  if(row > 0 && row <3)
    if(col > 0 && col < 3)
      return 1;
    else if(col >= 3 && col < 6)
      return 2;
}

function randomNumberRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
