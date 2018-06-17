import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { CountriesService } from '../countries.service';
@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  countryId: string;
  country: any;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.countryId = param['countryId'];
      this.countryService.get(this.countryId).subscribe(country => {
        this.country = country;
      });

    });
  }

}
