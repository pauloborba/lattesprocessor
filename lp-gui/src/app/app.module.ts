import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { NavbarComponent } from './navbar/navbar.component';
import { PesquisadorService } from './pesquisador/pesquisador.service';
import { PesquisadoresComponent } from './pesquisador/pesquisadores.component';
import { ImportLattesComponent } from './pesquisador/importLattes.component';

// add project imports

@NgModule({
  
  declarations: [
    AppComponent,
    PesquisadoresComponent,
    NavbarComponent,
    ImportLattesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot([
      {
        path: 'pesquisadores',
        component: PesquisadoresComponent
      },
      {
        path: 'importar',
        component: ImportLattesComponent
      }
      /*{
        path: 'metas',
        component: MetasComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      } */
    ]), BrowserAnimationsModule
  ],
  providers: [PesquisadorService],
  bootstrap: [AppComponent]

})
export class AppModule { }
