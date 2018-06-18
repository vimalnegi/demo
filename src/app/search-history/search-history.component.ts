import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';
// import { MatList } from '@angular/material';
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  history: any = [];
  constructor(
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit() {
    const history = this.countriesService.getHistory();
    this.history = history.slice(0, history.length).reverse();

    // this.history = this.countriesService.getHistory().slice(0, );
    console.log(this.history);
  }

  openCountry(NumericCode) {
    const url = `country/${NumericCode}`;
      this.router.navigate([url]);
  }

}
