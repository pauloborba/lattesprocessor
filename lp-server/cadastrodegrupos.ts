import e = require('express');
import { Grupo } from '../common/grupo';
import { Pesquisador } from '../common/pesquisador';

export class CadastroDeGrupos {
    grupos: Grupo[];
    
    constructor() {
        this.grupos = [];
    }

    addGrupo(g: Grupo): Grupo {
        let result = null;
        if (this.nomevalido(g)) {
            result = new Grupo();
            result.copyFrom(g);
            this.grupos.push(result);
        }

        return result;
    }

    nomevalido(grupo: Grupo): boolean {
        return !(this.grupos.find(g => g.nome == grupo.nome)) && grupo.nome != "";
    }

    getGrupos() : Grupo[] {
        return this.grupos;
    }

    removerGrupo(nome: String): Grupo[] {
        let index = this.grupos.findIndex(elem => elem.nome === nome);
        let result = this.grupos.splice(index, 1);
        return result;
    }

    addPesquisador(nome: String, pesq: Pesquisador): Grupo[] {
        let result = null;
        let index = this.grupos.findIndex(g => g.nome === nome);
        if (!this.findPesquisador(pesq, index)) {
            this.grupos[index].integrantes.push(pesq);
            result = this.grupos;
        }
        return result;
    }

    findPesquisador(pesq: Pesquisador, i: any) {
        if (this.grupos[i].integrantes.find(p => p.nome === pesq.nome)) {
            return true;
        }
        return false;
    }

    adicionarPesquisadores(integrantesAdd: Pesquisador[], nome: String): Pesquisador[] {
        let index = this.grupos.findIndex(elem => elem.nome === nome);
        integrantesAdd = integrantesAdd.filter(elem => {
            if (!this.grupos[index].integrantes.find(e => e.nome === elem.nome)) {
                return true;
            } else {
                return false;
            }
        });
        this.grupos[index].integrantes = this.grupos[index].integrantes.concat(integrantesAdd);
        return this.grupos[index].integrantes;
        
    }
    
}