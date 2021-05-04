import { Pesquisador } from '../common/pesquisador';

export class CadastroDePesquisadores {
  pesquisadores: Pesquisador[] = [];

  constructor() {
    this.pesquisadores = [];
  }

  //methods go here
  addPesquisador(p: Pesquisador): Pesquisador {
    let result = null;

    // vereify if pesquisador is already here
    //TODO refactor this
    result = new Pesquisador;
    result.copyFrom(p);

    let pesqIndex = this.getIndex(result);

    if(pesqIndex === -1) {
      this.pesquisadores.push(p);
    } else {
      this.pesquisadores[pesqIndex] = result;
    }

    return result;
  }
  
  alreadyExists(p: Pesquisador): boolean {
      let tempPesquisador = new Pesquisador;
      tempPesquisador.copyFrom(p);
      
      let pesqIndex = this.getIndex(tempPesquisador);
      
      if(pesqIndex === -1) {
          return false;
      } else {
          return true;
      }
  }
  
  //call only if p already exists
  getDiffString(p: Pesquisador): string {
      let tempPesquisador = new Pesquisador;
      tempPesquisador.copyFrom(p);
      
      let pesqIndex = this.getIndex(tempPesquisador);
      
      return this.pesquisadores[pesqIndex].getDiffString(tempPesquisador);
  }

  getIndex(p: Pesquisador): number {
    for(let i = 0; i < this.pesquisadores.length; i++) {
      if(this.pesquisadores[i].nome === p.nome) {
        return i;
      }
    }

    return -1;
  }

  getPesquisadores(): Pesquisador[] {
    return this.pesquisadores;
  }
}
