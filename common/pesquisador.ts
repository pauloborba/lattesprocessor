import { Publicacao } from './publicacao';

export class Pesquisador {
  nome: string;
  orgao: string;
  publicacoes: Publicacao[];

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.orgao = "";
    this.publicacoes = [];
  }

  copyFrom(p: Pesquisador): Pesquisador {
    this.nome = p.nome;
    this.orgao = p.orgao;
    this.publicacoes = p.publicacoes;
    return this;
  }
  
  getDiffString(p: Pesquisador): string {
      let result = "- ";
      let found = 0;
      let count = 0;
      for(let i = 0; i < this.publicacoes.length; i++) {
          found = 0;
          for(let j = 0; j <= p.publicacoes.length; j++) {
              if (j === p.publicacoes.length) {
                  if (found === 0) {
                      result = result + this.publicacoes[i].titulo + ", ";
                  }
              } else {
                  if (p.publicacoes[j].isEqual(this.publicacoes[i])) {
                      found = 1;
                  }
              }
          }
      }
      result = result + "+ ";
      for (let i = 0; i < p.publicacoes.length; i++) {
          found = 0;
          for(let j = 0; j <= this.publicacoes.length; j++) {
              if (j === this.publicacoes.length) {
                  if (found === 0) {
                      result = result + p.publicacoes[i].titulo + ", ";
                      count++;
                  }
              } else {
                  if (this.publicacoes[j].isEqual(p.publicacoes[i])) {
                      found = 1;
                  }
              }
          }
      }
      if (result === "- + ") {
          result = "O currículo importado é igual ao presente no sistema.";
      } else {
          let percentage = count / ((p.publicacoes.length - 1) / 100);
          result = result + percentage + "% de diferença.";
      }
      return result;
  }
  
  addPublicacao(p: Publicacao): Pesquisador{
    this.publicacoes.push(p);
    return this;
  }
}
