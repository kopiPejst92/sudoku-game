import { Component, OnInit } from '@angular/core';
import { CSVService } from '../helpers/csv.service';
import { BoardService } from './board.service';

const SIZES = [9, 30]
let mN: [number, number]

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  sudokuBoard: number[][] = [];
  originBoard: number[][] = [];
  selCell: number[] = []
  selDig: number = 0

  constructor(private boardService: BoardService, private csv: CSVService) {
  }

  ngOnInit(): void {
    while (this.sudokuBoard.length == 0 || this.sudokuBoard == undefined) {
      this.sudokuBoard = this.boardService.initializeBoard()
    }
    this.startGame()
  }

  print(): void {
    this.csv.importDataFromCSV()
  }

  startGame(): void {
    this.boardService.generateNaive();
    this.originBoard = this.sudokuBoard
  }

  clearBoard() {
    this.sudokuBoard = this.boardService.initializeBoard()
  }

  refreshBoard() {
    this.sudokuBoard = this.originBoard
  }

  selectValue(value: number): void {
    this.selDig = value
    if (this.selCell.length != 0) {
      this.boardService.fillValue(this.selDig, this.selCell)
      this.selCell = []
    }
  }

  selectCell(m: number, n: number): void {
    this.selCell = [m, n]
    if (this.selDig != 0) {
      this.boardService.fillValue(this.selDig, this.selCell)
    }
  }

}
