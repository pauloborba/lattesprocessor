import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
import { Alert } from 'selenium-webdriver';
import { CadastroDePesquisadores } from '../../lp-server/cadastrodepesquisadores'
import { Pesquisador } from '../../common/pesquisador'
import { Publicacao } from '../../common/publicacao'

let path = require('path');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let mesmoNome = ((elem, nome) => elem.element(by.name('nomesProfessores')).getText().then(text => text == nome))
let mesmaQtd = ((elem, artigos) => elem.element(by.name('artigosProfessores')).getText().then(text => text == artigos))
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {

    Given('Eu estou na página Estudos Comparativos', async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Lattes Processor');
        await $("a[name='qualis']").click();
        let filePath = path.join(__dirname, '/support_files/' + "publicacoes_2014.xls");
        await $("input[name=QualisFile]").sendKeys(filePath);
        await element(by.buttonText("Qualis Import")).click();
        await $("a[name='estudos-comparativos']").click();
        })

        Given(/^O professor "([^\"]*)" tem "(\d*)" artigos e o professor "([^\"]*)" tem "(\d*)" artigos$/, async (prof1, qtd1, prof2, qtd2) => {
        let cadastroPesq = new CadastroDePesquisadores();
        let p1: Pesquisador = new Pesquisador();
        p1.nome = <string>prof1;
        for (var i = 0; i < Number(qtd1); i++){
            let p: Publicacao = new Publicacao('a', 'a')
            p1.addPublicacao(p);
        }
        let p2: Pesquisador = new Pesquisador();
        p2.nome = <string>prof2;
        for (var i = 0; i < Number(qtd2); i++){
            let p: Publicacao = new Publicacao('a', 'a')
            p2.addPublicacao(p);
        }
        cadastroPesq.addPesquisador(p1);
        cadastroPesq.addPesquisador(p2);
    });

    When('Eu escolho o método quantidade de artigos', async () => {
        await $("input[value='quantidade'").click();
    });

    When('Eu gero o ranking', async () => {
        await $("button[name='gerarEstudo']").click();
    });

    Then(/^"([^\"]*)" fica na primeira linha com "(\d*)" pontos e "([^\"]*)" na segunda com "(\d*)" pontos.$/, async (prof1, qtd1, prof2, qtd2) => {
        var lista: ElementArrayFinder = element.all(by.name('listapesquisadores'));
        await expect(lista[0].nome.to.eventually.equal(<string>prof1));
        await expect(lista[0].qtd.to.eventually.equal(Number(qtd1)));
        await expect(lista[1].nome.to.eventually.equal(<string>prof2));
        await expect(lista[1].qtd.to.eventually.equal(Number(qtd2)));
        await $("a[name='qualis']").click();
        await element(by.buttonText("Clear Qualis")).click();
    });

    When('O professor "([^\"]*)" tem "(\d*)" artigos “([^\"]*)”, "(\d*)" artigos “([^\"]*)” e "(\d*)" artigo “([^\"]*)”', async (prof, qtd1, peso1, qtd2, peso2, qtd3, peso3) => {
        
    });
    
    When('Eu escolho o método critérios de avaliação personalizados', async () => {
        await $("input[name='CriteriosPersonalizados'").click();
    });

    When('Eu atribuo os pesos "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", respectivamente', async(A1, A2, B1, B2, B3, B4, B5, C) => {
        await $("input[name='a1']").sendKeys(<string>A1);
        await $("input[name='a2']").sendKeys(<string>A2);
        await $("input[name='b1']").sendKeys(<string>B1);
        await $("input[name='b2']").sendKeys(<string>B2);
        await $("input[name='b3']").sendKeys(<string>B3);
        await $("input[name='b4']").sendKeys(<string>B4);
        await $("input[name='b5']").sendKeys(<string>B5);
        await $("input[name='c']").sendKeys(<string>C);
    });

})  