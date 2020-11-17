import {Qualis} from '../../common/Qualis';

describe("A classe qualis", () => {
    let qualis : Qualis;

    it("criacao correta do objeto Qualis", () => {
        qualis = new Qualis("ACM Transactions on Intelligent Systems and Technology", 
        2020, "evento", "2157-6904", "A1")

    })

    it("clone correto do objeto Qualis", () => {
      qualis = new Qualis("ACM Transactions on Intelligent Systems and Technology", 
      2020, "evento", "2157-6904", "A1")

      const copyQualis: Qualis = qualis.clone()
      copyQualis.ano = 2019
      copyQualis.tipo = "periodico"

      expect(qualis.ano).toBe(2020);
      expect(copyQualis.ano).not.toBe(2020);
      expect(qualis.tipo).toBe("evento");
      expect(copyQualis.tipo).toBe("periodico");
    })

    it("'copiar de' correto do objeto Qualis", () => {
      qualis = new Qualis("ACM Transactions on Intelligent Systems and Technology", 
      2020, "evento", "2157-6904", "A1")

      const otherQualis = new Qualis("Applied Intelligence (Boston)", 
      2020, "periodico", "0924-669X", "B1")

      qualis.copyFrom(otherQualis)

      expect(qualis.ano).toBe(otherQualis.ano);
      expect(qualis.tipo).toBe(otherQualis.tipo);
      expect(qualis.issn).toBe(otherQualis.issn);
      expect(qualis.titulo).toBe(otherQualis.titulo);
    })
}) 