import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');
import request = require("request-promise");

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function checarTamanho(arr, n) {
    await arr.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function checarMensagem(msg) {
    let allpesquisadores: ElementArrayFinder = element.all(by.css('.msg'));

    let pesq = allpesquisadores.filter(elem => elem.getText().then(n => n === msg));
    await checarTamanho(pesq, 1);
}

async function buscarPesquisador(nome, n) {
    let allpesquisadores: ElementArrayFinder = element.all(by.css('.nome'));

    let pesq = allpesquisadores.filter(elem => elem.getText().then(n => n === nome));
    await checarTamanho(pesq, n);
}

async function fazerUpload(file, id) {
    let fileDir = path.join(__dirname, '/support_files/' + <string>file)
    await $(id).sendKeys(fileDir);
    await wait(500);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^que estou na página de pesquisadores$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Lattes Processor');
        await $("a[name='pesquisadores']").click();
    });

    /* SCENARIO 1 */

    Given(/^o pesquisador "([^\"]*)" não está cadastrado no sistema$/, async (name) => {
        await buscarPesquisador(name, 0);
    });

    When(/^eu seleciono a opção de cadastrar escolhendo o arquivo "([^\"]*)"$/, async (fileName) => {
        let btn = "input[name='cadastrar']";
        await fazerUpload(fileName, btn);
    });

    Then(/^uma mensagem de confirmação "([^\"]*)" é exibida$/, async (msg) => {
        await checarMensagem(msg);
    });

    Then(/^eu consigo ver o pesquisador "([^\"]*)" na lista de pesquisadores$/, async (name) => {
        await buscarPesquisador(name, 1);
    });

    /* REUTILIZANDO O PRIMEIRO GIVEN QUE É COMUM A TODOS OS CENÁRIOS */

    /* SCENARIO 2 */
    Given(/^o pesquisador "([^\"]*)" está na lista de pesquisadores cadastrados no sistema$/, async (name) => {
        await buscarPesquisador(name, 1);
    });

    When(/^eu faço o upload do arquivo "([^\"]*)"$/, async (fileName) => {
        let btn = "input[name='cadastrar']";
        await fazerUpload(fileName, btn);
    });

    Then(/^a mensagem de erro "([^\"]*)" é exibida$/, async (msg) => {
        await checarMensagem(msg);
    });

    Then(/^o pesquisador "([^\"]*)" não é cadastrado novamente no sistema$/, async (name) => {
        await buscarPesquisador(name, 1);
    });

    /* SCENARIO 3 */
    Given(/^o pesquisador "([^\"]*)" não está na lista de pesquisadores$/, async (name) => {
        await buscarPesquisador(name, 0);
    });

    When(/^eu faço upload do arquivo "([^\"]*)"$/, async (fileName) => {
        let btn = "input[name='cadastrar']";
        await fazerUpload(fileName, btn);
    });

    Then(/^a mensagem "([^\"]*)" é exibida$/, async (msg) => {
        await checarMensagem(msg);
    });

    Then(/^o pesquisador "([^\"]*)" não é cadastrado no sistema$/, async (name) => {
        await buscarPesquisador(name, 0);
    });

    /* SCENARIO 4 (Atualizar currículo) */
    /* FALTANDO IMPLEMENTAR TODA A FEATURE (server e GUI) */

    Given(/^o pesquisador "([^\"]*)" está na lista de pesquisadores$/, async (name) => {
        await buscarPesquisador(name, 1);
    });

    When(/^eu seleciono a opção de atualizar enviando o arquivo "([^\"]*)" com as novas publicações$/, async (fileName) => {
        let btn = "input[name='atualizar']";
        await fazerUpload(fileName, btn);
    });

    Then(/^a mensagem de confirmação "([^\"]*)" é exibida$/, async (msg) => {
        await checarMensagem(msg);
    });

    Then(/^o pesquisador "([^\"]*)" está na lista de pesquisadores com as novas publicações$/, async (name) => {
        await buscarPesquisador(name, 1);
    });
})
