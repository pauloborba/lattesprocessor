import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { Qualis } from '../../../../common/Qualis';


@Injectable()
export class QualisService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendQualis(file: File, qualisType: string, qualisYear: string): Observable<String> {
    let formData = new FormData();
    formData.append('qualisFile', file, file.name);
    formData.append('qualisType', qualisType);
    formData.append('qualisYear', qualisYear);
    return this.http.post<any>(this.taURL + "/qualis/adicionar", formData)
              .pipe(
                retry(2),
                map(res => {if (res.success) {return res.success} else {return res.failure}})
              );
  }

  getQualis() : Observable<Qualis[]> {
    return this.http.get<Qualis[]>(this.taURL + "/qualis")
            .pipe(
              retry(2)
            );
  }

  clearQualis(type?: string, year?: string): Observable<boolean> {
    return this.http.delete<any>(this.taURL + "/qualis/apagar?type=" + type + "&year=" + year)
              .pipe(
                retry(2),
                map(res => {if (res.success) {return true;} else {return false}})
              );
  }
}