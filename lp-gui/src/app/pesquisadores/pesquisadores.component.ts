import { Component, OnInit } from '@angular/core';
import { Pesquisador } from '../../../../common/pesquisador';
import { PesquisadoresService } from './pesquisadores.service';

@Component({
  selector: 'app-pesquisadores',
  templateUrl: './pesquisadores.component.html',
  styleUrls: ['./pesquisadores.component.css']
})
export class PesquisadoresComponent implements OnInit {

  pesquisadorCadastrado: string = '';
  pesquisadorAtualizado: string = '';
  pesquisadores: Pesquisador[];

  constructor(private pesquisadorService: PesquisadoresService) { }

  uploadLattes(files: FileList): void {
    this.pesquisadorService.uploadLattes(files).subscribe(
      (status) => {
        if (status === true) {
          this.pesquisadorCadastrado = 'sucesso';
          this.pesquisadorService.getPesquisadores()
            .subscribe(
              ps => { this.pesquisadores = ps; },
              msg => { alert(msg.message); }
            );
        } else {
          this.pesquisadorCadastrado = 'erro';
        }
      },

      msg => {
        alert(msg.message);
      }
    );

  }

  updateLattes(file: File): void {
    this.pesquisadorService.updateLattes(file).subscribe(
      (status) => {
        if (status === true) {
          this.pesquisadorAtualizado = 'sucesso';
          this.pesquisadorService.getPesquisadores()
            .subscribe(
              ps => { this.pesquisadores = ps; },
              msg => { alert(msg.message); }
            );
        } else {
          this.pesquisadorAtualizado = 'erro';
        }
      },

      msg => {
        alert(msg.message);
      }
    );

  }

  onMove(): void {
    this.pesquisadorCadastrado = '';
    this.pesquisadorAtualizado = '';
  }

  ngOnInit(): void {
    this.pesquisadorService.getPesquisadores()
      .subscribe(
        ps => { this.pesquisadores = ps; },
        msg => { alert(msg.message); }
      );
  }

}
