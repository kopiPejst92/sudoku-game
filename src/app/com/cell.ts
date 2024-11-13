export class Cell {
    value: number;
    row: number;
    col: number;
    generated: boolean


    constructor(row:number, col:number, value:number, generated:boolean){
        this.value=value
        this.row=row
        this.col=col
        this.generated=generated
    }
}


