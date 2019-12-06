import request = require("request-promise");
import { closeServer } from '../lp-server';

import { CadastroDePesquisadores } from '../cadastrodepesquisadores';
import { Pesquisador } from '../../common/pesquisador';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna um ranking vazio", () => {
    return request.get(base_url + "/estudoscomparativos")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  });

  it("realiza a comparação entre todos os pesquisadores", () => {
    let cadastroPesq = new CadastroDePesquisadores();
    let pesquisadores: Pesquisador[] = cadastroPesq.getPesquisadores();
    return request(base_url + "/estudoscomparativos")
            .then(body =>
                expect(body.length).toBe(pesquisadores.length)
              )
            .catch(e => 
              expect(e).toEqual(null)
            )
  });

}) 