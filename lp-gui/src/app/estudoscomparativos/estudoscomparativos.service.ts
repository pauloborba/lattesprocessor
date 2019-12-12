import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Pesquisador } from '../../../../common/pesquisador';

@Injectable()
export class EstudosComparativosService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private lpURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here

  getRanking(pesos: number[]): Observable<Pesquisador[]>{
    let getUrl = this.lpURL + `/estudos-comparativos?pesos=${pesos.toString()}`;
    console.log(getUrl);
    let a = this.http.get<Pesquisador[]>(getUrl, { headers: this.headers })
    .pipe(
      retry(2),
    );
    console.log(a);
    return a;
  }

}