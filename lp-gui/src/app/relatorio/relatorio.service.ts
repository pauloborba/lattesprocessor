import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { EstudosComparativos } from '../estudoscomparativos/estudoscomparativos.service';
import { Pesquisador } from '../../../../common/pesquisador';

@Injectable()
export class RelatorioService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here

  sendAvaliacao(file: Pesquisador[]): Observable<boolean>{
    return this.http.post<any>(this.taURL + "/relatorio", file, {headers: this.headers})
      .pipe(
        retry(2)
       // map(res => {if (res.success) {return true;} else {return false;}})
      );
  }

}