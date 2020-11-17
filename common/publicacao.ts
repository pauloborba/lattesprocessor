export class Publicacao {
    titulo: string;
    periodico: string;
    issn: string;

    constructor() {
        this.titulo = "";
        this.periodico = "";
        this.issn = "";
    }

    randomMize(): void {
        this.titulo = this.gerarString(5);
        this.periodico = this.gerarString(10);
        this.issn = this.gerarString(8);
    }

    gerarString(length: number): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}