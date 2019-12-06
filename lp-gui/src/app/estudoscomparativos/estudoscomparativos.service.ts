import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Pesquisador } from '../../../../common/pesquisador';

@Injectable()
export class EstudosComparativos {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';
  pesquisadores : Pesquisador[];

  constructor(private http: HttpClient) { }

  // methods go here
  
}