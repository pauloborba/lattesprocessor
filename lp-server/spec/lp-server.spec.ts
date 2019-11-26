import request = require("request-promise");
import { closeServer } from '../lp-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  // add server tests here

})