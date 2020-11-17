import { defineSupportCode } from 'cucumber';
import { watchFile } from 'fs';
import { browser, $, element, ElementArrayFinder, by, ElementHelper } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

let sameGroupName = ((elem, name) => elem.element(by.name('grupo-nomelist')).getText().then(text => text === name));

let sameSearcherName = ((elem, name) => elem.element(by.name('pesquisador-nomelist')).getText().then(text => text === name));

let sameSearcherInAGropuName = ((elem, name) => elem.element(by.name('pesquisadorG-nomelist')).getText().then(text => text === name));

let assertSizeEquals = async (set, n) => {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

let groupsFind = async (name) => {
    let allgrupos: ElementArrayFinder = element.all(by.name('grupolist'));
    let samenames = allgrupos.filter(elem => sameGroupName(elem, name));
    return samenames;
}

let assertGroupsWithSameName = async (n, name) => {
    await assertSizeEquals(groupsFind(name), n);
}

let assertSearcherWithSameName = async (n, name) => {
    let allserchers: ElementArrayFinder = element.all(by.name('pesquisadorlist'));
    let samenames = allserchers.filter(elem => sameSearcherName(elem, name));
    await assertSizeEquals(samenames, n);
}

let assertSearcherWithSameNameInAGroup = async (n, nameSearcher, nameGroup) => {
    
    let searchers: ElementArrayFinder = element.all(by.name('pesquisadorG-list'));
    let samenames = searchers.filter(elem => sameSearcherInAGropuName(elem, nameSearcher));
    await assertSizeEquals(samenames, n);
}

let criarGrupo = async (nome) => {
    await $("input[name='namebox']").sendKeys(<string> nome);
    await element(by.buttonText('Criar Grupo')).click();
}

let removerGrupo = async (nome) => {
    await $("button[name='remover-grupo']").click();
}

defineSupportCode( ({ Given, When, Then }) => {

    //Cenario 1:
    Given(/^eu estou na página de grupos$/, async () => {
        await browser.get('http://localhost:4200/');
        await expect(browser.getTitle()).to.eventually.equal('Lattes Processor');
        await $("a[name='grupos']").click();
    });

    Given(/^nao existe um grupo de "([^\"]*)" cadastrado no sistema$/, async (grupo) => {
        await assertGroupsWithSameName(0, grupo);
    });

    When(/^eu crio o grupo "([^\"]*)"$/, async (grupo) => {
        await criarGrupo(grupo);
    });

    Then(/^eu posso ver o grupo "([^\"]*)"$/, async (grupo) => {
        await assertGroupsWithSameName(1, grupo);
    });

    //Cenario 2:
    Given(/^vejo o grupo "([^\"]*)"$/, async (grupo) => {
        await assertGroupsWithSameName(1, grupo);
    })

    Given(/^o pesquisador "([^\"]*)" esta cadastrado no sistema$/, async (pesquisador) => {
        await $("a[name='pesquisadores']").click();
        let fileDir = path.join(__dirname, '/support_files/paulo_lattes.xml')
        await $("input[name='file']").sendKeys(fileDir);
        await wait(500);
        await $("a[name='grupos']").click();
        await $("select[name='pesquisador-select']").click();
        await assertSearcherWithSameName(1, pesquisador);
    })

    Given(/^nao existe o pesquisador "([^\"]*)" no grupo "([^\"]*)"$/, async (pesquisador, grupo) => { 
        await assertSearcherWithSameNameInAGroup(0, pesquisador, grupo);
        
    });

    When(/^eu tento inserir "([^\"]*)" no grupo "([^\"]*)"$/, async (pesquisador, grupo) => {
        await $("select[name='pesquisador-select']").click();
        await $("option[name='pesquisadorlist']").click();
        await $("button[name='adicionar-pesquisador']").click();
    });

    Then(/^eu posso ver no grupo "([^\"]*)" o pesquisador "([^\"]*)"$/, async (grupo, pesquisador) => {
        await assertSearcherWithSameNameInAGroup(1, pesquisador, grupo);
    });

    //Cenario 3:
    Given(/^existe o grupo "([^\"]*)" no sistema$/, async (grupo) => {
        await assertGroupsWithSameName(1, grupo);
    });
    
    When(/^eu tento remover o grupo "([^\"]*)" do sistema$/, async (grupo) => {
        await removerGrupo(grupo);
    });

    Then(/^não existe mais o grupo "([^\"]*)" no sistema$/, async (grupo) => {
        await assertGroupsWithSameName(0, grupo);
        
    });

    

});