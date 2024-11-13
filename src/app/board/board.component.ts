import { Component } from '@angular/core';
import { Sudoku } from './models/sudoku';

// const SIZES=[9,30]

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  gboard: number[][] = [[1, 4, 0], [5, 0, 8, 7, 6, 5]];

  sudoku: Sudoku = {
    size: 9,
    board: this.gboard
  }
}
