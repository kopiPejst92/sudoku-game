import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSVService {
  private path: string = "/assets/game_examples/sudoku_examples.csv"

  constructor(private httpClient: HttpClient) {
  }

  importDataFromCSV(): void {
    var text:string;
    // console.log("Path: " + this.path)
    this.readTextFile().subscribe(data=>text=data)
  }

  readTextFile(): Observable<string> {
    return this.httpClient.get(this.path, {responseType: 'text'})
    
  }

}
