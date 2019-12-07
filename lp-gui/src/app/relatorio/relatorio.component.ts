import { Component, OnInit, ElementRef } from '@angular/core';
import { Qualis } from '../../../../common/qualis';
import { Pesquisador } from '../../../../common/pesquisador';
import { Relatorio } from '../../../../common/relatorio';
import { EstudosComparativos } from '../estudoscomparativos/estudoscomparativos.service';
import { QualisService } from '../qualis/qualis.service';
@Component({
  selector: 'app-import',
  templateUrl:'./relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatorioComponent implements OnInit {
  //constructor(estudoService: EstudosComparativos) {}
    relatorio : Pesquisador[];
    avaliacoes : Relatorio[]/* = [
      new Relatorio("Data Structures"),
      new Relatorio("User Interfaces"),
      new Relatorio("Number Theory")
    ];/**/
 //comentario acima usado para testar o funcionamento, uma vez que ainda não foi conectado às outras partes;

  getId(qualisVal: string): number{
    var a = 0;
    if(qualisVal == 'A1') a = 0;
    else if(qualisVal == 'A2') a = 1;
    else if(qualisVal == 'B1') a = 2;
    else if(qualisVal == 'B2') a = 3;
    else if(qualisVal == 'B3') a = 4;
    else if(qualisVal == 'B4') a = 5;
    else if(qualisVal == 'B5') a = 6;
    else if(qualisVal == 'C') a = 7;
    return a;
  }/*

  clear(): void{
    this.relatorio = [];
    this.avaliacoes = [];
  }
  setSimulation(): void{
    this.avaliacoes = [];
  }*/
  
  getArray(): void { //Ainda falta integrar estudoService (getPesquisadores) e QualisService (getAvaliacao)
    
    //this.avaliacoes[1].qualis[2] += 1;

    /**/this.estudoService.getRanking()
      .then(as => this.relatorio = as)
      .catch(erro => alert(erro));/**/
    /**/
    for(let i = 0; i < this.relatorio.length; ++i){
      this.avaliacoes.push(new Relatorio(this.relatorio[i].nome));
      var ultimaAvaliacao = this.avaliacoes.length-1;
      for(let j = 0; j < this.relatorio[i].publicacoes.length; ++j){
        var id = this.getId(QualisService.getAvaliacao(this.relatorio[i].publicacoes[j].titulo)); //falta pegar o qualis
        this.avaliacoes[ultimaAvaliacao].qualis[id] += 1;
      }
    }
    /**/
  }

  onMove(): void {

  }

  ngOnInit(): void {
    this.getArray();
  }
}
