import { Component, OnInit } from '@angular/core';
import { QualisService } from './qualis.service';
import { Qualis } from '../../../../common/Qualis';
@Component({
  selector: 'app-import',
  templateUrl:'./qualis.component.html',
  styleUrls: ['./qualis.component.css']
})
export class QualisComponent implements OnInit {

  private qualisTable : Qualis [];
  private qualis : Qualis [];
  private yearsFilter : string [];
  private typesFilter : string [];
  private yearQualisForm : string;
  private typeQualisForm : string;
  private yearQualisFilter : string;
  private typeQualisFilter : string;
  private file : File = null;
  private statusReport = false; 
  private importStatus = "";
  private avaliacao = "";

  constructor(private qualisService: QualisService) { }
  
  setFile(file: FileList): void { 
    this.file = file[0];
  }

  sendQualis(): void { 
    if (!this.file) {
      this.handleMessage("Selecione um arquivo");
    } else if (!this.typeQualisForm) {
      this.handleMessage("Selecione o tipo do Qualis");
    } else if (this.validYear(this.yearQualisForm)) {
      this.handleMessage("Ano inválido");
    } else {
      this.qualisService.sendQualis(this.file, this.typeQualisForm , this.yearQualisForm).subscribe(
        (status : string) => {
            this.getTable();
            this.handleMessage(status);
        },
        msg => {
          this.handleMessage(msg);
        }
      );
    }
  }

  validYear(year: string) : boolean {
    return false
  }

  handleMessage (message: string) {
    this.importStatus = message;
    this.statusReport = true; 
  } 

  filter() {
    this.qualis = this.qualisTable.filter(q => (q.ano === (Number(this.yearQualisFilter) || q.ano))  && (q.tipo === (this.typeQualisFilter || q.tipo)) )
  }

  remove() {
    this.qualisService.clearQualis(this.typeQualisFilter, this.yearQualisFilter).subscribe(
    data => {
      this.getTable()
    })
  }

  getTable() {  
    this.qualisService.getQualis().subscribe(
        (table) => {
          this.qualisTable = table;
          this.qualis = table;
          this.yearsFilter = this.qualisTable.map(q => String(q.ano));
          this.yearsFilter = this.yearsFilter.filter((q, i) => this.yearsFilter.indexOf(q) === i);
          this.typesFilter = this.qualisTable.map(q => q.tipo);
          this.typesFilter = this.typesFilter.filter((q, i) => this.typesFilter.indexOf(q) === i);
          this.yearQualisFilter = ""
          this.typeQualisFilter = ""
        },
        msg => {
            alert(msg.message);
        }
    )
  }

  onMove(): void {
    this.statusReport = false;
  }

  ngOnInit(): void {
    this.getTable();
  }
}