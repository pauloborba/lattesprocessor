import { Pesquisador } from '../common/pesquisador';
import { Publicacao } from '../common/publicacao';
import { CadastroDePesquisadores } from './cadastroDePesquisadores';

let xml2js = require('xml2js');

export class PesquisadoresFactory {
    cadastroPesq: CadastroDePesquisadores;

    constructor(c: CadastroDePesquisadores) {
        this.cadastroPesq = c;
    }

    getEvent(e: any): Publicacao {
        let tituloPublicacao = e['DADOS-BASICOS-DO-TRABALHO'][0].ATTR['TITULO-DO-TRABALHO'];
        let periodico = e['DETALHAMENTO-DO-TRABALHO'][0].ATTR['NOME-DO-EVENTO'];
        let publicacao = new Publicacao(tituloPublicacao, periodico, null);
        return publicacao;
    }

    getArticle(a: any): Publicacao {
        let tituloPublicacao = a['DADOS-BASICOS-DO-ARTIGO'][0].ATTR['TITULO-DO-ARTIGO'];
        let periodico = a['DETALHAMENTO-DO-ARTIGO'][0].ATTR['TITULO-DO-PERIODICO-OU-REVISTA'];
        let issnPublicacao = a['DETALHAMENTO-DO-ARTIGO'][0].ATTR['ISSN']
        let publicacao = new Publicacao(tituloPublicacao, periodico, issnPublicacao);
        return publicacao;
    }

    getChapter(a: any): Publicacao {
        let tituloPublicacao = a['DADOS-BASICOS-DO-CAPITULO'][0].ATTR['TITULO-DO-CAPITULO-DO-LIVRO'];
        let periodico = a['DETALHAMENTO-DO-CAPITULO'][0].ATTR['TITULO-DO-LIVRO'];
        let isbnPublicacao = a['DETALHAMENTO-DO-CAPITULO'][0].ATTR['ISBN'];
        let publicacao = new Publicacao(tituloPublicacao, periodico, isbnPublicacao);
        return publicacao;
    }

    lattesConstruct(xml_string: string): Pesquisador {
        let resp = null;

        let parser = new xml2js.Parser({ attrkey: "ATTR" });
        parser.parseString(xml_string, (error: any, result: any) => {
            if (error === null) {
                try {
                    let tempPesquisador = new Pesquisador();

                    let name = result['CURRICULO-VITAE']['DADOS-GERAIS'][0].ATTR['NOME-COMPLETO'];
                    tempPesquisador.nome = name;

                    let bibliography = result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0];
                    let events = bibliography['TRABALHOS-EM-EVENTOS'][0]['TRABALHO-EM-EVENTOS'];
                    let articles = bibliography['ARTIGOS-PUBLICADOS'][0]['ARTIGO-PUBLICADO'];
                    let chapters = bibliography['LIVROS-E-CAPITULOS'][0]['CAPITULOS-DE-LIVROS-PUBLICADOS'][0]['CAPITULO-DE-LIVRO-PUBLICADO'];

                    events.forEach((e: any) => {
                        tempPesquisador.addPublicacao(this.getEvent(e));
                    });

                    articles.forEach((a: any) => {
                        tempPesquisador.addPublicacao(this.getArticle(a));
                    });

                    chapters.forEach((c: any) => {
                        tempPesquisador.addPublicacao(this.getChapter(c));
                    });

                    resp = tempPesquisador;
                } catch (error) {
                    console.log("Não foi possível importar o arquivo XML!");
                }
            }
        });

        return resp;
    }

    importLattes(xml_string: string): Pesquisador {
        let p = this.lattesConstruct(xml_string);

        if (p === null) {
            return null;
        } else {
            return this.cadastroPesq.addPesquisador(p);
        }
    }

    updateLattes(xml_string: string): Pesquisador {
        let p = this.lattesConstruct(xml_string);

        if (p === null) {
            return null;
        } else {
            return this.cadastroPesq.updatePesquisador(p);
        }
    }
}
