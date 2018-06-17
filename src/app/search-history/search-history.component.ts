import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  history: any = [];
  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit() {
    this.history = this.countriesService.getHistory();
    console.log(this.history);
  }

}
