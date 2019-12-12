import request = require("request-promise");
import { closeServer } from '../lp-server';

const fs = require('fs');
let path = require('path');

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../lp-server')});

  afterAll(() => {server.closeServer()});

  // add server tests here

  //Qualis

  // it("Inicialmente a tabela está vazia", () => {
  //   return request.get(base_url + "qualis").then(body => expect(body).toBe("[]"))
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
  //                         .catch(e => expect(e).toBe(null));
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
  // })

})