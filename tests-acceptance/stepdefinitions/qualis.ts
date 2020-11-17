import { defineSupportCode } from 'cucumber';
import { readFileSync } from 'fs';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import request = require("request-promise");

let base_url = "http://localhost:3000/";

let path = require('path');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameIssn = ((elem, arr) => elem.element(by.name('allIssn')).getText().then(text => arr.includes(text)));
let sameNome = ((elem, arr) => elem.element(by.name('allNomes')).getText().then(text => arr.includes(text)));
let sameAvaliacao = ((elem, arr) => elem.element(by.name('allAvaliacoes')).getText().then(text => arr.includes(text)));
let pAND = ((p, q, r) => p.then(a => q.then(b => r.then(c => a && b && c))));

defineSupportCode(function ({Given, When, Then, After, setDefaultTimeout}) {
  setDefaultTimeout(120000)  

    After(async () => {
      await request.delete(base_url + 'qualis/apagar/')
    })

    Given(/^Eu estou na página Qualis$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal("Lattes Processor");
        await $("a[name='qualis']").click();
    })

    Given(/^Nenhum periódico está armazenado no sistema$/, async () => {
        let qualisTable : ElementArrayFinder = element.all(by.name('qualisTable'));
        await qualisTable.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })

    Given(/^Eu consigo ver os periódicos "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)", "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)" e "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)"$/, 
                    async(periodico1, issn1, avaliacao1, periodico2, issn2, avaliacao2, periodico3, issn3, avaliacao3) => {
        let periodicoArray = [periodico1, periodico2, periodico3];
        let issnArray = [issn1, issn2, issn3];
        let avaliacaoArray = [avaliacao1, avaliacao2, avaliacao3];
        let qualisTable : ElementArrayFinder = element.all(by.name('qualisTable'));
        await qualisTable.filter(elem => pAND(sameNome(elem, periodicoArray), sameAvaliacao(elem, avaliacaoArray), sameIssn(elem, issnArray)))
                    .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(3));
    })

    Given(/^Eu tenho os dados no server da planilha "([^\"]*)" do tipo "([^\"]*)" e do ano "([^\"]*)"$/, 
      async (file: string, type: string, year: string) => {
        let filePath = path.join(__dirname, '/support_files/' + <string>file);
        await $("input[name=QualisFile]").sendKeys(filePath);
        await $(`#typeQualis option[value="${ type }"]`).click()
        await $("#year").clear() 
        await $("#year").sendKeys(year)
        await element(by.buttonText("Qualis Import")).click();
    });

    When(/^Eu seleciono o arquivo "([^\"]*)"$/, async (fileName : string) => {
        let filePath = path.join(__dirname, '/support_files/' + <string>fileName);
        await $("input[name=QualisFile]").sendKeys(filePath);
    })

    When(/^seleciono a opção "([^\"]*)" no campo "([^\"]*)"$/, async (type: string, field: string) => {
      await $(`#${ field } option[value="${ type }"]`).click()
    });

    When(/^insiro o valor "([^\"]*)" no campo "([^\"]*)"$/, async (year: string, field: string) => {
      await $("#" + field).sendKeys(year)
    });

    When(/^Eu seleciono a opção "([^\"]*)" que carrega o arquivo$/, async (option : string) => {
        await element(by.buttonText(option)).click();
    })
    
    Then(/^Eu vejo uma mensagem de sucesso$/, async () => {
      await browser.sleep(2000)
      await element(by.name('ImportStatus')).getText().then(msg => expect(Promise.resolve(msg)).to.eventually.equal('planilha cadastrada com sucesso'))
    })

    Then(/^Eu vejo os periódicos "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)", "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)" e "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)"$/, 
                    async(periodico1, issn1, avaliacao1, periodico2, issn2, avaliacao2, periodico3, issn3, avaliacao3) => {
        let periodicoArray = [periodico1, periodico2, periodico3];
        let issnArray = [issn1, issn2, issn3];
        let avaliacaoArray = [avaliacao1, avaliacao2, avaliacao3];
        let qualisTable : ElementArrayFinder = element.all(by.name('qualisTable'));
        await qualisTable.filter(elem => pAND(sameNome(elem, periodicoArray), sameAvaliacao(elem, avaliacaoArray), sameIssn(elem, issnArray)))
              .then(elems => {
                expect(Promise.resolve(elems.length)).to.eventually.equal(3)
              });
    })

    Then(/^Eu não vejo os periódicos "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)", "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)" e "([^\"]*)" com ISSN "([^\"]*)" e avaliação "([^\"]*)"$/, 
                    async(periodico1, issn1, avaliacao1, periodico2, issn2, avaliacao2, periodico3, issn3, avaliacao3) => {
        let periodicoArray = [periodico1, periodico2, periodico3];
        let issnArray = [issn1, issn2, issn3];
        let avaliacaoArray = [avaliacao1, avaliacao2, avaliacao3];
        let qualisTable : ElementArrayFinder = element.all(by.name('qualisTable'));
        await qualisTable.filter(elem => pAND(sameNome(elem, periodicoArray), sameAvaliacao(elem, avaliacaoArray), sameIssn(elem, issnArray)))
              .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })
    
    When(/^Eu seleciono a opção "([^\"]*)" que limpa a tabela atual$/, async (option : string) => {
        await element(by.buttonText(option)).click();
    })

    When(/^clico no botao de excluir$/, async () => {
      await $('#clean-button').click();
    })

    Then(/^Eu vejo nenhum periódico cadastrado no sistema$/, async () => {
        let qualisTable : ElementArrayFinder = element.all(by.name('qualisTable'));
        await qualisTable.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })

    When(/^Eu envio o arquivo "([^\"]*)", que possui uma formatação invalida$/, async(fileName : string) => {
        let filePath = path.join(__dirname, '/support_files/' + <string>fileName);
        await $("input[name=QualisFile]").sendKeys(filePath);
        await element(by.buttonText("Qualis Import")).click();
    })

    Then(/^Eu vejo uma mensagem de erro indicando formatação errada na planilha$/, async () => {
        await element(by.name('ImportStatus')).getText().then(msg => expect(Promise.resolve(msg)).to.eventually.equal('planilha com formatacao invalida'));
    })

    When(/^Eu envio o arquivo "([^\"]*)", que não possui nenhuma entrada para periódico$/, async(fileName : string) => {
        let filePath = path.join(__dirname, '/support_files/' + <string>fileName);
        await $("input[name=QualisFile]").sendKeys(filePath);
        await element(by.buttonText("Qualis Import")).click();
    })

    Then(/^Eu vejo uma mensagem de erro indicando que nenhum periódico foi cadastrado no sistema$/, async () => {
        await element(by.name('ImportStatus')).getText()
            .then(msg => expect(Promise.resolve(msg)).to.eventually.equal('nenhuma entrada adicionada'));
    })
})