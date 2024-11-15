import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';

const SIZES = [9, 30]

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  sudokuBoard: number[][] = [];


  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    while (this.sudokuBoard.length == 0 || this.sudokuBoard == undefined) {
      this.sudokuBoard = this.boardService.initializeBoard()
    }
    this.startGame()
  }

  startGame() {
    this.boardService.generate();
  }
}
