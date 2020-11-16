import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let assertSizeEquals = async (set, n) => {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

let assertElementsWithSameName = async (n, name) => {
    let allgrupos: ElementArrayFinder = element.all(by.name('grupolist'));
    let samenames = allgrupos.filter(elem => sameName(elem, name));
    await assertSizeEquals(samenames, n);
}

let criarGrupo = async (nome) => {
    await $("input[name='namebox']").sendKeys(<string> nome);
    await element(by.buttonText('Criar Grupo')).click();
}



defineSupportCode( ({ Given, When, Then }) => {

    //Cenario 1:
    Given(/^eu estou na página de grupos$/, async () => {
        await browser.get('http://localhost:4200/');
        await expect(browser.getTitle()).to.eventually.equal('Lattes Processor');
        await $("a[name='grupos']").click();
    });

    Given(/^nao existe um grupo de "([^\"]*)" cadastrado no sistema$/, async (grupo) => {
        await assertElementsWithSameName(0, grupo);
    });

    When(/^eu crio o grupo "([^\"]*)"$/, async (grupo) => {
        await criarGrupo(grupo);
    });

    Then(/^eu posso ver o grupo "([^\"]*)"$/, async (grupo) => {
        await assertElementsWithSameName(1, grupo);
    });

    //Cenario 2:

    

});