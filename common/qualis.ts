export class Qualis {
    tabela : Map<string,{issn :string,avaliacao :string}>;

    constructor() {
        this.clean();
    }

    clean() {
        this.tabela = new Map<string,{issn :string,avaliacao :string}>();
    }
    
    //add methods here

    addEntry(periodico : string, issn : string, avaliacao : string) {
        if (!this.assertKey(periodico)) {
            this.tabela.set(periodico, {issn: issn, avaliacao: avaliacao});
        }
    }

    assertKey(periodico : string) : boolean {
        return this.tabela.has(periodico);
    }

    getAvaliacao(periodico : string) : string {
        if (this.assertKey(periodico)) {
            return this.tabela.get(periodico).avaliacao;
        }
        return null;
    }

    getIssn(periodico : string) : string {
        return this.tabela.get(periodico).issn;
    }

    copyFrom(qualis : Qualis) {
        this.tabela = new Map<string,{issn :string,avaliacao :string}>();
        for (let e of qualis.tabela.entries()) {
            this.tabela.set(e[0], {issn: e[1].issn, avaliacao: e[1].avaliacao});
        }
    }

    clone() : Qualis {
        let copy : Qualis = new Qualis();
        copy.copyFrom(this);
        return copy;
    }

    getSize() : number {
        return this.tabela.size;
    }

    getQualis() : Map<string,{issn :string,avaliacao :string}> {
        return this.tabela;
    }
  }