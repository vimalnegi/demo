import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
const  routes: Routes = [
  {
    path : '', component: SearchBoxComponent,
  },
  {
    path : 'history', component: SearchHistoryComponent,
  },
  {
    path : 'country/:countryId', component: CountryDetailsComponent
  },
  {
    path : 'history', component: SearchHistoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    RouterModule,
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
