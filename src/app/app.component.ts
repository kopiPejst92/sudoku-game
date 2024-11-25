import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private path: string = "/assets/game_examples/sudoku_examples.csv"
  csvContent: string = ""
  title = 'Granny\'s game!';
  csv: string = ""


  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.loadCSVFile()
  }

  loadCSVFile(): void {
    let arr: string[] = []
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
      this.csv=data.split(('\n'))[1]
  }

}
