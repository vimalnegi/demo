import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  myControl: FormControl = new FormControl();
  keyword = '';
  options: any = [];

  constructor(
    private country: CountriesService,
    private router: Router
  ) {
  }

  onKeywordChange() {
    this.search(this.keyword);
  }

  goToSeachHistory() {
    const historyRoute = '/history';
    this.router.navigate([historyRoute]);
  }

  search(keyword) {
    // console.log(keyword);
    if (keyword.length < 3) {
      return this.options = [];
    }
    this.country.search(keyword).subscribe(data => {
      this.options = data;
      // console.log(data);
    });
  }
  onCountrySelect(country) {
    const numericCode = country.NumericCode;
    this.country.get(numericCode).subscribe((filteredCountry: any) => {
      const url = `country/${filteredCountry.NumericCode}`;
      this.router.navigate([url]);
      console.log(filteredCountry);
    });
  }

  ngOnInit() {
    const history = this.country.getHistory();
    this.options = history.slice(0, history.length).reverse().slice(0, 5);
    this.country.getCountries().subscribe(data => {
      // console.log(data);
    });
    // this.country.search('ind').subscribe(data => console.log(data));
  }

}
