import { RepPesquisadores } from '../common/RepPesquisadores';
import { Pesquisador } from '../common/Pesquisador';
import { Qualis } from '../common/Qualis';

export class EstudosComparativos {
  pesos: number[] = [1, 1, 1, 1, 1, 1, 1, 1];
  ranking = []


  setPesos(novosPesos: number[]): void {
    this.pesos = novosPesos;
  }

  setDefaultPontos(): void {
    this.pesos = [8, 7, 6, 5, 4, 3, 2, 1]
  }

  setDefaultQtd(): void {
    this.pesos = [1, 1, 1, 1, 1, 1, 1, 1]
  }

  ordenar(): Pesquisador[] {
    let ordenado: Pesquisador[] = RepPesquisadores.getLista();
    ordenado.forEach((pesq) => {
      let sumPont = 0;
      pesq.publicacoes.forEach((publi) => {
        let currentPont = 0
        // consultar o qualis pra ver a avaliação pleo nome do journal
        // pra cada avaliação, dá um valor, baseado em Pontos
        if (publi.periodico == 'A1'){
          currentPont = this.pesos[0];
        } else if (publi.periodico == 'A2') {
          currentPont = this.pesos[1];
        } else if (publi.periodico == 'B1') {
          currentPont = this.pesos[2];
        } else if (publi.periodico == 'B2') {
          currentPont = this.pesos[3];
        } else if (publi.periodico == 'B3') {
          currentPont = this.pesos[4];
        } else if (publi.periodico == 'B4') {
          currentPont = this.pesos[5];
        } else if (publi.periodico == 'B5') {
          currentPont = this.pesos[6];
        } else if (publi.periodico == 'C') {
          currentPont = this.pesos[7];
        } else {
          currentPont = 0;
        }
        sumPont += currentPont;
      });
      this.ranking.push({
          pesqusador: pesq,
          pont: sumPont,
      })
    });
  }

  /*
  {
    nome: String,
    journal: String,
    ...
  }
  */







}
