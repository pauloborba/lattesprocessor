import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

import { CadastroDePesquisadores } from './cadastrodepesquisadores';
import { Pesquisador } from '../common/pesquisador;
import { Publicacao } from '../common/publicacao'

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let mesmoNome = ((elem, nome) => elem.element(by.name('nomesProfessores')).getText().then(text => text == nome))
let mesmaQtd = ((elem, artigos) => elem.element(by.name('artigosProfessores')).getText().then(text => text == artigos))
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, And, When, Then }) {
    Given(/^Eu estou na página “Estudos Comparativos” $/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('LattesProcessor');
        await $("a[name='estudosComparativos']").click();
    });

    And(/^O professor "([^\"]*)" tem "(\d*)" artigos e o professor "([^\"]*)" tem "(\d*)" artigos”$/, async (prof1, qtd1, prof2, qtd2) => {
        let cadastroPesq = new CadastroDePesquisadores();
        let p1: Pesquisador = new Pesquisador();
        p1.nome = prof1;
        for (var i = 0; i < qtd1; i++){
            let p: Publicacao = new Publicacao('a', 'a')
            p1.addPublicacao(p);
        }
        let p2: Pesquisador = new Pesquisador();
        p2.nome = prof2;
        for (var i = 0; i < qtd2; i++){
            let p: Publicacao = new Publicacao('a', 'a')
            p2.addPublicacao(p);
        }
    });

    When(/^Eu escolho o método “quantidade de artigos””$/, async () => {
        await $("input[name='CriteriosPersonalizados'").click();
    });

    And(/^Eu gero o ranking$/, async () => {
        await $("button[name='gerarRanking']").click();
    });

    Then(/^"([^\"]*)" fica na primeira linha com "(\d*)" pontos e "([^\"]*)" na segunda com "(\d*)" pontos.$/, async (prof1, qtd1, prof2, qtd2) => {
        var lista: ElementArrayFinder = element.all(by.name('listaProfs'));
        await expect(lista[0].nome.to.eventually.equal(prof1));
        await expect(lista[0].qtd.to.eventually.equal(qtd1));
        await expect(lista[1].nome.to.eventually.equal(prof2));
        await expect(lista[1].qtd.to.eventually.equal(qtd2));
    });

    And(/^O professor "([^\"]*)" tem "(\d*)" artigos “([^\"]*)”, "(\d*)" artigos “([^\"]*)” e "(\d*)" artigo “([^\"]*)”$/, async (prof, qtd1, peso1, qtd2, peso2, qtd3, peso3) => {
        
    });

    When(/^Eu escolho o método “critérios de avaliação personalizados”$/, async () => {
        await $("input[name='CriteriosPersonalizados'").click();
    });

    And(/^And eu atribuo os pesos "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", respectivamente. $/, async(A1, A2, B1, B2, B3, B4, B5, C) => {
        await $("input[name='a1']").sendKeys(A1);
        await $("input[name='a2']").sendKeys(A2);
        await $("input[name='b1']").sendKeys(B1);
        await $("input[name='b2']").sendKeys(B2);
        await $("input[name='b3']").sendKeys(B3);
        await $("input[name='b4']").sendKeys(B4);
        await $("input[name='b5']").sendKeys(B5);
        await $("input[name='c']").sendKeys(C);
    });

}) 