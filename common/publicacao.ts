export class Publicacao {
    titulo: string;
    periodico: string;
    issn: string;

    constructor(titulo: string, periodico: string, issn: string) {
        this.titulo = titulo;
        this.periodico = periodico;
        this.issn = issn;
    }
}
