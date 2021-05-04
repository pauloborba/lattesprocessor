import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Pesquisador } from '../../../../common/pesquisador';

@Injectable()
export class PesquisadorService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here
  uploadLattes(files: FileList): Observable<boolean> {

    let formData = new FormData();
    for(let i = 0; i < files.length; i++) {
      formData.append('lattesFiles', files[i]);
    }

    return this.http.post<any>(this.taURL + '/pesquisador/adicionar', formData).pipe(
      retry(2),
      map(res => {
        if (res.success) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getPesquisadores(): Observable<Pesquisador[]> {
    return this.http.get<Pesquisador[]>(this.taURL + "/pesquisadores", {headers:this.headers})
      .pipe(
        retry(2)
      );
  }

  getCVdiff(): Observable<string> {
    return this.http.get<string>(this.taURL + "/cvdiff/", {headers:this.headers})
      .pipe(
        retry(2)
       );
  }

  getAuthorDiff(): Observable<string> {
    return this.http.get<string>(this.taURL + "/authordiff/", {headers:this.headers})
      .pipe(
        retry(2)
       );
  }

}
