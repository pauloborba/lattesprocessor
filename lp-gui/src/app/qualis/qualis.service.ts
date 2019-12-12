import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Qualis } from '../../../../common/qualis';


@Injectable()
export class QualisService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //methods go here

  sendFile(file: File): Observable<String> {
    let formData = new FormData();
    formData.append('qualisFile', file, file.name);
    return this.http.post<any>(this.taURL + "/qualis/adicionar", formData)
              .pipe(
                retry(2),
                map(res => {if (res.success) {return res.success;} else {return res.failure}})
              );
  }

  getQualis() : Observable<Map<string,{issn :string,avaliacao :string}>> {
    return this.http.get<Map<string,{issn :string,avaliacao :string}>>(this.taURL + "/qualis")
            .pipe(
              retry(2)
            );
  }

  clearQualis(): Observable<boolean> {
    return this.http.delete<any>(this.taURL + "/qualis/apagar")
              .pipe(
                retry(2),
                map(res => {if (res.success) {return true;} else {return false}})
              );
  }

  getAvaliacao(periodico : String) : Observable<String> {
    return this.http.post<any>(this.taURL + "/qualis/avaliacao", {"periodico": periodico})
              .pipe(
                retry(2),
                map(res => {if (res.success) {return res.success;} else {return null}})
              );
  }
}