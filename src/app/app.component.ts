import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { BoardService } from './board/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Granny\'s game!';

  constructor(private boardService: BoardService, private http: HttpClient) {

  }

  solveSudoku() {
    new BoardComponent(this.boardService, this.http).solveSudoku()
  }

  generateSudoku() {
    new BoardComponent(this.boardService, this.http).generateSudoku()
  }
}

