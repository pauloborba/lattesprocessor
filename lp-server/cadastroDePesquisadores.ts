import { Pesquisador } from '../common/pesquisador';

export class CadastroDePesquisadores {
    pesquisadores: Pesquisador[];

    constructor() {
        this.clean();
    }

    clean(): void {
        this.pesquisadores = [];
    }

    getPesquisadores(): Pesquisador[] {
        return this.pesquisadores;
    }

    addPesquisador(p: Pesquisador): Pesquisador {
        let pesq = new Pesquisador();
        pesq.copyFrom(p);

        if (!this.findPesquisador(pesq)) {
            this.pesquisadores.push(p);
        } else {
            pesq = null;
        }

        return pesq;
    }

    updatePesquisador(p: Pesquisador): Pesquisador {
        let pesq = new Pesquisador();
        pesq.copyFrom(p);

        if (this.findPesquisador(pesq)) {
            let idx = this.pesquisadores.findIndex(e => e.nome === pesq.nome);
            this.pesquisadores[idx] = p;
            console.log("!!! ATUALIZADO !!!");
        } else {
            pesq = null;
        }

        return pesq;
    }

    findPesquisador(p: Pesquisador): boolean {
        let pesquisadorJaCadastrado = this.pesquisadores.find(a => a.nome === p.nome);

        if (pesquisadorJaCadastrado)
            return true;

        return false;
    }
}
