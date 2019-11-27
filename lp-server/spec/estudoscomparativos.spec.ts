describe("O estudo comparativo", () => {
    var estudo: EstudoComparativo;
  
    beforeEach(() => estudo = new EstudoComparativo())
  
    it("tem pesos decrescentes se não for especificado", () => {
      expect(estudo.a1).toBe(8);
      expect(estudo.a2).toBe(7);
      expect(estudo.b1).toBe(6);
      expect(estudo.b2).toBe(5);
      expect(estudo.b3).toBe(4);
      expect(estudo.b4).toBe(3);
      expect(estudo.b5).toBe(2);
      expect(estudo.c).toBe(1);
    })

    it("entre pesquisadores com mesmo currículo funciona de maneira lexicográfica", () => {
        var prof1: Professor = new Professor();
        prof1.nome = 'Paulo';
        prof1.qtd = 36;
        var prof2: Professor = new Professor();
        prof2.nome = 'Sivlio';
        prof2.qtd = 36;
        estudo.adicionar(prof1);
        estudo.adicionar(prof2);
        expect(estudo.listaQtd[0].nome).toBe('Paulo');
        expect(estudo.listaQtd[1].nome).toBe('Silvio');
    })

})
  