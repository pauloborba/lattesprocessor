import { Publicacao } from './publicacao';

export class Pesquisador {
    nome: string;
    publicacoes: Publicacao[];

    constructor() {
        this.clean();
    }

    clean(): void {
        this.nome = "";
        this.publicacoes = [];
    }

    copyFrom(p: Pesquisador): Pesquisador {
        this.nome = p.nome;
        this.publicacoes = p.publicacoes;
        return this;
    }

    addPublicacao(p: Publicacao): Pesquisador {
        this.publicacoes.push(p);
        return this;
    }
}
