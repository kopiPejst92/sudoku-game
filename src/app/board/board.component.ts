import { Component, OnInit } from '@angular/core';
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
  selCell: number[] = []
  selDig: number = 0

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    while (this.sudokuBoard.length == 0 || this.sudokuBoard == undefined) {
      this.sudokuBoard = this.boardService.initializeBoard()
    }
    this.startGame()
  }

  startGame(): void {
    this.boardService.generateNaive();
  }

  selectValue(value: number): void {
    this.selDig = value
    if (!Array.isArray(this.selCell)) {
      this.boardService.fillValue(this.selDig, this.selCell)
      this.selCell=[]
    }
  }

  selectCell(m: number, n: number): void {
    this.selCell = [m, n]
    if (this.selDig != null && this.selDig != 0) {
      this.boardService.fillValue(this.selDig, this.selCell)
    }
  }

}
