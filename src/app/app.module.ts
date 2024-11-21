import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {MatCardModule} from '@angular/material/card'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule, 
    MatCardModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
