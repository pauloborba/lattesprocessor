import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { PesquisadoresComponent } from './pesquisadores/pesquisadores.component';
import { PesquisadoresService } from './pesquisadores/pesquisadores.service';

@NgModule({
  declarations: [
    AppComponent,
    PesquisadoresComponent,
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
      }
    ]), BrowserAnimationsModule
  ],
  providers: [PesquisadoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
