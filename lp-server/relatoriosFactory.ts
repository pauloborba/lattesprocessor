import { Relatorio } from '../common/relatorio';
import { Qualis } from '../common/Qualis'

export class RelatorioFactory {
    relatorios: Relatorio[];
    counter: number;

    constructor() {
        this.clean();
    }

    clean(): void {
        this.relatorios = [];
        this.counter = 0;
    }

    getRelatorios(): Relatorio[] {
        return this.relatorios;
    }
    

    addRelatorio(p: Relatorio, qualis: Qualis[]): Relatorio {
        var rela = new Relatorio();
        rela.copyFrom(p);
        rela.generate(qualis)
        if (!this.findRelatorio(rela)){
            rela.id = this.counter;
            this.counter++;
            this.relatorios.push(rela);
            return rela;
        }
       

        return null;
    }

    findRelatorio(r: Relatorio): Relatorio {
        var relatorioJaCadastrado = this.relatorios.find(a => JSON.stringify(a.pesquisadores) == JSON.stringify(r.pesquisadores) && 
                                                                a.dataFinal == r.dataFinal &&
                                                                a.dataInicial == r.dataInicial);

        if (relatorioJaCadastrado)
            return relatorioJaCadastrado;

        return relatorioJaCadastrado;
    }
    deleteRelatorio(id: number): number{
        if(id >= this.counter){
            return -1;
        } else{
            let relaIndex = this.relatorios.findIndex( (n) => {return n.id == id})
            if(relaIndex >= 0){
            this.relatorios.splice(relaIndex, 1);
            return relaIndex;
            }else{
                return -1;
            }
            
        }
    }
    updateRelatorio(id: number, qualis: Qualis[]): Relatorio {
        let relaIndex = this.relatorios.findIndex((n) => { return n.id == id })
        if(relaIndex >= 0){
            let relatorio = this.relatorios[relaIndex];
            relatorio.generate(qualis)
            return relatorio;
        }else{
            return null;
        }
    }
}