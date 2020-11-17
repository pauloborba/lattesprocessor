import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Grupo } from "../../../../common/grupo";
import { Pesquisador } from "../../../../common/pesquisador";

@Injectable()
export class GruposService {
    
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private lpURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getGrupos(): Observable<Grupo[]> {
        return this.http.get<Grupo[]>(this.lpURL + "/grupos")
            .pipe(
                retry(2)
            );
    }

    criarGrupo(grupo: Grupo): Observable<Grupo> {
        return this.http.post<any>(this.lpURL + "/grupos/grupo", JSON.stringify(grupo), {headers: this.headers})
            .pipe(
                retry(2),
                map(res => {
                    if (res.success) {
                        return grupo;
                    } else {
                        return null;
                    }
                })
            );
    }

    removerGrupo(grupo: Grupo): Observable<any> {
        return this.http.delete<any>(this.lpURL + "/grupos/delete/" + grupo.nome)
            .pipe(
                retry(2),
                map(res => {
                    if (res.success) {
                        return grupo;
                    } else {
                        return null;
                    }
                })
            );
    }

    addPesquisador(pesq: Pesquisador, grupo: Grupo) {
        return this.http.put<any>(this.lpURL + "/grupos/" + grupo.nome, JSON.stringify(pesq), {headers: this.headers})
            .pipe(
                retry(2),
                map(res => {
                    if (res.success) {
                        return grupo;
                    } else {
                        return null;
                    }
                })
            );
    }

    adicionarPesquisadores(grupo: Grupo, grupoAdd: Grupo) {
        return this.http.put<any>(this.lpURL + "/grupos/pesquisadores/" + grupo.nome, JSON.stringify(grupoAdd.integrantes), {headers: this.headers})
            .pipe(
                retry(2),
                map(res => {
                    if (res.success) {
                        return grupoAdd;
                    } else {
                        return null;
                    }
                })
            )
    }

}