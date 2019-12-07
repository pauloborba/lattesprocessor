import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Pesquisador } from '../../../../common/pesquisador';

@Injectable()
export class EstudosComparativosService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here

  getRanking(pesos: number[]): Observable<Pesquisador[]>{
    return this.http.get<Pesquisador[]>(this.taURL + '/estudoscomparativos')
    .pipe(
      retry(2)
    );
  }

}