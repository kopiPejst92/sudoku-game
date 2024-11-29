import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
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
  csvContent: string = ""
  private path: string = "/assets/game_examples/sudoku_examples.csv"

  constructor(private boardService: BoardService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.selCell = []
    this.selDig = 0
    while (this.sudokuBoard.length == 0 || this.sudokuBoard == undefined) {
      this.sudokuBoard = this.boardService.initializeBoard()
    }
    this.loadCSVFile()
    if (this.sudokuBoard.length==0) this.startGame()
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
    this.selCell = []
    this.selDig = 0

  }

  selectValue(value: number): void {
    this.selDig = value
    if (this.selCell.length != 0) {
      this.boardService.fillValue(this.selDig, this.selCell)
      this.sudokuBoard=this.boardService.getBoard()
      this.selCell = []
    }
  }

  selectCell(m: number, n: number): void {
    this.selCell = [m, n]
    console.log("Selected cell: " + this.selCell)
    if (this.selDig != 0) {
      this.boardService.fillValue(this.selDig, this.selCell)
    }
  }

  loadCSVFile(): void {
    this.httpClient.get(this.path, { responseType: 'text' }).subscribe({
      next: (data: string) => {
        this.csvContent = data
        console.log('Zawartość pliku CSV: ', this.csvContent);
        this.getSudokuFromCSV(this.csvContent)
      },
      error: (err) => {
        console.error("Błąd podczas pobierania pliku: ", err);
      }
    });

  }
  getSudokuFromCSV(data: string): void {
    let sudokuList: string[] = data.split("\n").splice(1)
    sudokuList = sudokuList[0].split(",")[0].split("", 81)
    this.sudokuBoard = Array.from({ length: 9 }, (_, rowIndex) => sudokuList.slice(rowIndex * 9, (rowIndex + 1) * 9).map(str => Number(str)));
    this.boardService.uploadBoard(this.sudokuBoard)
    this.originBoard = this.sudokuBoard
    console.log(this.sudokuBoard)
    // sudokuList[0].split(",")[1].split("", 81)  
  }

  solveSudoku(): void{
    this.boardService.generateBoardBackTrack()
  }
}
