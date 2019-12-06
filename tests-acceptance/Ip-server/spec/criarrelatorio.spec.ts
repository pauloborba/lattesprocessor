import request = require("request-promise");
import { closeServer } from "../lp-server.ts";

let base_url = "http://localhost:3000/";

describe("O servidor", () => {
    let server:any;
    
    beforeAll(() => {server = require("../lp-server")});

    afterAll(() => {server.closeServer()});

    it("inicialmente um servidor tem uma lista de pesquisadores", () => {
        return request.get(base_url + "pesq").then(body => expect(body).to.not.be.empty).catch(e => expect(e).toEqual(null));
    })

    it("envia as informações para criação do relatório", () => {
        let periodico = {"json":{"type":"Pesquisadores","formula": "A1+B1"}}
        //let resposta = 
        return request.post(base_url + "criarrel", periodico).then(body => {expect(body).toEqual({success:"O relatorio criado com sucesso"});
        return request.get(base_url + "criarrel").then(body => expect(body).toBe(resposta)).catch(e => expect(e).toEqual(null));});
    })


})
