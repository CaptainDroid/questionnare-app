import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, Form, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatSelectModule, MatInputModule, MatRadioModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SurveyComponent } from './components/survey/survey.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SpiderChartComponent } from './components/spider-chart/spider-chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SurveyComponent,
    HomeComponent,
    SpiderChartComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
