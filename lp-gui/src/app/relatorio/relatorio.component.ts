import { Component, OnInit, ElementRef } from '@angular/core';
import { Qualis } from '../../../../common/qualis';
import { Pesquisador } from '../../../../common/pesquisador';
import { Relatorio } from '../../../../common/relatorio';
import { Observable } from 'rxjs';
import { EstudosComparativosService } from '../estudoscomparativos/estudoscomparativos.service';
import { QualisService } from '../qualis/qualis.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-import',
  templateUrl:'./relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatorioComponent implements OnInit {
  constructor(private estudoService: EstudosComparativosService, private qualisService: QualisService) {}
  relatorio : Pesquisador[];
  avaliacoes : Relatorio[];
  
  getId(qualisVal: String): number{
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
  }

  getArray(): void {

    this.estudoService.getRanking([])
      .subscribe(
        as => this.relatorio = as,
        error => alert(error)
      );
    
    for(let i = 0; i < this.relatorio.length; ++i){
      this.avaliacoes.push(new Relatorio(this.relatorio[i].nome));
      var ultimaAvaliacao = this.avaliacoes.length-1;
      for(let j = 0; j < this.relatorio[i].publicacoes.length; ++j){
        var conceito : String;
        
        this.qualisService.getAvaliacao(this.relatorio[i].publicacoes[j].titulo)
          .subscribe(
            el => conceito = el,
            error => alert(error)
          );

        var id = this.getId(conceito);
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
