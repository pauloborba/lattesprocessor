import { Component, OnInit } from '@angular/core';
import { RelatorioService } from './relatorio.service';
import { Qualis } from '../../../../common/qualis';
import { EstudosComparativos } from '../estudoscomparativos/estudoscomparativos.service';
@Component({
  selector: 'app-import',
  templateUrl:'./relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

    private relatorio : EstudosComparativos[];

  constructor(private estudo: EstudosComparativos) { }
  
  sendFile(file: EstudosComparativos[]): void { 
    this.estudo.sendFile(file).subscribe(
      //estudo.avaliações;
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
