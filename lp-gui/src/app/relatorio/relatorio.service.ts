import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Relatorio } from '../../../../common/relatorio';

@Injectable()
export class RelatorioService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private taURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    criar(relatorio: Relatorio): Observable<Relatorio> {
        return this.http.post<any>(this.taURL + "/relatorios", relatorio, { headers: this.headers })
            .pipe(
                retry(2),
                map(res => {
                    if (res.failure) { throw new Error(res.failure) } else {
 
                        return res;
                        
                    }
                })
            );
    }

    atualizar(relatorio: number): Observable<Relatorio> {
        return this.http.put<any>(this.taURL + "/relatorios/"+relatorio, { headers: this.headers }).pipe(
            retry(2),
            map(res => { if (res.failure) { throw new Error(res.failure); } else { return res} })
        );
    }
    deletar(relatorio: number): Observable<string> {
        return this.http.delete<any>(this.taURL + "/relatorios/" + relatorio, { headers: this.headers }).pipe(
            retry(2),
            map(res => { if (res.success) { return res.success; } else { throw new Error (res.failure); } })
        );
    }

    getRelatorios(): Observable<Relatorio[]> {
        return this.http.get<Relatorio[]>(this.taURL + "/relatorios")
            .pipe(
                retry(2)
            );
    }

}