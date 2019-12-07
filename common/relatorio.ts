export class Relatorio {
    nome : string;
    qualis: number[];

    constructor(name: string){
      this.clean(name);
    }

    clean(name: string): void {
      this.nome = name;
      this.qualis = [0,0,0,0,0,0,0,0];
    }
  }