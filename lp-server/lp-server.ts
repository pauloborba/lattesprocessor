import express = require('express');
import bodyParser = require("body-parser");

const multer = require('multer');
const upload = multer({ dest: './uploads' });

const fs = require('fs');

import { CadastroDePesquisadores } from './cadastrodepesquisadores';
import { LattesFactory } from './lattesFactory';
import { Pesquisador } from '../common/pesquisador';

// add imports here

var lpserver = express();
let cadatroPesq = new CadastroDePesquisadores();
const lattesFactory = new LattesFactory(cadatroPesq);

// add services here

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

lpserver.use(allowCrossDomain);

lpserver.use(bodyParser.json());

// ========== REQUESTS ==========

// add reqs here

lpserver.post('/pesquisador/adicionar', upload.array('lattesFiles', 12), (req: express.Request, res: express.Response) => {
  let error = false;

  for(let i = 0; i < req.files.length; i++) {
    let xml_string = fs.readFileSync(req.files[i].path, 'binary');
    let p =  lattesFactory.importLattes(xml_string);

    if(p === null) {
      error = true;
    }
  }

  if(!error) {
    res.send({
      success: 'arquivos foram importados com sucesso',
    })

    return;
  }

  res.send({
    failure: 'houve um erro ao importar os arquivos',
  })

});

lpserver.get('/pesquisadores/', (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(cadatroPesq.getPesquisadores()));
});

var server = lpserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }