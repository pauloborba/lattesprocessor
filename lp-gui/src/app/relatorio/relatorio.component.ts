import { Component, OnInit, ElementRef } from '@angular/core';
import { Qualis } from '../../../../common/qualis';
import { Pesquisador } from '../../../../common/pesquisador';
import { EstudosComparativos } from '../estudoscomparativos/estudoscomparativos.service';
@Component({
  selector: 'app-import',
  templateUrl:'./relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatorioComponent implements OnInit {
  constructor() {}
    relatorio : string[] = ['g','b','c','dd','e','f','g','a'];
  
  getArray(): void { 
    //colocar getPesquisadores em estudos comparativos
    /* Stub */


    /**/
    /**-/ this.estudoService.getPesquisadores()
      .then(as => this.relatorio = as)
      .catch(erro => alert(erro));/**/
  }

  onMove(): void {

  }

  ngOnInit(): void {

  }
}
