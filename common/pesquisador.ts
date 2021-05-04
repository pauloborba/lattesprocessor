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
                      result = result + this.publicacoes[i].getTitulo() + ", ";
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
                      result = result + p.publicacoes[i].getTitulo() + ", ";
                      count++;
                  }
              } else {
                  if (this.publicacoes[j].isEqual(p.publicacoes[i])) {
                      found = 1;
                  }
              }
          }
      }
      let authorCount = this.getAuthorDiff(p)[0];
      if (result === "- + " && authorCount === 0) {
          result = "O currículo importado é igual ao presente no sistema.";
      } else {
          count = count + authorCount;
          let percentage = count / ((p.publicacoes.length - 1) / 100);
          result = result + percentage + "% de diferença.";
      }
      return result;
  }
  
  getAuthorDiff(p: Pesquisador): [number, string] {
      let result = "+ ";
      let count = 0;
      for (let i = 1; i < this.publicacoes.length; i++) {
          for (let j = 1; j < p.publicacoes.length; j++) {
              if (this.publicacoes[i].isEqual(p.publicacoes[j])) {
                  if (this.publicacoes[i].getAutores().length != p.publicacoes[j].getAutores().length) {
                      for (let k = 0; k < p.publicacoes[j].getAutores().length; k++) {
                          let found = 0;
                          for (let l = 0; l < this.publicacoes[i].getAutores().length; l++) {
                              if (p.publicacoes[j].getAutores()[k] === this.publicacoes[i].getAutores()[l]) {
                                  found = 1;
                              }
                          }
                          if (found === 0) {
                              count++;
                              result = result + p.publicacoes[j].getAutores()[k] + " foi adicionado(a) como autor(a) a " + p.publicacoes[j].getTitulo();
                          }
                      }
                  }
              }
          }
      }
      if (result === "+ ") {
          result = "";
      }
      let actualResult: [number, string] = [count, result]
      return actualResult;
  }
  
  addPublicacao(p: Publicacao): Pesquisador{
    this.publicacoes.push(p);
    return this;
  }
}
