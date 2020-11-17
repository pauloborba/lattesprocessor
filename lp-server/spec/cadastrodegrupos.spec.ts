import { CadastroDeGrupos } from '../cadastrodegrupos';
import { Grupo } from '../../common/grupo';
import { Pesquisador } from '../../common/pesquisador';

describe("O cadastro de grupos", () => {
    let cadastro: CadastroDeGrupos;

    beforeEach(() => cadastro = new CadastroDeGrupos());

    it("e inicialmente vazio", () => {
        expect(cadastro.getGrupos().length).toBe(0);
    })

    it("cadastra grupos corretamente", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "UFPE";
        cadastro.addGrupo(grupo);

        expect(cadastro.getGrupos().length).toBe(1);
        grupo = cadastro.getGrupos()[0];
        expect(grupo.nome).toBe("UFPE");
        expect(grupo.integrantes.length).toBe(0);
    })

    it("nao aceita grupos com o mesmo nome", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "UFPE";
        cadastro.addGrupo(grupo);

        expect(cadastro.getGrupos().length).toBe(1);
    })

    it("remove grupos corretamente", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "UFPE";
        cadastro.removerGrupo(grupo.nome);

        expect(cadastro.getGrupos().length).toBe(0);
    })

    it("adiciona pesquisadores aos grupos corretamente", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "Centro de Informatica";
        cadastro.addGrupo(grupo);

        let pesquisador: Pesquisador = new Pesquisador();
        pesquisador.nome = "Adolfo Souza";
        pesquisador.orgao = "SIPG";
        cadastro.addPesquisador(grupo.nome, pesquisador);

        expect(cadastro.getGrupos()[0].integrantes.length).toBe(1);
        pesquisador = cadastro.getGrupos()[0].integrantes[0];
        expect(pesquisador.nome).toBe("Adolfo Souza");
        expect(pesquisador.orgao).toBe("SIPG");
        expect(pesquisador.publicacoes.length).toBe(0);
    })

    it("nao adiciona um pesquisador duas vezes em um mesmo grupo", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "Engenharia de Software";
        cadastro.addGrupo(grupo);

        let pesquisador: Pesquisador = new Pesquisador();
        pesquisador.nome = "Adolfo Souza";
        pesquisador.orgao = "SIPG"
        
        pesquisador = new Pesquisador();
        pesquisador.nome = "Adolfo Souza";
        pesquisador.orgao = "SIPG"
        cadastro.addPesquisador(cadastro.getGrupos()[0].nome, pesquisador);
        cadastro.addPesquisador(cadastro.getGrupos()[0].nome, pesquisador);

        expect(cadastro.getGrupos()[0].integrantes.length).toBe(1);
    })

    it("adiciona uma lista de pesquisadores de uma vez a um grupo", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "Ciencia da Computacao";
        cadastro.addGrupo(grupo);
        
        let novosIntegrantes: Pesquisador[] = [];
        let p: Pesquisador = new Pesquisador();
        p.nome = "Alberto Monteiro";
        p.orgao = "UFRPE";
        novosIntegrantes.push(p);
        p = new Pesquisador();
        p.nome = "Lucio Mario";
        p.orgao = "UPE";
        novosIntegrantes.push(p);
        cadastro.adicionarPesquisadores(novosIntegrantes, cadastro.getGrupos()[0].nome);

        expect(cadastro.getGrupos()[0].integrantes.length).toBe(2);
    })

    it("nao repete pesquisadores ja cadastrados mas que estao em uma lista de novos integrantes", () => {
        let grupo: Grupo = new Grupo();
        grupo.nome = "Engenharia de Software";
        cadastro.addGrupo(grupo);
        
        let novosIntegrantes: Pesquisador[] = [];
        let p: Pesquisador = new Pesquisador();
        p.nome = "Alberto Monteiro";
        p.orgao = "UFRPE";
        novosIntegrantes.push(p);
        p = new Pesquisador();
        p.nome = "Lucio Mario";
        p.orgao = "UPE";
        novosIntegrantes.push(p);
        cadastro.adicionarPesquisadores(novosIntegrantes, cadastro.getGrupos()[0].nome);

        novosIntegrantes = [];
        p = new Pesquisador();
        p.nome = "Alberto Monteiro";
        p.orgao = "UFRPE";
        novosIntegrantes.push(p);
        p = new Pesquisador();
        p.nome = "Lucio Mario";
        p.orgao = "UPE";
        novosIntegrantes.push(p);
        p = new Pesquisador();
        p.nome = "Carlos Leonardo";
        p.orgao = "UPFE";
        novosIntegrantes.push(p);
        cadastro.adicionarPesquisadores(novosIntegrantes, cadastro.getGrupos()[0].nome);

        expect(cadastro.getGrupos()[0].integrantes.length).toBe(3);
    })
})