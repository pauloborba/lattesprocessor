import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by} from 'protractor';
import { async } from 'q';
import { Alert } from 'selenium-webdriver';
import { isUndefined } from 'util';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let mesmoNome = ((elem, nome) => elem.element(by.name('nomesProfessores')).getText().then(text => text == nome))
let mesmaQtd = ((elem, artigos) => elem.element(by.name('artigosProfessores')).getText().then(text => text == artigos))
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))
defineSupportCode(function ({ Given, When, Then }) {
    Given('estou na página de "estudos comparativos"', async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Lattes Processor');
        await $("a[name='estudos-comparativos']").click();
        })
    Given(/^o atributo "arquivo xml" está como "([^\"]*)"$/, async (xml_file) => {
        var status_xml: ElementArrayFinder = element.all(by.name('xlsausente'));
        await !isUndefined(status_xml);
    });
    When(/^eu seleciono a opção "critérios de avaliação personalizados"$/, async () => {
        await $('input[id="pesoscheck"]').click();
    });
    When(/^atribui os pesos "(\d+)",  "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)" e "(\w+)" respectivamente para "A1", "A2", "B1", "B2", "B3", "B4", "B5", "B5" e "C"$/, async (peso1,peso2,peso3,peso4,peso5,peso6,peso7,peso8) => {
        await $("input[name='a1']").sendKeys(<string> peso1);
        await $("input[name='a2']").sendKeys(<string> peso2);
        await $("input[name='b1']").sendKeys(<string> peso3);
        await $("input[name='b2']").sendKeys(<string> peso4);
        await $("input[name='b3']").sendKeys(<string> peso5);
        await $("input[name='b4']").sendKeys(<string> peso6);
        await $("input[name='b5']").sendKeys(<string> peso7);
        await $("input[name='c']").sendKeys(<string> peso8);
    });
    When(/^eu seleciono a "opção executar avaliação"$/, async () => {
        await $("button[name='gerarEstudo']").click();
    });
    
    Then(/^eu vejo uma mensagem de que os valores para os pesos são inválidos$/, async () => {
        let msg:Alert = browser.switchTo().alert();
        await expect(msg.getText()).toEqual('Pesos inválidos');
    });

    When(/^eu seleciono a opção "quantidade de artigos"$/, async () => {
        await $("button[name='gerarEstudo']").click();
    });
    Then(/^eu vejo uma mensagem informando que nenhum arquivo .xml foi carregado$/, async () => {
        let msg:Alert = browser.switchTo().alert();
        await expect(msg.getText()).toEqual('nenhum arquivo carregado');
    });

})  