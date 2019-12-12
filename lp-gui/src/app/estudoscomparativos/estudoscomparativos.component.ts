import { Component, OnInit } from '@angular/core';
import { Pesquisador } from '../../../../common/pesquisador';
import { EstudosComparativosService } from './estudoscomparativos.service';
import { PesquisadorService } from '../pesquisador/pesquisador.service';

@Component({
  selector: 'app-root',
  templateUrl: './estudoscomparativos.component.html',
  styleUrls: ['./estudoscomparativos.component.css']
})


export class estudoscomparativosComponent implements OnInit{

  pesquisadores: Pesquisador[] = [];
  xlscarregado: boolean = false;
  pesos: any[] = [1, 1, 1, 1, 1, 1, 1, 1];

  constructor(private ecService: EstudosComparativosService, private pqService: PesquisadorService) { }

  ngOnInit() {
    this.updateXlsCarregado();
  }

  pesosInvalidos(): boolean {
    for (let i = 0; i < 8; i++) {
      if (isNaN(Number(this.pesos[i]))) {
        return true;
      }
    }
    return false;
  }

  updateXlsCarregado(): void {
    this.pqService.getPesquisadores().subscribe(
      ps => {
        if (ps.length > 0) {
          this.xlscarregado = true;
        } else {
          this.xlscarregado = false;
        }
      },
      msg => { alert(msg.message); }
    );

  }

  gerarEstudo(): void {
    this.updateXlsCarregado();
    if (this.pesosInvalidos()) {
      alert('Pesos inválidos');
      return;
    }
    if (!this.xlscarregado) {
      alert('nenhum arquivo carregado');
    } else {
      this.ecService.getRanking(this.pesos).subscribe(
        ps => {
          this.pesquisadores = ps;
          console.log(ps)
        },
        msg => { alert(msg) }
      );
    }
  }

  setPadrao(): void {
    this.pesos = [1, 1, 1, 1, 1, 1, 1, 1];
  }

  print() {
    window.print();
  }
}