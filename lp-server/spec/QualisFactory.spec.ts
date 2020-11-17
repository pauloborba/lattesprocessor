import {Qualis} from '../../common/Qualis';
import {QualisFactory} from '../QualisFactory';    
import * as fs from "fs";
import * as path from "path";

describe("O cadastro de qualis", () => {
    let qualisFactory : QualisFactory;

    beforeEach(() => qualisFactory = new QualisFactory());

    it("usa a biblioteca que lê planilhas para adequadamente converter o arquivo excel para um JSON", () => {
        let file : string =  fs.readFileSync(path.join(__dirname,"..","..","..", "spec", "support", "qualis.xls"), 'binary');
        qualisFactory.readXls("periodico", 2020, file);
        expect(qualisFactory.getFileContent()).not.toEqual(null);
    })

    it("constroi e retorna um objeto Qualis a partir de um JSON corretamente", () => {
        let file : string =  fs.readFileSync( path.join(__dirname,"..","..","..", "spec", "support", "eventos.xlsx"), 'binary');
        qualisFactory.readXls("evento", 2020, file);
        qualisFactory.makeQualis();
        let qualis : Qualis []  = qualisFactory.get();
        expect(qualis.length).toBe(14);
    })

    it("nao é armazenado objetos qualis por causa do tipo", () => {
      let qualis : Qualis []  = qualisFactory.get();
      expect(qualis.length).toBe(0);
      let file : string =  fs.readFileSync(path.join(__dirname,"..","..","..", "spec", "support", "qualis.xls"), 'binary');
      qualis = qualisFactory.get();
      expect(qualis.length).toBe(0);
  })
}) 