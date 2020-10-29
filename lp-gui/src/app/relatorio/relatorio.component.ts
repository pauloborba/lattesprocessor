import { Component, OnInit } from '@angular/core';
import { Relatorio } from '../../../../common/relatorio';
import { RelatorioService } from './relatorio.service';
import { Pesquisador } from '../../../../common/pesquisador';
import { PesquisadorService } from './pesquisador.service'
import { Publicacao } from '../../../../common/publicacao';

@Component({
    selector: 'app-root',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.css']
})

export class RelatorioComponent implements OnInit {

    relatorio: Relatorio = new Relatorio();
    relatorios: Relatorio[] = [];
    render: Map<number, boolean> = new Map<number, boolean>();
    pesquisadores: Pesquisador[] = [];
    relatorioJaCriado: Boolean = false;
    relatorioJaDeletado: Boolean = false;
    relatorioNaoAtualizado: Boolean = false;

 

    constructor(private RelatorioService: RelatorioService, private PesquisadorService: PesquisadorService) { }
  

    montarRelatorio(): void {   
    console.log('Montou')
    this.relatorio.pesquisadores = this.pesquisadores;
    this.criarRelatorio(this.relatorio)
    }
    logar():void {
        console.log(this.relatorios)
    }
    criarRelatorio(relatorio: Relatorio): void {
     
        this.RelatorioService.criar(relatorio)
            .subscribe(
                ar => {
                    console.log(ar);
                    if (ar) {
                        console.log(ar);
                        this.render.set(ar.id, false);
                        this.relatorios.push(ar);
                        this.relatorio = new Relatorio();
                    }
                },
                error => {
                    this.relatorioJaCriado = true;

                }
            );

    }
    deletarRelatorio(relatorioid: number): void {
        this.RelatorioService.deletar(relatorioid)
            .subscribe(
                ar => {
                    this.relatorios.splice(this.relatorios.findIndex( (rel) => {return rel.id == relatorioid}), 1)
                },
                error => {
                    this.relatorioJaDeletado = true;
                }
            )
    }
    atualizarRelatorio(relatorioid: number): void {
        this.RelatorioService.atualizar(relatorioid)
            .subscribe(
                ar => {
                    console.log(ar)
                    let substituir = this.relatorios.findIndex( (rel) => {return rel.id == ar.id})
                    if(substituir != -1){
                        this.relatorios.splice(substituir, 1, ar)
                    }
                },
                error => {
                    console.log(error)
                }


            )
    }

    atualizarRender(id: number): void{
            console.log(this.render)
            this.render.set(id, !this.render.get(id))
        
    }
    getRender(id: number): boolean {
        if (this.render.has(id)) {
            return this.render.get(id)
        }
        else{
           
            return false;
        }
    }
    getNomes(array: Pesquisador[]): string[]{
        return array.map(a => a.nome);
    } 
    removerAvisos(){
        this.relatorioJaCriado = false;
    }

   onMove(): void {
    }

    ngOnInit(): void {
        this.RelatorioService.getRelatorios()
            .subscribe(
                as => { this.relatorios = as; },
                msg => { alert(msg.message); }
            );
        this.PesquisadorService.getPesquisadores()
            .subscribe(
                as => { this.pesquisadores = as; console.log(this.pesquisadores) },
                msg => { alert(msg.message); }
            )
        
    }

}