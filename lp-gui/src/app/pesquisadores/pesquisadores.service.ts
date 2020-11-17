import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Pesquisador } from '../../../../common/pesquisador';

@Injectable()
export class PesquisadoresService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private lpURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    uploadLattes(files: FileList): Observable<boolean> {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('xmlFiles', files[i]);
        }

        return this.http.post<any>(this.lpURL + '/pesquisador/adicionar', formData).pipe(
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

    updateLattes(file: File): Observable<boolean> {
        let formData = new FormData();
        formData.append('xmlFiles', file);

        return this.http.post<any>(this.lpURL + '/pesquisador/atualizar', formData).pipe(
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
        return this.http.get<Pesquisador[]>(this.lpURL + "/pesquisadores", { headers: this.headers })
            .pipe(
                retry(2)
            );
    }

}