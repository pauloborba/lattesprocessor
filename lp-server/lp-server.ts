import express = require('express');
import bodyParser = require("body-parser");
import { RelatorioFactory } from './relatoriosFactory';
import { Relatorio } from '../common/relatorio';
import { QualisFactory } from '../lp-server/QualisFactory';
import { Qualis } from '../common/Qualis'
import { Publicacao } from '../common/publicacao'
import { Pesquisador } from '../common/pesquisador'

const multer = require('multer');
const upload = multer({ dest: './uploads' });

const fs = require('fs');

var lpserver = express();

var relatorios: RelatorioFactory = new RelatorioFactory();
var qualisFactory: QualisFactory = new QualisFactory();
var pesquisadores: Pesquisador[] = [];
gerarDados();

// add services here
var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

lpserver.use(allowCrossDomain);

lpserver.use(bodyParser.json());

// ========== REQUESTS ==========
lpserver.get('/relatorios', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(relatorios.getRelatorios()));
})
lpserver.get('/pesquisadores', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(pesquisadores));
})


lpserver.post('/relatorios', function (req: express.Request, res: express.Response) {
  var relatorio: Relatorio = <Relatorio>req.body; 
  var result = relatorios.addRelatorio(relatorio, qualisFactory.getQualis());
  if (result) {
    res.send(result);
  } else {
    relatorios.findRelatorio(relatorio).generate(qualisFactory.qualis)
    res.send({ "failure": "O relatorio ja foi gerado." });
  }
})

lpserver.put('/relatorios/:id', function (req: express.Request, res: express.Response) {
  var relaId = parseInt(req.params.id);
  var relatorio = null;
  if (!isNaN(relaId) && isFinite(relaId)) {
     relatorio = relatorios.updateRelatorio(relaId, qualisFactory.getQualis());
  }
  if(relatorio){
    res.send(relatorio)
  }else {
    res.send({ "failure": "O relatorio nao pode ser atualizado" });
  }


})

lpserver.delete('/relatorios/:id', function (req: express.Request, res: express.Response) {
  var relaId = parseInt(req.params.id);
  if(!isNaN(relaId) && isFinite(relaId)){
  var retId = relatorios.deleteRelatorio(relaId);
  }
  if(retId >= 0){
    res.send({ "success": "O relatorio foi deletado com sucesso." });
  } else {
    res.send({ "failure": "O relatorio nao pode ser deletado" });
  }

})
var server = lpserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

function gerarDados(): void{
  var pesq1 = new Pesquisador();
  var pesq2 = new Pesquisador();
  var pesq3 = new Pesquisador();

  pesquisadores.push(pesq1, pesq2, pesq3)
  pesq1.nome = "Joao"
  pesq2.nome = "Breno"
  pesq3.nome = "Alice"
  let pesq1p1 = new Publicacao();
  let pesq1p2 = new Publicacao();
  let pesq1p3 = new Publicacao();
  let pesq2p1 = new Publicacao();
  let pesq2p2 = new Publicacao();
  let pesq2p3 = new Publicacao();
  let pesq3p1 = new Publicacao();
  let pesq3p2 = new Publicacao();
  let pesq3p3 = new Publicacao();
  let pesq3p4 = new Publicacao();
  pesq1.publicacoes.push(pesq1p1)
  pesq1.publicacoes.push(pesq1p2)
  pesq1.publicacoes.push(pesq1p3)
  pesq2.publicacoes.push(pesq2p1)
  pesq2.publicacoes.push(pesq2p2)
  pesq2.publicacoes.push(pesq2p3)
  pesq3.publicacoes.push(pesq3p1)
  pesq3.publicacoes.push(pesq3p2)
  pesq3.publicacoes.push(pesq3p3)
  pesq3.publicacoes.push(pesq3p4)
  pesq1p1.titulo = "Publicacao A"
  pesq1p2.titulo = "Publicacao B"
  pesq1p3.titulo = "Publicacao C"
  pesq1p1.periodico = "Publicacao AAA"
  pesq1p2.periodico = "Publicacao BBB"
  pesq1p3.periodico = "Publicacao CCC"
  pesq1p1.issn = "0001"
  pesq1p2.issn = "0002"
  pesq1p3.issn = "0003"
  pesq2p1.titulo = "Publicacao D"
  pesq2p2.titulo = "Publicacao E"
  pesq2p3.titulo = "Publicacao F"
  pesq2p1.periodico = "Publicacao DDD"
  pesq2p2.periodico = "Publicacao EEE"
  pesq2p3.periodico = "Publicacao FFF"
  pesq2p1.issn = "0004"
  pesq2p2.issn = "0005"
  pesq2p3.issn = "0006"
  pesq3p1.titulo = "Publicacao G"
  pesq3p2.titulo = "Publicacao H"
  pesq3p3.titulo = "Publicacao I"
  pesq3p1.periodico = "Publicacao GGG"
  pesq3p2.periodico = "Publicacao HHH"
  pesq3p3.periodico = "Publicacao III"
  pesq3p1.issn = "0007"
  pesq3p2.issn = "0008"
  pesq3p3.issn = "0009"
  pesq3p4.titulo = "Publicacao J"
  pesq3p4.periodico = "Publicacao JJJ"
  pesq3p4.issn = "0010"
  let pesq1q1 = new Qualis();
  let pesq1q2 = new Qualis();
  let pesq1q3 = new Qualis();
  let pesq2q1 = new Qualis();
  let pesq2q2 = new Qualis();
  let pesq2q3 = new Qualis();
  let pesq3q1 = new Qualis();
  let pesq3q2 = new Qualis();
  let pesq3q3 = new Qualis();
  let pesq3q4 = new Qualis();
  pesq1q1.montar("Publicacao A", 11, "Estudo", "0001", "A1")
  pesq1q2.montar("Publicacao B", 12, "Estudo", "0002", "A1")
  pesq1q3.montar("Publicacao C", 13, "Estudo", "0003", "B4")
  pesq2q1.montar("Publicacao D", 14, "Estudo", "0004", "A2")
  pesq2q2.montar("Publicacao E", 15, "Estudo", "0005", "A2")
  pesq2q3.montar("Publicacao F", 16, "Estudo", "0006", "A2")
  pesq3q1.montar("Publicacao G", 17, "Estudo", "0007", "A3")
  pesq3q2.montar("Publicacao H", 18, "Estudo", "0008", "A2")
  pesq3q3.montar("Publicacao I", 19, "Estudo", "0009", "A2")
  pesq3q4.montar("Publicacao J", 20, "Estudo", "0010", "A2")
  qualisFactory.qualis.push(pesq1q1)
  qualisFactory.qualis.push(pesq1q2)
  qualisFactory.qualis.push(pesq1q3)
  qualisFactory.qualis.push(pesq2q1)
  qualisFactory.qualis.push(pesq2q2)
  qualisFactory.qualis.push(pesq2q3)
  qualisFactory.qualis.push(pesq3q1)
  qualisFactory.qualis.push(pesq3q2)
  qualisFactory.qualis.push(pesq3q3)
  qualisFactory.qualis.push(pesq3q4);
  



}

export { server, closeServer }