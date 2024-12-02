import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sudoku } from '../models/sudoku';


const posSizes = [9, 30]
let mN: [number, number]
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private sudoku: Sudoku;

  constructor(private snackbar: MatSnackBar) {
    let savedSudoku = localStorage.getItem("sudoku");
    this.sudoku = savedSudoku ? JSON.parse(savedSudoku) : [];
  }

  fillValue(value: number, cell: number[]) {
    let row: number = cell[0]
    let col: number = cell[1]
    console.log("Filling cell: [" + cell + "]")
    if (this.checkIfGenerated(row, col)) {
      this.snackbar.open("Cell is already filled")
    }
    else if (this.sudoku.board[row][col] != null && this.checkValue(row, col, value)) {
      this.sudoku.board[row][col] = value
    }
    else {
      this.snackbar.open("Value is invalid")
    }
  }

  checkIfGenerated(m: number, n: number) {
    if (this.sudoku.board[m][n] === 0) {
      for (let gcell of this.sudoku.genCell) {
        if (gcell[0] === m && gcell[1] === n) {
          console.log("m: " + m + "n: " + n)
          console.log("m: " + gcell[0] + " n:" + gcell[1])
          return true;
        }
      }
      return false
    }
    return false
  }

  initializeBoard(): number[][] {
    let newBoard: number[][] = []
    this.sudoku = {
      size: posSizes[0],
      board: [],
      genCell: []
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

  uploadBoard(board: number[][]) {
    this.sudoku.board = board
  }

  generateRandom() {
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

  generateNaive() {
    for (let m = 0; m < 9; m++) {
      // console.log("Filling row: " + (m + 1))
      for (let n = 0; n < 9; n++) {
        let gtime: number = DIGITS[0]
        while (gtime < 9) {
          for (let v = 1; v <= 9; v++) {
            if (this.sudoku.board[m][n] === 0 && !this.checkValue(m, n, v)) {
              // console.log("Filling cell: [" + m + "," + n + "] with value: " + v)
              this.sudoku.board[m][n] = v;
              this.sudoku.genCell.push([m, n])
              continue;
            }
            gtime++;
          }
        }
      }
    }
  }

  generateBoardBackTrack() {
    let digGrid: number[] = DIGITS
    let hasSol: boolean = true
    let empCell: number[] = []
    let lastCell: number[] = []
    let value = 0
    do {
      empCell = this.findEmptyCell()
      if (empCell.length == 2) {
        //here we have searching for solution
        for (let v = 0; v < digGrid.length; v++) {
          value = digGrid[v]
          if (this.checkValue(empCell[0], empCell[1], value)) {
            console.log("Filling cell: " + empCell + "with value " + value)
            this.sudoku.board[empCell[0]][empCell[1]] = value
            lastCell = empCell
            empCell = []
            hasSol = true
            break
          }
          else continue
        }
        if (empCell.length == 2 && value == 9) hasSol = false;
      }
    }
    while (hasSol)
    if (hasSol == false && empCell.length != 0) {
      console.log("We are backtracking. Clearing cell: ", lastCell)
      let lastUsed: number = this.sudoku.board[lastCell[0]][lastCell[1]]
      this.sudoku.board[lastCell[0]][lastCell[1]] = 0
      digGrid = digGrid.filter((ele, ind) => ele !== lastUsed);
      // this.generateBoardBackTrack()
    }
    else {
      console.log("This sudoku does not have solution")
    }
  }

  findEmptyCell(): number[] {
    for (let m = 0; m < 9; m++)
      for (let n = 0; n < 9; n++) {
        if (this.sudoku.board[m][n] === 0) {
          return [m, n];
        }
      }
    return []
  }


  checkValue(row: number, col: number, value: number): boolean {
    if (value >= 1 && value <= 9) {
      return this.checkRow(row, value) && this.checkCol(col, value) && this.checkQuadrant(row, col, value)
    }
    else return false
  }

  checkQuadrant(row: number, col: number, value: number): boolean {
    let quadrant: number[][] = this.getWholeQuadrant(row, col);
    for (let row of quadrant)
      if (row.includes(value))
        return false;
    return true;
  }

  checkCol(col: number, value: number): boolean {
    let columnToCheck = this.getWholeColumn(col)
    return !columnToCheck.includes(value)
  }

  checkRow(row: number, value: number): boolean {
    let rowToCheck: number[] = this.sudoku.board[row]
    return !rowToCheck.includes(value)
  }

  getWholeColumn(col: number): number[] {
    let column: number[] = []
    for (let row of this.sudoku.board) {
      let value: number = row[col]
      column.push(value)
    }
    return column
  }

  getWholeQuadrant(x: number, y: number): number[][] {
    let quadrant: number[][] = [];
    if (inRange(0, 8, x) && inRange(0, 8, y)) {
      let startRow: number = x - x % 3;
      let startCol: number = y - y % 3;
      for (let m = startRow; m < startRow + 3; m++) {
        let qrow: number[] = []
        for (let n = startCol; n < startCol + 3; n++) {
          let value = this.sudoku.board[m][n]
          qrow.push(value)
        }
        quadrant.push(qrow)
      }
      console.log(quadrant)
      return quadrant;
    }
    else return [];
  }

}

function randomColAndRow() {
  var randomCol = randomNumberRange(0, 8);
  var randomRow = randomNumberRange(0, 8);
  mN = [randomRow, randomCol];
  return mN
}

function randomNumberRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function inRange(min: number, max: number, value: number): boolean {
  if (value >= min && value <= max)
    return true
  else return false
}

