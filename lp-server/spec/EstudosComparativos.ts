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
        let nota = Qualis.getClassificacao(publi.periodico)
        if (nota == 'A1'){
          currentPont = this.pesos[0];
        } else if (nota == 'A2') {
          currentPont = this.pesos[1];
        } else if (nota == 'B1') {
          currentPont = this.pesos[2];
        } else if (nota == 'B2') {
          currentPont = this.pesos[3];
        } else if (nota == 'B3') {
          currentPont = this.pesos[4];
        } else if (nota == 'B4') {
          currentPont = this.pesos[5];
        } else if (nota == 'B5') {
          currentPont = this.pesos[6];
        } else if (nota == 'C') {
          currentPont = this.pesos[7];
        } else {
          currentPont = 0;
        }
        sumPont += currentPont;
      });
      
      this.ranking.push({
          pesquisador: pesq,
          pont: sumPont,
      })

      this.ranking.sort((a, b) => (a.pont > b.pont) ? 1 : (a.pont == b.pont) ? ((a.pesquisador.nome > b.pesquisador.nome) ? 1 : -1) : -1)

      return this.ranking;
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
