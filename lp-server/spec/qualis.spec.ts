import {Qualis} from '../../common/qualis';

describe("A tabela qualis", () => {
    let qualis : Qualis;

    beforeEach(() => qualis = new Qualis());

    it("é inicialmente vazio", () => {
        expect(qualis.getSize()).toBe(0);
    })

    it("cadastra e retorna avaliações e issn corretamente", () => {
        qualis.addEntry("ACM Transactions on Intelligent Systems and Technology","2157-6904","A1");
        qualis.addEntry("BMC Genomics","1471-2164","B2");
        expect(qualis.getSize()).toBe(2);
        expect(qualis.assertKey("ACM Transactions on Intelligent Systems and Technology")).toBe(true);
        expect(qualis.assertKey("BMC Genomics")).toBe(true);
        expect(qualis.getAvaliacao("ACM Transactions on Intelligent Systems and Technology")).toBe("A1");
        expect(qualis.getIssn("ACM Transactions on Intelligent Systems and Technology")).toBe("2157-6904");
        expect(qualis.getAvaliacao("BMC Genomics")).toBe("B2");
        expect(qualis.getIssn("BMC Genomics")).toBe("1471-2164");
    })

    it("não insere duplicates", () => {
        qualis.addEntry("IEEE Transactions on Magnetics","0018-9464","B4");
        qualis.addEntry("IEEE Transactions on Magnetics","0278-0062","B2");
        expect(qualis.getSize()).toBe(1);
        expect(qualis.getAvaliacao("IEEE Transactions on Magnetics")).toBe("B4");
        expect(qualis.getIssn("IEEE Transactions on Magnetics")).toBe("0018-9464");
    })

    it("limpa o seu conteudo corretamente", () => {
        qualis.addEntry("ACM Transactions on Intelligent Systems and Technology","2157-6904","A1");
        qualis.addEntry("FLF.EDU","1677-0323","C");
        qualis.clean();
        expect(qualis.getSize()).toBe(0);
    })

    it("recebe a cópia de um outro objeto qualis de maneira adequada", () => {
        let factoryNew : Qualis = new Qualis();
        factoryNew.addEntry("Applied Intelligence (Boston)","0924-669X","B1");
        factoryNew.addEntry("Earth Science Informatics (Print)","1865-0473","B2");
        factoryNew.addEntry("IEEE Intelligent Systems","1541-1672","A2");
        qualis.copyFrom(factoryNew);
        expect(qualis.getSize()).toBe(3);
        expect(qualis.assertKey("Applied Intelligence (Boston)")).toBe(true);
        expect(qualis.assertKey("Earth Science Informatics (Print)")).toBe(true);
        expect(qualis.assertKey("IEEE Intelligent Systems")).toBe(true);
        expect(qualis.getAvaliacao("Applied Intelligence (Boston)")).toBe("B1");
        expect(qualis.getIssn("Applied Intelligence (Boston)")).toBe("0924-669X");
        expect(qualis.getAvaliacao("Earth Science Informatics (Print)")).toBe("B2");
        expect(qualis.getIssn("Earth Science Informatics (Print)")).toBe("1865-0473");
        expect(qualis.getAvaliacao("IEEE Intelligent Systems")).toBe("A2");
        expect(qualis.getIssn("IEEE Intelligent Systems")).toBe("1541-1672");
    })
}) 