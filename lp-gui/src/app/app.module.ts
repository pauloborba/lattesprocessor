import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QualisComponent } from './qualis/qualis.component'
import { QualisService } from './qualis/qualis.service';
// add project imports

@NgModule({
  
  declarations: [
    AppComponent,
    QualisComponent
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
        path: 'metas',
        component: MetasComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      } */
      {
        path: 'qualis',
        component: QualisComponent
      }
    ])
  ],
  providers: [QualisService],
  bootstrap: [AppComponent]

})
export class AppModule { }
