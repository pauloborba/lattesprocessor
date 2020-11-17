export class Qualis {

    titulo: string
    ano: number
    tipo: string
    issn: string
    avaliacao: string
   

    constructor() {
        this.titulo = ""
        this.ano = 0;
        this.tipo = ""
        this.issn = ""
        this.avaliacao = ""
     
    }

    montar(titulo: string, ano: number, tipo: string, issn: string, avaliacao: string){
        this.titulo = titulo;
        this.ano = ano;
        this.tipo = tipo;
        this.issn = issn;
        this.avaliacao = avaliacao;
    
    }

    randomMize(): void {
        this.titulo = this.gerarString(5);
        this.ano = Math.floor(Math.round(1900 + Math.random() * (2020 - 1900)))
        this.tipo = this.gerarString(7);
        this.issn = this.gerarString(8);
        this.avaliacao = this.gerarAvaliacao();
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
    gerarAvaliacao(): string {
        var nota = Math.floor(Math.round(1 + Math.random() * (8 - 1)))
        if(nota < 5){
            nota = 5 - nota;
            return "B"+nota;
        }else{
            nota = 9 - nota;
            return "A"+(nota);
        }
    }
}