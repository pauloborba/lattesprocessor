import { Publicacao } from './publicacao';

export class Pesquisador {
  nome: string;
  orgao: string;
  publicacoes: Publicacao[];

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "Gab";
    this.orgao = "";
    this.publicacoes = [];
  }

  // methods go here
}