import { Pesquisador } from "./pesquisador";

export class Grupo {
    nome: string;
    integrantes: Pesquisador[];

    constructor() {
        this.clean();
    }

    clean() {
        this.nome = "";
        this.integrantes = [];
    }

    clone(): Grupo {
        var grupo: Grupo = new Grupo();
        grupo.copyFrom(this);
        return grupo;
      }

    copyFrom(from: Grupo) {
        this.nome = from.nome;
        this.integrantes = from.integrantes;
    }
}

