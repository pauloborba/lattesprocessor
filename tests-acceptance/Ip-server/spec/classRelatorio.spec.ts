//import { CadastroDeAlunos } from '../cadastrodealunos';
//import { Aluno } from '../../common/aluno';

describe("O estudo comparativo", () => {
    var cadastro: Relatorio;
  
    beforeEach(() => cadastro = new Relatorio())
    
    it("é inicialmente vazio", () => {
        expect(cadastro.getRelatorio().length).toBe(0);
    })

    it("gera relatório corretamente", () => {
        let periodico : Relatorio = new Relatorio("Pesquisadores", "A1+B1");
        cadastro.cadastrar(Relatorio);
        expect(cadastro.getRelatorio().length).toBe(1);
        periodico = cadastro.getPeriodicos()[0];
        expect(periodico.status).toBe(1);
    })

});
