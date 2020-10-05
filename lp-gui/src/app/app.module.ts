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
import { ImportLattesComponent } from './pesquisador/importLattes.component';

import { RelatorioComponent } from './relatorio/relatorio.component'
import { RelatorioService } from './relatorio/relatorio.service'


// add project imports

@NgModule({
  declarations: [
    AppComponent,
    RelatorioComponent,
    NavbarComponent,
    ImportLattesComponent,
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
        path: 'relatorios',
        component: RelatorioComponent
      },
      {
        path: 'pesquisadores',
        component: ImportLattesComponent
      }
    ]), BrowserAnimationsModule
  ],
  providers: [ PesquisadorService, RelatorioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
