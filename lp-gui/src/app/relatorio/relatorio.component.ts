import { Component, OnInit } from '@angular/core';
import { RelatorioService } from './relatorio.service';
import { Qualis } from '../../../../common/qualis';
import { Pesquisador } from '../../../../common/pesquisador';
@Component({
  selector: 'app-import',
  templateUrl:'./relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatorioComponent implements OnInit {

    private relatorio : Pesquisador[];

  constructor(private estudo: RelatorioService) { }
  
  sendFile(file: Pesquisador[]): void { 
    this.estudo.sendAvaliacao(file).subscribe(
      //estudo.avaliações;
      (status) => {
        if (status) {
          //this.getTable(); 
        }
      },
      msg => {
        alert(msg.message);
      }
    );
  }

  onMove(): void {

  }

  ngOnInit(): void {

  }
}
