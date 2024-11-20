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
    let times = randomNumberRange(17, 40);
    console.log("Times: " + times);
    for (let t = 1; t < times; t++) {
      let mN = randomColAndRow();
      // console.log("Picked cell: [" + mN[0] + "," + mN[1] + "]");
      let value = randomNumberRange(1, 9);

      // console.log("Random value to fill: " + value);
      this.sudoku.board[mN[0]][mN[1]] = value
    }
  }

  checkValue(row:number, col:number, value:number){
    if(value>=1 && value <= 9){
      return this.checkRow(row, value) && this.checkCol(col, value) && this.checkQuadrant(row,col, value)
    }else{

      return false
    }
  }

  checkQuadrant(row: number, col: number, value: number): boolean {
    let quadrant: number[] = []
    let qNum: number = getQuadrantNumber(row, col)

    return false
  }

  checkCol(col: number, value: number): boolean {
    let columnToCheck = this.getWholeColumn(col)
    return columnToCheck.includes(value)
  }

  checkRow(row: number, value: number): boolean {
    let rowToCheck: number[] = this.sudoku.board[row]
    return rowToCheck.includes(value)
  }

  getWholeColumn(col:number): number[] {
    let column: number[] = []
    for(let row of this.sudoku.board){
      let value: number = row[col]
      column.push(value)
    }
    return column
  }

  getWholeQuadrant(qNum: number){
    switch(qNum){
      case 1:
        
    }
  }
}

function randomColAndRow() {
  var randomCol = randomNumberRange(0, 8);
  var randomRow = randomNumberRange(0, 8);
  mN = [randomRow, randomCol];
  return mN

}

function getQuadrantNumber(row: number, col: number) {
  if (row >= 0 && row < 3)
    if (col > 0 && col < 3)
      return 1;
    else if (col >= 3 && col < 6)
      return 2;
    else if (col >= 6 && col < 9)
      return 3;
    else if (row >= 3 && row < 6)
      if (col > 0 && col < 3)
        return 4;
      else if (col >= 3 && col < 6)
        return 5;
      else if (col >= 6 && col < 9)
        return 6;
      else if (row >= 6 && row < 9)
        if (col > 0 && col < 3)
          return 7;
        else if (col >= 3 && col < 6)
          return 8;
        else if (col >= 6 && col < 9)
          return 9;
        else
          throw new Error("Number of row is not valid")
          return 0;
}

function randomNumberRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
