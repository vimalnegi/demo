import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CountriesService } from './countries.service';
import { ApiService } from './api-service.service';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { SearchHistoryComponent } from './search-history/search-history.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    CountryDetailsComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAppModule,
    AppRoutingModule,
  ],
  providers: [CountriesService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
