import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

 
// add project imports

@NgModule({
  
  declarations: [
    AppComponent,
    RelatorioComponent
    //,
    //MetasComponent,
    //AlunosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot([
      /*{
        path: '/',
        component: AppComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      } */
      {
        path: 'relatorio',
        component: RelatorioComponent 
      }
    ])
  ],
  providers: [/*PesquisadorService*/],
  bootstrap: [AppComponent]

})
export class AppModule { }
