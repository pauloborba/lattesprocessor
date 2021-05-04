export class Publicacao {
    titulo: string;
    periodico: string;
    issn: string;
    autores: string[];

    constructor(titulo: string, periodico: string) {
        this.titulo = titulo;
        this.periodico = periodico;
    }

    //add methods here
    isEqual(p: Publicacao): boolean {
        if(this.titulo === p.titulo) {
            return true;
        } else {
            return false;
        }
    }
  }
