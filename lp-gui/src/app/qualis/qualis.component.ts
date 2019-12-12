import { Component, OnInit } from '@angular/core';
import { QualisService } from './qualis.service';
import { Qualis } from '../../../../common/qualis';
@Component({
  selector: 'app-import',
  templateUrl:'./qualis.component.html',
  styleUrls: ['./qualis.component.css']
})
export class QualisComponent implements OnInit {

  private qualisTable : Qualis = new Qualis();
  private file : File = null;
  private statusReport = false;
  private importStatus = "";
  private avaliacao = "";

  constructor(private qualisService: QualisService) { }
  
  setFile(file: FileList): void { 
    this.file = file[0];
  }

  sendFile(): void { 
    if (this.file) {
      this.qualisService.sendFile(this.file).subscribe(
        (status : string) => {
            this.getTable();   
            this.importStatus = status;
            this.statusReport = true; 
        },
        msg => {
          alert(msg.message);
        }
      );
    } else alert("Selecione um arquivo");
  }

  getTable() {  
    this.qualisService.getQualis().subscribe(
        (table) => {
            this.qualisTable.tabela = table;
        },
        msg => {
            alert(msg.message);
        }
    )
  }

  clearQualis() {
    this.qualisService.clearQualis().subscribe(
      (status) => {
        if (status) {
          this.getTable(); 
        }
      },
      msg => {
        alert(msg.message);
      }
    );
  }

  getAvaliacao() : string {
    return this.avaliacao;
  }

  setAvaliacao(periodico : string) {
    console.log(periodico);
    this.qualisService.getAvaliacao(periodico).subscribe(
      (res : string) => {
        this.avaliacao = res;
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