import { Pesquisador } from '../../common/pesquisador';
import { CadastroDePesquisadores } from '../cadastroDePesquisadores';

describe("A classe CadastroDePesquisadores", () => {
    var cadastro: CadastroDePesquisadores;

    beforeEach(() => cadastro = new CadastroDePesquisadores());

    it("criação correta de um novo cadastro de pesquisadores", () => {
        expect(cadastro.getPesquisadores().length).toBe(0);
    })

    it("cadastro correto de um novo pesquisador", () => {
        expect(cadastro.getPesquisadores().length).toBe(0);

        var pesq = new Pesquisador();
        pesq.nome = "Paulo Borba";

        cadastro.addPesquisador(pesq);

        expect(cadastro.getPesquisadores().length).toBe(1);
    })

    it("checagem correta de um pesquisador já cadastrado", () => {
        expect(cadastro.getPesquisadores().length).toBe(0);

        var pesqOriginal = new Pesquisador();
        var pesqDuplicado = new Pesquisador();

        pesqOriginal.nome = "Paulo Borba";
        pesqDuplicado.nome = "Paulo Borba";

        cadastro.addPesquisador(pesqOriginal);
        cadastro.addPesquisador(pesqDuplicado);

        expect(cadastro.getPesquisadores().length).toBe(1);
    })
})