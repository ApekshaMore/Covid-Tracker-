import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component'
import { GoogleChartsModule } from 'angular-google-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    TablePaginationComponent,
    
    // TablePaginationComponent
  ],
  imports: [
    MDBBootstrapModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
