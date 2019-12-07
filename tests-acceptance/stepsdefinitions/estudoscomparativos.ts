import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by} from 'protractor';
import { async } from 'q';
import { Alert } from 'selenium-webdriver';


let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let mesmoNome = ((elem, nome) => elem.element(by.name('nomesProfessores')).getText().then(text => text == nome))
let mesmaQtd = ((elem, artigos) => elem.element(by.name('artigosProfessores')).getText().then(text => text == artigos))
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {

    Given('Given estou na página de \'estudos comparativos\'', async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('LattesProcessor');
        await $("a[name='estudosComparativos']").click();
    })

    Given(/^o atributo “arquivo xml” está como "([^\"]*)"$/, async (xml_file) => {
        var status_xml: ElementArrayFinder = element.all(by.name('status_xml'));
	    await expect(status_xml.text).to.eventually.equal(xml_file);
    });

    When(/^eu seleciono a opção “critérios de avaliação personalizados”$/, async () => {
        await $("a[id='pesoscheck']").click();
    });

    When(/^atribui os pesos "(\d+)",  "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)" e "(\w+)" respectivamente para “A1”, “A2”, “B1”, “B2”, “B3”, “B4”, “B5”, “B5” e “C”$/, async (peso1,peso2,peso3,peso4,peso5,peso6,peso7,peso8) => {
        await $("input[name='a1']").sendKeys(<string> peso1);
        await $("input[name='a2']").sendKeys(<string> peso2);
        await $("input[name='b1']").sendKeys(<string> peso3);
        await $("input[name='b2']").sendKeys(<string> peso4);
        await $("input[name='b3']").sendKeys(<string> peso5);
        await $("input[name='b4']").sendKeys(<string> peso6);
        await $("input[name='b5']").sendKeys(<string> peso7);
        await $("input[name='c']").sendKeys(<string> peso8);
    });

    When(/^eu seleciono a “opção executar avaliação”$/, async () => {
        await $("a[name='executar_avaliacao']").click();
    });
    

    Then(/^eu vejo uma mensagem de que os valores para os pesos são inválidos$/, async () => {
        let msg:Alert = browser.switchTo().alert();
        await expect(msg.getText()).toEqual('Pesos inválidos');
    });

    Given(/^estou na página de “estudos comparativos”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('LattesProcessor');
        await $("a[name='estudosComparativos']").click();
    });

    Given(/^o atributo “arquivo xml” está como “nenhum arquivo carregado”$/, async () => {
        var status_xml: ElementArrayFinder = element.all(by.name("xlsausente"));
	    await expect(status_xml.text).to.eventually.equal('nenhum arquivo carregado');
    });

    When(/^eu seleciono a opção “quantidade de artigos”$/, async () => {
        await $("a[value='quantidade']").click();
    });

    Then(/^eu vejo uma mensagem informando que nenhum arquivo .xml foi carregado$/, async () => {
        let msg:Alert = browser.switchTo().alert();
        await expect(msg.getText()).toEqual('nenhum arquivo carregado');
    });

    Given(/^estou na página de “estudos comparativos”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('LattesProcessor');
        await $("a[name='estudosComparativos']").click();
    });


    //não faz sentido considerar o 2 como variavel se sempre vai ter só 2 nomes em seguida...
    //considerando que qtd1 = qtd2
    Given(/^"2" arquivos .xml contendo "([^\"]*)" com "(\d*)" artigos e "([^\"]*)" com "(\d*)" artigos$/, async (prof1,qtd1,prof2,qtd2) => {
        var status_xml: ElementArrayFinder = element.all(by.name('xlspresente'));
        await expect(status_xml.text).to.eventually.equal('true');
        var professor_list: ElementArrayFinder = element.all(by.name('professores'));
        await professor_list.filter(elem => pAND(mesmoNome(elem, prof1), mesmaQtd(elem, qtd1))).then
                    (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
        await professor_list.filter(elem => pAND(mesmoNome(elem, prof2), mesmaQtd(elem, qtd2))).then
                    (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
    });

    When(/^eu seleciono a opção “quantidade de artigos”$/, async () => {
        await $("a[value='quantidade']").click();
    });

    Then(/^eu vejo uma tabela de ranking, onde "([^\"]*)" com "(\d*)" artigos está acima de "([^\"]*)" com "(\d*)" artigos$/, async (prof1,qtd1,prof2,qtd2) => {
        var rank_list: ElementArrayFinder = element.all(by.name('rank_list'));
        await expect(Promise.resolve(rank_list[0].nome)).to.eventually.equal(prof1)
        await expect(Promise.resolve(rank_list[1].nome)).to.eventually.equal(prof2)
        await expect(Promise.resolve(rank_list[0].qtd)).to.eventually.equal(qtd1)
        await expect(Promise.resolve(rank_list[1].qtd)).to.eventually.equal(qtd2)

    });

}) 