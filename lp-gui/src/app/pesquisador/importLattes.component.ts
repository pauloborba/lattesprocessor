
import { Component, OnInit } from '@angular/core';
import { Pesquisador } from '../../../../common/pesquisador';
import { PesquisadorService } from './pesquisador.service';

@Component({
  selector: 'app-import',
  templateUrl: './importLattes.component.html',
  styleUrls: ['./importLattes.component.css']
})
export class ImportLattesComponent implements OnInit {

  // IMPORTANT: Only server will create pesquisador when uploading lattes

  // variable to alert if an error occoured during the processing of a lattes file
  statusLattes: string = '';
  pesquisadores: Pesquisador[];
  cvDiff: string = '';
  authorDiff: string = '';


  constructor(private pesquisadorService: PesquisadorService) { }

  uploadLattes(files: FileList): void {
    this.pesquisadorService.uploadLattes(files).subscribe(
      (status) => {
        if (status === true) {
          this.statusLattes = 'sucesso';
          this.pesquisadorService.getPesquisadores()
          .subscribe(
            ps => { this.pesquisadores = ps; },
            msg => { alert(msg.message); }
          );
          this.pesquisadorService.getCVdiff()
          .subscribe(
            cd => { this.cvDiff = cd; },
            msg => { alert(msg.message); }
          );
          this.pesquisadorService.getAuthorDiff()
            .subscribe(
              ad => { this.authorDiff = ad; },
              msg => { alert(msg.message); }
          );
        } else {
          this.statusLattes = 'erro'
        }
      },

      // if an error occoured
      msg => {
        alert(msg.message);
      }
    );

  }

  onMove(): void {
    this.statusLattes = '';
  }

  ngOnInit(): void {
    this.pesquisadorService.getPesquisadores()
      .subscribe(
        ps => { this.pesquisadores = ps; },
        msg => { alert(msg.message); }
      );
    this.pesquisadorService.getCVdiff()
      .subscribe(
        cd => { this.cvDiff = cd; },
        msg => { alert(msg.message); }
       );
    this.pesquisadorService.getAuthorDiff()
      .subscribe(
        ad => { this.authorDiff = ad; },
        msg => { alert(msg.message); }
       );
  }

}
