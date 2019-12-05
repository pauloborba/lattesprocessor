import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { estudoscomparativosComponent } from './estudoscomparativos/estudoscomparativos.component';

// add project imports

@NgModule({
  
  declarations: [
    AppComponent,
    estudoscomparativosComponent
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
      {
        path: 'e',
        component: estudoscomparativosComponent
      }
      /*{
        path: 'metas',
        component: MetasComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      } */
    ])
  ],
  providers: [/*PesquisadorService*/],
  bootstrap: [AppComponent]

})
export class AppModule { }
