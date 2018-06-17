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
    this.history = this.countriesService.getHistory().reverse();
    console.log(this.history);
  }

  openCountry(NumericCode) {
    const url = `country/${NumericCode}`;
      this.router.navigate([url]);
  }

}
