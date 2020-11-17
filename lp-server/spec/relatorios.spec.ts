import { Pesquisador } from '../../common/pesquisador';
import { Publicacao } from '../../common/publicacao';
import { Qualis } from '../../common/Qualis';
import { Relatorio } from '../../common/relatorio';




describe("A classe relatorio", () => {
    var relatorio: Relatorio;
    var pesq1 = new Pesquisador();
    var pesq2 = new Pesquisador();
    var pesq3 = new Pesquisador();


    beforeEach(() => relatorio = new Relatorio());

    function gerarRelatorio(): void{

    pesq1.nome = "Caio Fazio"
    pesq2.nome = "Paulo Borba"
    pesq3.nome = "Jana Ina"
    let pesq1p1 = new Publicacao();
    let pesq1p2 = new Publicacao();
    let pesq1p3 = new Publicacao();
    let pesq2p1 = new Publicacao();
    let pesq2p2 = new Publicacao();
    let pesq2p3 = new Publicacao();
    let pesq3p1 = new Publicacao();
    let pesq3p2 = new Publicacao();
    let pesq3p3 = new Publicacao();
    let pesq3p4 = new Publicacao();
    pesq1.publicacoes.push(pesq1p1)
    pesq1.publicacoes.push(pesq1p2)
    pesq1.publicacoes.push(pesq1p3)
    pesq2.publicacoes.push(pesq2p1)
    pesq2.publicacoes.push(pesq2p2)
    pesq2.publicacoes.push(pesq2p3)
    pesq3.publicacoes.push(pesq3p1)
    pesq3.publicacoes.push(pesq3p2)
    pesq3.publicacoes.push(pesq3p3)
    pesq3.publicacoes.push(pesq3p4)
    pesq1p1.titulo = "Publicacao A"
    pesq1p2.titulo = "Publicacao B"
    pesq1p3.titulo = "Publicacao C"
    pesq1p1.periodico = "Publicacao AAA"
    pesq1p2.periodico = "Publicacao BBB"
    pesq1p3.periodico = "Publicacao CCC"
    pesq1p1.issn = "0001"
    pesq1p2.issn = "0002"
    pesq1p3.issn = "0003"
    pesq2p1.titulo = "Publicacao D"
    pesq2p2.titulo = "Publicacao E"
    pesq2p3.titulo = "Publicacao F"
    pesq2p1.periodico = "Publicacao DDD"
    pesq2p2.periodico = "Publicacao EEE"
    pesq2p3.periodico = "Publicacao FFF"
    pesq2p1.issn = "0004"
    pesq2p2.issn = "0005"
    pesq2p3.issn = "0006"
    pesq3p1.titulo = "Publicacao G"
    pesq3p2.titulo = "Publicacao H"
    pesq3p3.titulo = "Publicacao I"
    pesq3p1.periodico = "Publicacao GGG"
    pesq3p2.periodico = "Publicacao HHH"
    pesq3p3.periodico = "Publicacao III"
    pesq3p1.issn = "0007"
    pesq3p2.issn = "0008"
    pesq3p3.issn = "0009"
    pesq3p4.titulo = "Publicacao J"
    pesq3p4.periodico = "Publicacao JJJ"
    pesq3p4.issn = "0010"
    let qualis: Qualis[] = [];
    let pesq1q1 = new Qualis();
    let pesq1q2 = new Qualis();
    let pesq1q3 = new Qualis();
    let pesq2q1 = new Qualis();
    let pesq2q2 = new Qualis();
    let pesq2q3 = new Qualis();
    let pesq3q1 = new Qualis();
    let pesq3q2 = new Qualis();
    let pesq3q3 = new Qualis();
    let pesq3q4 = new Qualis();
    pesq1q1.montar("Publicacao A", 11, "Estudo", "0001", "A1")
    pesq1q2.montar("Publicacao B", 12, "Estudo", "0002", "A1")
    pesq1q3.montar("Publicacao C", 13, "Estudo", "0003", "B4")
    pesq2q1.montar("Publicacao D", 14, "Estudo", "0004", "A2")
    pesq2q2.montar("Publicacao E", 15, "Estudo", "0005", "A2")
    pesq2q3.montar("Publicacao F", 16, "Estudo", "0006", "A2")
    pesq3q1.montar("Publicacao G", 17, "Estudo", "0007", "A3")
    pesq3q2.montar("Publicacao H", 18, "Estudo", "0008", "A2")
    pesq3q3.montar("Publicacao I", 19, "Estudo", "0009", "A2")
    pesq3q4.montar("Publicacao J", 20, "Estudo", "0010", "A2")
    qualis.push(pesq1q1)
    qualis.push(pesq1q2)
    qualis.push(pesq1q3)
    qualis.push(pesq2q1)
    qualis.push(pesq2q2)
    qualis.push(pesq2q3)
    qualis.push(pesq3q1)
    qualis.push(pesq3q2)
    qualis.push(pesq3q3)
    qualis.push(pesq3q4);


    relatorio.pesquisadores.push(pesq1);
    relatorio.pesquisadores.push(pesq2);
    relatorio.pesquisadores.push(pesq3);
    relatorio.generate(qualis);
}

    it("criação correta de um novo relatorio", () => {
        expect(relatorio.pesquisadores.length).toBe(0);
        expect(relatorio.maisPublicacoes.length).toBe(0);
        expect(relatorio.melhorMedia.length).toBe(0);
        expect(relatorio.maisPublicacoes.length).toBe(0);
        expect(relatorio.classificacao.length).toBe(0);
        expect(relatorio.dataFinal).toBe(null);
        expect(relatorio.dataInicial).toBe(null);
        
    })

    it("copyFrom correto de um relatorio", () => {
        var pesq1 = new Pesquisador();
        var pesq2 = new Pesquisador();
        pesq1.randomMize();
        pesq2.randomMize();

        relatorio.pesquisadores.push(pesq1);
        relatorio.pesquisadores.push(pesq2);

        var newRelatorio = new Relatorio();
        newRelatorio.copyFrom(relatorio);
        expect(relatorio.pesquisadores.length).toBe(2)
        expect(newRelatorio.pesquisadores.length).toBe(relatorio.pesquisadores.length)
        expect(relatorio.pesquisadores[0]).toBe(newRelatorio.pesquisadores[0])
        expect(relatorio.pesquisadores[1]).toBe(newRelatorio.pesquisadores[1])
        /*var relatorioCopia = new Relatorio();
        relatorioCopia.nome = "Paulo";
        relatorio.copyFrom(relatorioCopia);

        expect(relatorio.nome).toBe(relatorioCopia.nome);*/
    })
    it("clone correto de um relatorio", () => {
        var pesq1 = new Pesquisador();
        var pesq2 = new Pesquisador();
        pesq1.randomMize();
        pesq2.randomMize();

        relatorio.pesquisadores.push(pesq1);
        relatorio.pesquisadores.push(pesq2);

        var newRelatorio = relatorio.clone();
        expect(relatorio.pesquisadores.length).toBe(2)
        expect(newRelatorio.pesquisadores.length).toBe(relatorio.pesquisadores.length)
        expect(relatorio.pesquisadores[0]).toBe(newRelatorio.pesquisadores[0])
        expect(relatorio.pesquisadores[1]).toBe(newRelatorio.pesquisadores[1])
        /*var relatorioCopia = new Relatorio();
        relatorioCopia.nome = "Paulo";
        relatorio.copyFrom(relatorioCopia);

        expect(relatorio.nome).toBe(relatorioCopia.nome);*/
    })

    it("relatorio gerado corretamente", () => {
        gerarRelatorio();
            
        expect(relatorio.maisMaximas.length).toBe(1)
        expect(relatorio.melhorMedia.length).toBe(1)
        expect(relatorio.maisPublicacoes.length).toBe(1)
        expect(relatorio.melhorMedia[0]).toBe(pesq2);
        expect(relatorio.maisPublicacoes[0]).toBe(pesq3);
        expect(relatorio.maisMaximas[0]).toBe(pesq1)
        

    })
    it("relatorio com data gerado corretamente", () => {
        relatorio.dataInicial = 14;
        relatorio.dataFinal = 19;
        gerarRelatorio();


        expect(relatorio.maisMaximas.length).toBe(3)
        expect(relatorio.melhorMedia.length).toBe(1)
        expect(relatorio.maisPublicacoes.length).toBe(2)
        expect(relatorio.melhorMedia).toContain(pesq2);
        expect(relatorio.maisPublicacoes).toContain(pesq3);
        expect(relatorio.maisPublicacoes).toContain(pesq2);
        expect(relatorio.maisMaximas).toContain(pesq1)
        expect(relatorio.maisMaximas).toContain(pesq2)
        expect(relatorio.maisMaximas).toContain(pesq3)

     


    })
})