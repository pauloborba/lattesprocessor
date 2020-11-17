import { Publicacao } from './publicacao';

export class Pesquisador {
    nome: string;
    publicacoes: Publicacao[];

    constructor() {
        this.nome = "";
        this.publicacoes = [];
    }

    randomMize(): void {
        this.nome = this.gerarString(10);
        var pub = Math.round(Math.random() * 10 / 3);
        for (let i = 0; i < pub; i++) {
            var temp = new Publicacao()
            temp.randomMize();
            this.publicacoes.push(temp);
        }
        
    }
    getNome(): string {
        return this.nome;
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