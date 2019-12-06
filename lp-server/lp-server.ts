import express = require('express');
import bodyParser = require("body-parser");

// add imports here

import { CadastroDePesquisadores } from './cadastrodepesquisadores';
import { Pesquisador } from '../common/pesquisador';

var lpserver = express();
let cadatroPesq = new CadastroDePesquisadores();


// add services here

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

lpserver.use(allowCrossDomain);

lpserver.use(bodyParser.json());

// add reqs here

lpserver.get('/estudos-comparativos', (req: express.Request, res: express.Response) => {
  //let pesquisadores: Pesquisador[] = cadastroPesq.getPesquisadores();
  let pesquisadores: any = [{"nome":"Paulo Henrique Monteiro Borba","orgao":"","publicacoes":[{"titulo":"States as Specifications","periodico":"I Simp�sio Brasileiro de Linguagens de Programa��o (SBLP 1996)"},{"titulo":"An Operational Semantics for FOOPS","periodico":"Information Systems Correctness And Reusability (ISCORE 1994)"}]}, {"nome":"Eidson Jaco","orgao":"","publicacoes":[{"titulo":"States as Specifications","periodico":"I Simp�sio Brasileiro de Linguagens de Programa��o (SBLP 1996)"},{"titulo":"An Operational Semantics for FOOPS","periodico":"Information Systems Correctness And Reusability (ISCORE 1994)"}]}];
  let pesos: number[] = <number[]> req.body;
  let ranking: any = [];

  if(typeof pesos[0] != "number"||typeof pesos[1] != "number"||typeof pesos[2] != "number" || typeof pesos[3] != "number"|| typeof pesos[4] != "number"|| typeof pesos[5] != "number"|| typeof pesos[6] != "number"|| typeof pesos[7] != "number"){
    res.send("Pesos inválidos");
  }

  pesquisadores.forEach((pesq: any) => {
    let sumPont = 0;
    pesq.publicacoes.forEach((publi: any) => {
      let currentPont = 0
      //let nota = Qualis.getAvaliacao(publi.periodico)
      let nota;
      // inicio codigo imbecil para teste
        if (publi.periodico == "I Simp�sio Brasileiro de Linguagens de Programa��o (SBLP 1996)"){
          nota = 'A2'
        }
        else if (publi.periodico == "Information Systems Correctness And Reusability (ISCORE 1994)"){
          nota = 'A1'
        }
        else if (publi.periodico == "I Simp�sio Brasileiro de Linguagens de Programa��o (SBLP 1996)"){
          nota = 'C'
        }
        else if (publi.periodico == "Information Systems Correctness And Reusability (ISCORE 1994)"){
          nota = 'B2'
        }
      // fim codigo imbecil para teste

      if (nota == 'A1'){
        currentPont = pesos[0];
      } else if (nota == 'A2') {
        currentPont = pesos[1];
      } else if (nota == 'B1') {
        currentPont = pesos[2];
      } else if (nota == 'B2') {
        currentPont = pesos[3];
      } else if (nota == 'B3') {
        currentPont = pesos[4];
      } else if (nota == 'B4') {
        currentPont = pesos[5];
      } else if (nota == 'B5') {
        currentPont = pesos[6];
      } else if (nota == 'C') {
        currentPont = pesos[7];
      } else {
        currentPont = 0;
      }
      sumPont += currentPont;
    });
    
    ranking.push({
        pesquisador: pesq,
        pontos: sumPont,
    })

  });
  ranking.sort((a: any, b: any) => (a.pontos > b.pontos) ? 1 : (a.pontos == b.pontos) ? ((a.pesquisador.nome > b.pesquisador.nome) ? 1 : -1) : -1)

  res.send(ranking)
})

var server = lpserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }