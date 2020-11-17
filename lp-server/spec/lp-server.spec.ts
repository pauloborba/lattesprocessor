import request = require("request-promise");

const fs = require('fs');
let path = require('path');

import { CadastroDePesquisadores } from '../cadastrodepesquisadores';
import { Pesquisador } from '../../common/pesquisador';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server: any;

  beforeAll(() => { server = require('../lp-server') });

  afterAll(() => { server.closeServer() });

  it("inicialmente retorna um ranking vazio", () => {
    return request.get(base_url + "estudos-comparativos/")
            .then(body =>
              expect(body).toBe("[]")
            )
            .catch(e =>
              expect(e).toEqual(null)
             );
  });

  //Qualis

  // it("Inicialmente a tabela está vazia", () => {
  //   return request.get(base_url + "qualis").then(body =>  expect(body).toBe("[]"))
  //                 .catch(e => expect(e).toBe(null));
  // })

  // it("Cadastra uma planilha corretamente", () => {
  //   let filePath = path.join(__dirname, <string>'teste.xls');
  //   let data : string = fs.readFileSync('./spec/test.xls', 'binary');
  //   console.log(filePath);
  //   let qualisFile : File = new File([data],filePath);
  //   let options : any = {method: 'POST', uri: (base_url + "qualis/adicionar"), file: qualisFile};
  //   return request(options).then(body => expect(body)
  //                 .toEqual({success : "planilha cadastrada com sucesso"}))
  //                         .catch(e => exp.catch.e ect(e).toBe(null));
  // })

  // it("Retorna a avaliação esperada de cada periódico", () => {
  //   let periodico : string = "BMC Genomics";
  //   let options : any = {method: 'POST', uri: (base_url + "qualis/avaliacao"), periodico};
  //   return request(options).then(body => expect(body)
  //                 .toEqual({success : "B2"}))
  //                         .catch(e => expect(e).toBe(null));
  // })

  // it("Limpa a tabela", () => {
  //   return request.delete(base_url + "qualis/apagar").then(body => expect(body)
  //                 .toEqual({success : "Tabela qualis apagada"}))
  //                         .catch(e => expect(e).toBe(null));
  
  it("inicialmente retorna uma lista de pesquisadores vazia", () => {
    return request.get(base_url + "pesquisadores")
      .then(body =>
        expect(body).toBe("[]")
      )
      .catch(e =>
        expect(e).toEqual(null)
      );
  })

  
  it("inicialmente retorna uma lista de grupos vazia", () => {
    return request.get(base_url + "grupos")
      .then(body => 
        expect(body).toBe("[]")
      ).catch(err =>
          expect(err).toEqual(null)
      );
  })

  it("só cadastra grupos", () => {
    var options:any = {method: 'POST', uri: (base_url + "grupos/grupo"), body:{name: "UFPE", integrantes: []}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({success: "O grupo foi criado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  })

  it("não cadastra grupos com nome duplicado", () => {
    var grupo1 = {"json":{"nome": "UFPE", "integrantes" : [{"nome": "Mauricio", "orgao": "CIn", "publicacoes": "[]"}]}};
    var grupo2 = {"json":{"nome": "UFPE", "integrantes" : [{"nome": "Adolfo", "orgao": "CCEN", "publicacoes": "[]"}]}};
    var resposta1 = '[{"integrantes":[]},{"nome":"UFPE","integrantes":[{"nome":"Mauricio","orgao":"CIn","publicacoes":"[]"}]}]';
    var resposta2 = '[{"integrantes":[]},{"nome":"UFPE","integrantes":[{"nome":"Adolfo","orgao":"CCEN","publicacoes":"[]"}]}]';

    return request.post(base_url + "grupos/grupo", grupo1)
             .then(body => {
                expect(body).toEqual({success: "O grupo foi criado com sucesso"});
                return request.post(base_url + "grupos/grupo", grupo2)
                         .then(body => {
                            expect(body).toEqual({failure: "O grupo não pode ser criado"});
                            return request.get(base_url + "grupos")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });
  })

  




})
