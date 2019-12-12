import {Qualis} from '../../common/qualis';
import {QualisFactory} from '../qualisfactory';    
let fs = require('fs');

describe("A tabela qualis", () => {
    let qualisFactory : QualisFactory;

    beforeEach(() => qualisFactory = new QualisFactory());

    it("usa a biblioteca que lê planilhas para adequadamente converter o arquivo excel para um JSON", () => {
        let file : string =  fs.readFileSync('./spec/test.xls', 'binary');
        qualisFactory.readXls(file);
        expect(qualisFactory.getFileContent()).not.toEqual(null);
    })

    it("constroi e retorna um objeto Qualis a partir de um JSON corretamente", () => {
        let file : string =  fs.readFileSync('./spec/test.xls', 'binary');
        qualisFactory.readXls(file);
        qualisFactory.makeQualis();
        let qualis : Qualis = qualisFactory.getQualis().clone();
        expect(qualis.getSize()).toBe(3);
        expect(qualis.assertKey("ACM Transactions on Intelligent Systems and Technology")).toBe(true);
        expect(qualis.assertKey("Applied Intelligence (Boston)")).toBe(true);
        expect(qualis.assertKey("BMC Genomics")).toBe(true);
        expect(qualis.getAvaliacao("ACM Transactions on Intelligent Systems and Technology")).toBe("A1");
        expect(qualis.getIssn("ACM Transactions on Intelligent Systems and Technology")).toBe("2157-6904");
        expect(qualis.getAvaliacao("Applied Intelligence (Boston)")).toBe("B1");
        expect(qualis.getIssn("Applied Intelligence (Boston)")).toBe("0924-669X");
        expect(qualis.getAvaliacao("BMC Genomics")).toBe("B2");
        expect(qualis.getIssn("BMC Genomics")).toBe("1471-2164");
    })
}) 