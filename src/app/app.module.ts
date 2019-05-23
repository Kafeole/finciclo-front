import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EditoresComponent } from './editores/editores.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule,  MatSortModule,
  MatTableModule, MatRadioModule  } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    EditoresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule
  ],
  exports: [
   MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
