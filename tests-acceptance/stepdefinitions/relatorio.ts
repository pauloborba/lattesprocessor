import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameDI = ((elem, dinicial) => elem.element(by.name('datainiciallist')).getText().then(text => text === dinicial));
let sameDF = ((elem, dfinal) => elem.element(by.name('datafinallist')).getText().then(text => text === dfinal));
let sameID = ((elem, id) => elem.element(by.name('idlist')).getText().then(text => text === id));

let pAND = ((p, q) => p.then(a => q.then(b => a && b)))

async function getMessages(name){
    var allmessages: ElementArrayFinder = element.all(by.name(name));
    await assertTamanhoEqual(allmessages, 1);
}

async function inputInputs(di, df){
    await $("input[name='datainicialbox']").sendKeys(<string>di);
    await $("input[name='datafinalbox']").sendKeys(<string>df);
}

async function getRelatorioByDate(n, di, df) {
    var allrelatorios: ElementArrayFinder = element.all(by.name('relatoriolist'));
    var sameDIandDF = allrelatorios.filter(elem => pAND(sameDI(elem, di), sameDF(elem, df)));
    await assertTamanhoEqual(sameDIandDF, n);
}

async function getRelatorioById(n, id) {
    var allrelatorios: ElementArrayFinder = element.all(by.name('relatoriolist'));
    var sameIDa = allrelatorios.filter(elem => sameID(elem, id));
    await assertTamanhoEqual(sameIDa, n);
}

async function getRelatorioByIdAndClick(button, id) {
    var allrelatorios: ElementArrayFinder = element.all(by.name('relatoriolist'));
    var sameIDa = allrelatorios.filter(elem => sameID(elem, id));
    await sameIDa.all(by.name(button)).click();
}

async function assertTamanhoEqual(set, n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}




defineSupportCode(function ({ Given, When, Then }) {
    Given(/^que estou ná página “Relatórios”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Lattes Processor');
        await $("a[name='relatorios']").click();
    })

    Given(/^os campos "Data inicial" e "Data Final" não estão preenchidos$/, async () => {
        await inputInputs("", "");
    });

    Given(/^não vejo um relatório sem data definida na lista de relatorios$/, async () => {
        await getRelatorioByDate(0, "", "");
    });

    Given(/^vejo um relatório sem data definida na lista de relatorios$/, async () => {
        await getRelatorioByDate(1, "", "");
    });
    
    Given(/^no campo "Ano inicial" coloco o valor "(\d*)", e no campo "Ano final" coloco o valor "(\d*)"$/, async (anoinicial, anofinal) => {
        await inputInputs(anoinicial, anofinal);
    });
   
    Given(/^não vejo um relatório "Ano inicial" em "(\d*)" e "Ano final" em "(\d*)" na lista de relatorios$/, async (anoinicial, anofinal) => {
        await getRelatorioByDate(0, anoinicial, anofinal);
    });

    Given(/^vejo um relatório "Ano inicial" em "(\d*)" e "Ano final" em "(\d*)" na lista de relatorios$/, async (anoinicial, anofinal) => {
        await getRelatorioByDate(1, anoinicial, anofinal);
    });

    Given(/^vejo um relatório de ID "(\d*)" na lista de relatorios$/, async (id) => {
        await getRelatorioById(1, id);
    });

    When(/^eu clico no botão “Gerar relatório”$/, async () => {
        await element(by.buttonText("Gerar relatorio")).click();
    });

    When(/^eu clico no botão "([^\"]*)" no relatório de ID "(\d*)"$/, async (button, id) => {
        await getRelatorioByIdAndClick(button, id)
    });

    Then(/^a mensagem "([^\"]*)" é exibida$/, async (msg) => {
        if (msg == "Relatório atualizado com sucesso") msg = "relatorioAtualizou";
        else if (msg == "Relatorio já gerado, atualize o relatório") msg = "relatorioJaCriado";
        else if (msg == "A data final deve ser maior que a data inicial.") msg = "dataFinalMenor";
        else if (msg == "Data invalida.") msg = "datasInvalidas";
        await getMessages(msg);
    });
    
    Then(/^não vejo um relatório de ID "(\d*)" na lista de relatorios$/, async (id) => {
        await getRelatorioById(0, id);
    });
    


    



})
