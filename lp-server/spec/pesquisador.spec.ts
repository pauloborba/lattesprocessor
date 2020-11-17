import { Pesquisador } from '../../common/pesquisador';
import { Publicacao } from '../../common/publicacao';

describe("A classe Pesquisador", () => {
    var pesquisador: Pesquisador;

    beforeEach(() => pesquisador = new Pesquisador());

    it("criação correta de um novo pesquisador", () => {
        expect(pesquisador.nome).toBe("");
        expect(pesquisador.publicacoes.length).toBe(0);
    })

    it("copyFrom correto de um pesquisador", () => {
        expect(pesquisador.nome).toBe("");
        expect(pesquisador.publicacoes.length).toBe(0);

        var pesquisadorCopia = new Pesquisador();
        pesquisadorCopia.nome = "Paulo";
        pesquisador.copyFrom(pesquisadorCopia);

        expect(pesquisador.nome).toBe(pesquisadorCopia.nome);
    })

    it("addPublicacao correto de um pesquisador", () => {
        expect(pesquisador.nome).toBe("");
        expect(pesquisador.publicacoes.length).toBe(0);

        var publicacao = new Publicacao("A System For Translating Executable VDM Specifications Into Lazy ML", "Software, Practice &amp; Experience (Print)", "00380644");
        pesquisador.addPublicacao(publicacao);

        var temp = pesquisador.publicacoes;
        expect(temp[0].titulo).toBe("A System For Translating Executable VDM Specifications Into Lazy ML");
        expect(temp[0].periodico).toBe("Software, Practice &amp; Experience (Print)");
        expect(temp[0].issn).toBe("00380644");
    })
})
