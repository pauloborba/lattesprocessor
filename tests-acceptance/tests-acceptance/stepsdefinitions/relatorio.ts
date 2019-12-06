import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";
let mesmoNome = ((elem, nome) => elem.element(by.name('nomesProfessores')).getText().then(text => text == nome))

async function count(name, n) {
    var profs: ElementArrayFinder = element.all(by.name('professores'));
    await profs.filter(elem => mesmoNome(elem, name).then
                (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n)));
}

async function addform(form) {
    await $("input[name='formula']").sendKeys(<string> form);
}

async function addtype(t) {
    await $("input[name='type']").sendKeys(<string> t);
}

defineSupportCode(function ({ Given, When, Then }) {
    //1 OK
    Given(/^que eu estou na “página de ranqueamento”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('página de ranqueamento');
    })
    
    Given(/^há no sistema os pesquisadores "(\w*)" com 2 periódicos avaliados em "(\w\d)" e "(\w*)" com 1 periódico avaliado em "(\w\d)"$/, async (p1,n1,p2,n2) => {
        count(p1,2);
        count(p2,1);
    });
    
    Given(/^eu adiciono "(\d*\w\d)" como fórmula para ranqueamento$/, async (form) => {
		addform(form);
    });
    
    Given(/^eu seleciono “Pesquisadores” como tipo do relatório$/, async (form) => {
        addtype("Pesquisadores");
    });
    
    When(/^eu seleciono a opção gerar relatório"$/, async () => {
        await $("a[name='gerar']").click();
    });
    
    Then(/^eu posso ver uma opção para baixar o relatório$/, async () => {
        await $("a[name='baixar']").click();
    });
    
    Then(/^continuo na “página de ranqueamento”"$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('página de ranqueamento');	
    });
    
    //2
    Given(/^que eu estou na “página de ranqueamento”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('página de ranqueamento');
    })
    
    Given(/^há no sistema os pesquisadores "(\w*)" com 2 periódicos avaliados em "(\w\d)" e "(\w*)" com 1 periódico avaliado em "(\w\d)"$/, async (p1,n1,p2,n2) => {
        count(p1,2);
        count(p2,1);
    });
    
    Given(/^eu adiciono "(\d*\w\d)" como fórmula para ranqueamento"$/, async (form) => {
		addform(form);
    });
    
    Given(/^eu seleciono “Pesquisadores” como tipo do relatório$/, async () => {
        addtype("Pesquisadores");
    });
    
    When(/^eu seleciono a opção gerar relatório"$/, async () => {
        await $("a[name='gerar']").click();
    });
    
   	Then(/^eu posso ver uma opção para baixar o relatório$/, async () => {
        await expect(element(by.binding("a[name='baixar']")).isPresent()).toBe(false);
    });
    
     //3
    Given(/^que eu estou na “página de ranqueamento”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('página de ranqueamento');
    })

    Given(/^há no sistema os pesquisadores "(\w*)" com 2 periódicos avaliados em "(\w\d)" e "(\w*)" com 1 periódico avaliado em "(\w\d)"$/, async (p1,n1,p2,n2) => {
        count(p1,2);
        count(p2,1);
    });

    Given(/^eu adiciono "(\d*\w\d)" como fórmula para ranqueamento$/, async (form) => {
        addform(form);
    });

    When(/^seleciono a opção “gerar relatório”$/, async () => {
        await $("a[name='gerar']").click();
    });

    Then(/^“eu vejo a mensagem Campo 'tipo' não preenchido”$/, async () => {
         await (expect(element(by.binding("input[name='type']")).getText()) > 0);
    });

  //4
    Given(/^que eu estou na “página de ranqueamento”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('página de ranqueamento');
    })
    
    Given(/^há no sistema os pesquisadores "(\w*)" com 2 periódicos avaliados em "(\w\d)" e "(\w*)" com 1 periódico avaliado em "(\w\d)"$/, async (p1,n1,p2,n2) => {
        count(p1,2);
        count(p2,1);
    });

    Given(/^eu adiciono "((\d*\w)*\d*)" como fórmula para ranqueamento"$/, async (form) => {
        addform(form);
    });

    Given(/^eu seleciono “Grupos de pesquisas” o tipo de relatório$/, async () => {
        addtype("Grupo de Pesquisas");
    });
    
    When(/^seleciono a opção “gerar relatório”$/, async () => {
        await $("a[name='gerar']").click();
    });

    Then(/^eu vejo a mensagem "Fórmula inválida"$/, async () => {
        
    });
    
})
