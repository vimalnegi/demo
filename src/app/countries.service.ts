import { Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { map, count } from "rxjs/operators";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { StorageService } from "./storage.service";

const API = Object.freeze({
  all: "http://countryapi.gear.host/v1/Country/getCountries"
});
const string = Object.freeze({
  HISTORY_KEY: 'history',
})
@Injectable()
export class CountriesService {
  history: any = [];
  countries: any = countryApiFakeData.Response;
  constructor(
    private apiService: ApiService,
    private storage: StorageService,
  ) {
    this.history = this.getHistory();
  }

  insertIntoHistort(selectedCountry){
    const index = this.history.findIndex(country => country.NumericCode == selectedCountry.NumericCode);
    if(index >= 0){
      this.history.splice(index, 1);
    }
    this.history.push(selectedCountry);
    this.storage.setKey(string.HISTORY_KEY, this.history);
  }

  getHistory(){
    if(this.history.length){
      return this.history;
    }
    let historyLocalStorage = this.storage.get(string.HISTORY_KEY);
    if(historyLocalStorage) {
      this.history = historyLocalStorage;
    }
    return this.history;
  }

  search(keyword: string){
    keyword = keyword.toLowerCase();
    return this.getCountries().map(countries => {
      countries = countries.filter(country => {
        let countryName = country.Name && country.Name.toLowerCase();
        return countryName.indexOf(keyword) >= 0;
      })
      return countries;
    })
  }

  get(NumericCode: string) {
    return this.getCountries().map(countries=>{
      let resultCountry = countries.find(country => country.NumericCode == NumericCode);
      this.insertIntoHistort(resultCountry);
      return resultCountry;
    })
  }
  getCountries() {
    if (this.countries) {
      return new Observable(observer => {
        observer.next(this.countries);
        observer.complete();
      });
    }
    return this.apiService.get(API.all).map((res: any) => {
      this.countries = res.Response;
      return this.countries;
    });
  }
}

const countryApiFakeData = {
  IsSuccess: true,
  UserMessage: null,
  TechnicalMessage: null,
  TotalCount: 250,
  Response: [
    {
      Name: "Afghanistan",
      Alpha2Code: "AF",
      Alpha3Code: "AFG",
      NativeName: "افغانستان",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "33",
      Longitude: "65",
      Area: 652230,
      NumericCode: 4,
      NativeLanguage: "pus",
      CurrencyCode: "AFN",
      CurrencyName: "Afghan afghani",
      CurrencySymbol: "؋",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/afg.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/afg.png"
    },
    {
      Name: "Åland Islands",
      Alpha2Code: "AX",
      Alpha3Code: "ALA",
      NativeName: "Åland",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "60.116667",
      Longitude: "19.9",
      Area: 1580,
      NumericCode: 248,
      NativeLanguage: "swe",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ala.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ala.png"
    },
    {
      Name: "Albania",
      Alpha2Code: "AL",
      Alpha3Code: "ALB",
      NativeName: "Shqipëria",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "41",
      Longitude: "20",
      Area: 28748,
      NumericCode: 8,
      NativeLanguage: "sqi",
      CurrencyCode: "ALL",
      CurrencyName: "Albanian lek",
      CurrencySymbol: "L",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/alb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/alb.png"
    },
    {
      Name: "Algeria",
      Alpha2Code: "DZ",
      Alpha3Code: "DZA",
      NativeName: "الجزائر",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "28",
      Longitude: "3",
      Area: 2381741,
      NumericCode: 12,
      NativeLanguage: "ara",
      CurrencyCode: "DZD",
      CurrencyName: "Algerian dinar",
      CurrencySymbol: "د.ج",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/dza.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/dza.png"
    },
    {
      Name: "American Samoa",
      Alpha2Code: "AS",
      Alpha3Code: "ASM",
      NativeName: "American Samoa",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-14.33333333",
      Longitude: "-170",
      Area: 199,
      NumericCode: 16,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United State Dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/asm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/asm.png"
    },
    {
      Name: "Andorra",
      Alpha2Code: "AD",
      Alpha3Code: "AND",
      NativeName: "Andorra",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "42.5",
      Longitude: "1.5",
      Area: 468,
      NumericCode: 20,
      NativeLanguage: "cat",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/and.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/and.png"
    },
    {
      Name: "Angola",
      Alpha2Code: "AO",
      Alpha3Code: "AGO",
      NativeName: "Angola",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "-12.5",
      Longitude: "18.5",
      Area: 1246700,
      NumericCode: 24,
      NativeLanguage: "por",
      CurrencyCode: "AOA",
      CurrencyName: "Angolan kwanza",
      CurrencySymbol: "Kz",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ago.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ago.png"
    },
    {
      Name: "Anguilla",
      Alpha2Code: "AI",
      Alpha3Code: "AIA",
      NativeName: "Anguilla",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.25",
      Longitude: "-63.16666666",
      Area: 91,
      NumericCode: 660,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/aia.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/aia.png"
    },
    {
      Name: "Antarctica",
      Alpha2Code: "AQ",
      Alpha3Code: "ATA",
      NativeName: "Antarctica",
      Region: "Polar",
      SubRegion: "",
      Latitude: "-74.65",
      Longitude: "4.48",
      Area: 14000000,
      NumericCode: 10,
      NativeLanguage: "",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ata.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ata.png"
    },
    {
      Name: "Antigua and Barbuda",
      Alpha2Code: "AG",
      Alpha3Code: "ATG",
      NativeName: "Antigua and Barbuda",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "17.05",
      Longitude: "-61.8",
      Area: 442,
      NumericCode: 28,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/atg.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/atg.png"
    },
    {
      Name: "Argentina",
      Alpha2Code: "AR",
      Alpha3Code: "ARG",
      NativeName: "Argentina",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-34",
      Longitude: "-64",
      Area: 2780400,
      NumericCode: 32,
      NativeLanguage: "spa",
      CurrencyCode: "ARS",
      CurrencyName: "Argentine peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/arg.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/arg.png"
    },
    {
      Name: "Armenia",
      Alpha2Code: "AM",
      Alpha3Code: "ARM",
      NativeName: "Հայաստան",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "40",
      Longitude: "45",
      Area: 29743,
      NumericCode: 51,
      NativeLanguage: "hye",
      CurrencyCode: "AMD",
      CurrencyName: "Armenian dram",
      CurrencySymbol: "",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/arm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/arm.png"
    },
    {
      Name: "Aruba",
      Alpha2Code: "AW",
      Alpha3Code: "ABW",
      NativeName: "Aruba",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "12.5",
      Longitude: "-69.96666666",
      Area: 180,
      NumericCode: 533,
      NativeLanguage: "nld",
      CurrencyCode: "AWG",
      CurrencyName: "Aruban florin",
      CurrencySymbol: "ƒ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/abw.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/abw.png"
    },
    {
      Name: "Australia",
      Alpha2Code: "AU",
      Alpha3Code: "AUS",
      NativeName: "Australia",
      Region: "Oceania",
      SubRegion: "Australia and New Zealand",
      Latitude: "-27",
      Longitude: "133",
      Area: 7692024,
      NumericCode: 36,
      NativeLanguage: "eng",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/aus.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/aus.png"
    },
    {
      Name: "Austria",
      Alpha2Code: "AT",
      Alpha3Code: "AUT",
      NativeName: "Österreich",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "47.33333333",
      Longitude: "13.33333333",
      Area: 83871,
      NumericCode: 40,
      NativeLanguage: "deu",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/aut.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/aut.png"
    },
    {
      Name: "Azerbaijan",
      Alpha2Code: "AZ",
      Alpha3Code: "AZE",
      NativeName: "Azərbaycan",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "40.5",
      Longitude: "47.5",
      Area: 86600,
      NumericCode: 31,
      NativeLanguage: "aze",
      CurrencyCode: "AZN",
      CurrencyName: "Azerbaijani manat",
      CurrencySymbol: "",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/aze.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/aze.png"
    },
    {
      Name: "Bahamas",
      Alpha2Code: "BS",
      Alpha3Code: "BHS",
      NativeName: "Bahamas",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "24.25",
      Longitude: "-76",
      Area: 13943,
      NumericCode: 44,
      NativeLanguage: "eng",
      CurrencyCode: "BSD",
      CurrencyName: "Bahamian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bhs.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bhs.png"
    },
    {
      Name: "Bahrain",
      Alpha2Code: "BH",
      Alpha3Code: "BHR",
      NativeName: "‏البحرين",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "26",
      Longitude: "50.55",
      Area: 765,
      NumericCode: 48,
      NativeLanguage: "ara",
      CurrencyCode: "BHD",
      CurrencyName: "Bahraini dinar",
      CurrencySymbol: ".د.ب",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bhr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bhr.png"
    },
    {
      Name: "Bangladesh",
      Alpha2Code: "BD",
      Alpha3Code: "BGD",
      NativeName: "Bangladesh",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "24",
      Longitude: "90",
      Area: 147570,
      NumericCode: 50,
      NativeLanguage: "ben",
      CurrencyCode: "BDT",
      CurrencyName: "Bangladeshi taka",
      CurrencySymbol: "৳",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bgd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bgd.png"
    },
    {
      Name: "Barbados",
      Alpha2Code: "BB",
      Alpha3Code: "BRB",
      NativeName: "Barbados",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "13.16666666",
      Longitude: "-59.53333333",
      Area: 430,
      NumericCode: 52,
      NativeLanguage: "eng",
      CurrencyCode: "BBD",
      CurrencyName: "Barbadian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/brb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/brb.png"
    },
    {
      Name: "Belarus",
      Alpha2Code: "BY",
      Alpha3Code: "BLR",
      NativeName: "Белару́сь",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "53",
      Longitude: "28",
      Area: 207600,
      NumericCode: 112,
      NativeLanguage: "bel",
      CurrencyCode: "BYN",
      CurrencyName: "New Belarusian ruble",
      CurrencySymbol: "Br",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/blr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/blr.png"
    },
    {
      Name: "Belgium",
      Alpha2Code: "BE",
      Alpha3Code: "BEL",
      NativeName: "België",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "50.83333333",
      Longitude: "4",
      Area: 30528,
      NumericCode: 56,
      NativeLanguage: "nld",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bel.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bel.png"
    },
    {
      Name: "Belize",
      Alpha2Code: "BZ",
      Alpha3Code: "BLZ",
      NativeName: "Belize",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "17.25",
      Longitude: "-88.75",
      Area: 22966,
      NumericCode: 84,
      NativeLanguage: "eng",
      CurrencyCode: "BZD",
      CurrencyName: "Belize dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/blz.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/blz.png"
    },
    {
      Name: "Benin",
      Alpha2Code: "BJ",
      Alpha3Code: "BEN",
      NativeName: "Bénin",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "9.5",
      Longitude: "2.25",
      Area: 112622,
      NumericCode: 204,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ben.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ben.png"
    },
    {
      Name: "Bermuda",
      Alpha2Code: "BM",
      Alpha3Code: "BMU",
      NativeName: "Bermuda",
      Region: "Americas",
      SubRegion: "Northern America",
      Latitude: "32.33333333",
      Longitude: "-64.75",
      Area: 54,
      NumericCode: 60,
      NativeLanguage: "eng",
      CurrencyCode: "BMD",
      CurrencyName: "Bermudian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bmu.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bmu.png"
    },
    {
      Name: "Bhutan",
      Alpha2Code: "BT",
      Alpha3Code: "BTN",
      NativeName: "ʼbrug-yul",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "27.5",
      Longitude: "90.5",
      Area: 38394,
      NumericCode: 64,
      NativeLanguage: "dzo",
      CurrencyCode: "BTN",
      CurrencyName: "Bhutanese ngultrum",
      CurrencySymbol: "Nu.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/btn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/btn.png"
    },
    {
      Name: "Bolivia (Plurinational State of)",
      Alpha2Code: "BO",
      Alpha3Code: "BOL",
      NativeName: "Bolivia",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-17",
      Longitude: "-65",
      Area: 1098581,
      NumericCode: 68,
      NativeLanguage: "spa",
      CurrencyCode: "BOB",
      CurrencyName: "Bolivian boliviano",
      CurrencySymbol: "Bs.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bol.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bol.png"
    },
    {
      Name: "Bonaire, Sint Eustatius and Saba",
      Alpha2Code: "BQ",
      Alpha3Code: "BES",
      NativeName: "Bonaire",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "12.15",
      Longitude: "-68.266667",
      Area: 294,
      NumericCode: 535,
      NativeLanguage: "nld",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bes.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bes.png"
    },
    {
      Name: "Bosnia and Herzegovina",
      Alpha2Code: "BA",
      Alpha3Code: "BIH",
      NativeName: "Bosna i Hercegovina",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "44",
      Longitude: "18",
      Area: 51209,
      NumericCode: 70,
      NativeLanguage: "bos",
      CurrencyCode: "BAM",
      CurrencyName: "Bosnia and Herzegovina convertible mark",
      CurrencySymbol: "",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bih.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bih.png"
    },
    {
      Name: "Botswana",
      Alpha2Code: "BW",
      Alpha3Code: "BWA",
      NativeName: "Botswana",
      Region: "Africa",
      SubRegion: "Southern Africa",
      Latitude: "-22",
      Longitude: "24",
      Area: 582000,
      NumericCode: 72,
      NativeLanguage: "eng",
      CurrencyCode: "BWP",
      CurrencyName: "Botswana pula",
      CurrencySymbol: "P",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bwa.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bwa.png"
    },
    {
      Name: "Bouvet Island",
      Alpha2Code: "BV",
      Alpha3Code: "BVT",
      NativeName: "Bouvetøya",
      Region: "",
      SubRegion: "",
      Latitude: "-54.43333333",
      Longitude: "3.4",
      Area: 49,
      NumericCode: 74,
      NativeLanguage: "nor",
      CurrencyCode: "NOK",
      CurrencyName: "Norwegian krone",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bvt.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bvt.png"
    },
    {
      Name: "Brazil",
      Alpha2Code: "BR",
      Alpha3Code: "BRA",
      NativeName: "Brasil",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-10",
      Longitude: "-55",
      Area: 8515767,
      NumericCode: 76,
      NativeLanguage: "por",
      CurrencyCode: "BRL",
      CurrencyName: "Brazilian real",
      CurrencySymbol: "R$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bra.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bra.png"
    },
    {
      Name: "British Indian Ocean Territory",
      Alpha2Code: "IO",
      Alpha3Code: "IOT",
      NativeName: "British Indian Ocean Territory",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-6",
      Longitude: "71.5",
      Area: 60,
      NumericCode: 86,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/iot.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/iot.png"
    },
    {
      Name: "Brunei Darussalam",
      Alpha2Code: "BN",
      Alpha3Code: "BRN",
      NativeName: "Negara Brunei Darussalam",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "4.5",
      Longitude: "114.66666666",
      Area: 5765,
      NumericCode: 96,
      NativeLanguage: "msa",
      CurrencyCode: "BND",
      CurrencyName: "Brunei dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/brn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/brn.png"
    },
    {
      Name: "Bulgaria",
      Alpha2Code: "BG",
      Alpha3Code: "BGR",
      NativeName: "България",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "43",
      Longitude: "25",
      Area: 110879,
      NumericCode: 100,
      NativeLanguage: "bul",
      CurrencyCode: "BGN",
      CurrencyName: "Bulgarian lev",
      CurrencySymbol: "лв",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bgr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bgr.png"
    },
    {
      Name: "Burkina Faso",
      Alpha2Code: "BF",
      Alpha3Code: "BFA",
      NativeName: "Burkina Faso",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "13",
      Longitude: "-2",
      Area: 272967,
      NumericCode: 854,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bfa.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bfa.png"
    },
    {
      Name: "Burundi",
      Alpha2Code: "BI",
      Alpha3Code: "BDI",
      NativeName: "Burundi",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-3.5",
      Longitude: "30",
      Area: 27834,
      NumericCode: 108,
      NativeLanguage: "run",
      CurrencyCode: "BIF",
      CurrencyName: "Burundian franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/bdi.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/bdi.png"
    },
    {
      Name: "Cabo Verde",
      Alpha2Code: "CV",
      Alpha3Code: "CPV",
      NativeName: "Cabo Verde",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "16",
      Longitude: "-24",
      Area: 4033,
      NumericCode: 132,
      NativeLanguage: "por",
      CurrencyCode: "CVE",
      CurrencyName: "Cape Verdean escudo",
      CurrencySymbol: "Esc",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cpv.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cpv.png"
    },
    {
      Name: "Cambodia",
      Alpha2Code: "KH",
      Alpha3Code: "KHM",
      NativeName: "Kâmpŭchéa",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "13",
      Longitude: "105",
      Area: 181035,
      NumericCode: 116,
      NativeLanguage: "khm",
      CurrencyCode: "KHR",
      CurrencyName: "Cambodian riel",
      CurrencySymbol: "៛",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/khm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/khm.png"
    },
    {
      Name: "Cameroon",
      Alpha2Code: "CM",
      Alpha3Code: "CMR",
      NativeName: "Cameroon",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "6",
      Longitude: "12",
      Area: 475442,
      NumericCode: 120,
      NativeLanguage: "fra",
      CurrencyCode: "XAF",
      CurrencyName: "Central African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cmr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cmr.png"
    },
    {
      Name: "Canada",
      Alpha2Code: "CA",
      Alpha3Code: "CAN",
      NativeName: "Canada",
      Region: "Americas",
      SubRegion: "Northern America",
      Latitude: "60",
      Longitude: "-95",
      Area: 9984670,
      NumericCode: 124,
      NativeLanguage: "eng",
      CurrencyCode: "CAD",
      CurrencyName: "Canadian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/can.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/can.png"
    },
    {
      Name: "Cayman Islands",
      Alpha2Code: "KY",
      Alpha3Code: "CYM",
      NativeName: "Cayman Islands",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "19.5",
      Longitude: "-80.5",
      Area: 264,
      NumericCode: 136,
      NativeLanguage: "eng",
      CurrencyCode: "KYD",
      CurrencyName: "Cayman Islands dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cym.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cym.png"
    },
    {
      Name: "Central African Republic",
      Alpha2Code: "CF",
      Alpha3Code: "CAF",
      NativeName: "Ködörösêse tî Bêafrîka",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "7",
      Longitude: "21",
      Area: 622984,
      NumericCode: 140,
      NativeLanguage: "sag",
      CurrencyCode: "XAF",
      CurrencyName: "Central African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/caf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/caf.png"
    },
    {
      Name: "Chad",
      Alpha2Code: "TD",
      Alpha3Code: "TCD",
      NativeName: "Tchad",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "15",
      Longitude: "19",
      Area: 1284000,
      NumericCode: 148,
      NativeLanguage: "ara",
      CurrencyCode: "XAF",
      CurrencyName: "Central African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tcd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tcd.png"
    },
    {
      Name: "Chile",
      Alpha2Code: "CL",
      Alpha3Code: "CHL",
      NativeName: "Chile",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-30",
      Longitude: "-71",
      Area: 756102,
      NumericCode: 152,
      NativeLanguage: "spa",
      CurrencyCode: "CLP",
      CurrencyName: "Chilean peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/chl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/chl.png"
    },
    {
      Name: "China",
      Alpha2Code: "CN",
      Alpha3Code: "CHN",
      NativeName: "中国",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "35",
      Longitude: "105",
      Area: 9640011,
      NumericCode: 156,
      NativeLanguage: "cmn",
      CurrencyCode: "CNY",
      CurrencyName: "Chinese yuan",
      CurrencySymbol: "¥",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/chn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/chn.png"
    },
    {
      Name: "Christmas Island",
      Alpha2Code: "CX",
      Alpha3Code: "CXR",
      NativeName: "Christmas Island",
      Region: "Oceania",
      SubRegion: "Australia and New Zealand",
      Latitude: "-10.5",
      Longitude: "105.66666666",
      Area: 135,
      NumericCode: 162,
      NativeLanguage: "eng",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cxr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cxr.png"
    },
    {
      Name: "Cocos (Keeling) Islands",
      Alpha2Code: "CC",
      Alpha3Code: "CCK",
      NativeName: "Cocos (Keeling) Islands",
      Region: "Oceania",
      SubRegion: "Australia and New Zealand",
      Latitude: "-12.5",
      Longitude: "96.83333333",
      Area: 14,
      NumericCode: 166,
      NativeLanguage: "eng",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cck.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cck.png"
    },
    {
      Name: "Colombia",
      Alpha2Code: "CO",
      Alpha3Code: "COL",
      NativeName: "Colombia",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "4",
      Longitude: "-72",
      Area: 1141748,
      NumericCode: 170,
      NativeLanguage: "spa",
      CurrencyCode: "COP",
      CurrencyName: "Colombian peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/col.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/col.png"
    },
    {
      Name: "Comoros",
      Alpha2Code: "KM",
      Alpha3Code: "COM",
      NativeName: "Komori",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-12.16666666",
      Longitude: "44.25",
      Area: 1862,
      NumericCode: 174,
      NativeLanguage: "zdj",
      CurrencyCode: "KMF",
      CurrencyName: "Comorian franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/com.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/com.png"
    },
    {
      Name: "Congo",
      Alpha2Code: "CG",
      Alpha3Code: "COG",
      NativeName: "République du Congo",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "-1",
      Longitude: "15",
      Area: 342000,
      NumericCode: 178,
      NativeLanguage: "fra",
      CurrencyCode: "XAF",
      CurrencyName: "Central African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cog.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cog.png"
    },
    {
      Name: "Congo (Democratic Republic of the)",
      Alpha2Code: "CD",
      Alpha3Code: "COD",
      NativeName: "République démocratique du Congo",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "0",
      Longitude: "25",
      Area: 2344858,
      NumericCode: 180,
      NativeLanguage: "swa",
      CurrencyCode: "CDF",
      CurrencyName: "Congolese franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cod.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cod.png"
    },
    {
      Name: "Cook Islands",
      Alpha2Code: "CK",
      Alpha3Code: "COK",
      NativeName: "Cook Islands",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-21.23333333",
      Longitude: "-159.76666666",
      Area: 236,
      NumericCode: 184,
      NativeLanguage: "eng",
      CurrencyCode: "NZD",
      CurrencyName: "New Zealand dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cok.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cok.png"
    },
    {
      Name: "Costa Rica",
      Alpha2Code: "CR",
      Alpha3Code: "CRI",
      NativeName: "Costa Rica",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "10",
      Longitude: "-84",
      Area: 51100,
      NumericCode: 188,
      NativeLanguage: "spa",
      CurrencyCode: "CRC",
      CurrencyName: "Costa Rican colón",
      CurrencySymbol: "₡",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cri.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cri.png"
    },
    {
      Name: "Côte d'Ivoire",
      Alpha2Code: "CI",
      Alpha3Code: "CIV",
      NativeName: "Côte d'Ivoire",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "8",
      Longitude: "-5",
      Area: 322463,
      NumericCode: 384,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/civ.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/civ.png"
    },
    {
      Name: "Croatia",
      Alpha2Code: "HR",
      Alpha3Code: "HRV",
      NativeName: "Hrvatska",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "45.16666666",
      Longitude: "15.5",
      Area: 56594,
      NumericCode: 191,
      NativeLanguage: "hrv",
      CurrencyCode: "HRK",
      CurrencyName: "Croatian kuna",
      CurrencySymbol: "kn",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/hrv.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/hrv.png"
    },
    {
      Name: "Cuba",
      Alpha2Code: "CU",
      Alpha3Code: "CUB",
      NativeName: "Cuba",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "21.5",
      Longitude: "-80",
      Area: 109884,
      NumericCode: 192,
      NativeLanguage: "spa",
      CurrencyCode: "CUC",
      CurrencyName: "Cuban convertible peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cub.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cub.png"
    },
    {
      Name: "Curaçao",
      Alpha2Code: "CW",
      Alpha3Code: "CUW",
      NativeName: "Curaçao",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "12.116667",
      Longitude: "-68.933333",
      Area: 444,
      NumericCode: 531,
      NativeLanguage: "nld",
      CurrencyCode: "ANG",
      CurrencyName: "Netherlands Antillean guilder",
      CurrencySymbol: "ƒ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cuw.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cuw.png"
    },
    {
      Name: "Cyprus",
      Alpha2Code: "CY",
      Alpha3Code: "CYP",
      NativeName: "Κύπρος",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "35",
      Longitude: "33",
      Area: 9251,
      NumericCode: 196,
      NativeLanguage: "ell",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cyp.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cyp.png"
    },
    {
      Name: "Czech Republic",
      Alpha2Code: "CZ",
      Alpha3Code: "CZE",
      NativeName: "Česká republika",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "49.75",
      Longitude: "15.5",
      Area: 78865,
      NumericCode: 203,
      NativeLanguage: "ces",
      CurrencyCode: "CZK",
      CurrencyName: "Czech koruna",
      CurrencySymbol: "Kč",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/cze.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/cze.png"
    },
    {
      Name: "Denmark",
      Alpha2Code: "DK",
      Alpha3Code: "DNK",
      NativeName: "Danmark",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "56",
      Longitude: "10",
      Area: 43094,
      NumericCode: 208,
      NativeLanguage: "dan",
      CurrencyCode: "DKK",
      CurrencyName: "Danish krone",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/dnk.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/dnk.png"
    },
    {
      Name: "Djibouti",
      Alpha2Code: "DJ",
      Alpha3Code: "DJI",
      NativeName: "Djibouti",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "11.5",
      Longitude: "43",
      Area: 23200,
      NumericCode: 262,
      NativeLanguage: "ara",
      CurrencyCode: "DJF",
      CurrencyName: "Djiboutian franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/dji.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/dji.png"
    },
    {
      Name: "Dominica",
      Alpha2Code: "DM",
      Alpha3Code: "DMA",
      NativeName: "Dominica",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "15.41666666",
      Longitude: "-61.33333333",
      Area: 751,
      NumericCode: 212,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/dma.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/dma.png"
    },
    {
      Name: "Dominican Republic",
      Alpha2Code: "DO",
      Alpha3Code: "DOM",
      NativeName: "República Dominicana",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "19",
      Longitude: "-70.66666666",
      Area: 48671,
      NumericCode: 214,
      NativeLanguage: "spa",
      CurrencyCode: "DOP",
      CurrencyName: "Dominican peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/dom.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/dom.png"
    },
    {
      Name: "Ecuador",
      Alpha2Code: "EC",
      Alpha3Code: "ECU",
      NativeName: "Ecuador",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-2",
      Longitude: "-77.5",
      Area: 276841,
      NumericCode: 218,
      NativeLanguage: "spa",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ecu.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ecu.png"
    },
    {
      Name: "Egypt",
      Alpha2Code: "EG",
      Alpha3Code: "EGY",
      NativeName: "مصر‎",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "27",
      Longitude: "30",
      Area: 1002450,
      NumericCode: 818,
      NativeLanguage: "ara",
      CurrencyCode: "EGP",
      CurrencyName: "Egyptian pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/egy.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/egy.png"
    },
    {
      Name: "El Salvador",
      Alpha2Code: "SV",
      Alpha3Code: "SLV",
      NativeName: "El Salvador",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "13.83333333",
      Longitude: "-88.91666666",
      Area: 21041,
      NumericCode: 222,
      NativeLanguage: "spa",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/slv.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/slv.png"
    },
    {
      Name: "Equatorial Guinea",
      Alpha2Code: "GQ",
      Alpha3Code: "GNQ",
      NativeName: "Guinea Ecuatorial",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "2",
      Longitude: "10",
      Area: 28051,
      NumericCode: 226,
      NativeLanguage: "spa",
      CurrencyCode: "XAF",
      CurrencyName: "Central African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gnq.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gnq.png"
    },
    {
      Name: "Eritrea",
      Alpha2Code: "ER",
      Alpha3Code: "ERI",
      NativeName: "ኤርትራ",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "15",
      Longitude: "39",
      Area: 117600,
      NumericCode: 232,
      NativeLanguage: "tir",
      CurrencyCode: "ERN",
      CurrencyName: "Eritrean nakfa",
      CurrencySymbol: "Nfk",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/eri.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/eri.png"
    },
    {
      Name: "Estonia",
      Alpha2Code: "EE",
      Alpha3Code: "EST",
      NativeName: "Eesti",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "59",
      Longitude: "26",
      Area: 45227,
      NumericCode: 233,
      NativeLanguage: "est",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/est.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/est.png"
    },
    {
      Name: "Ethiopia",
      Alpha2Code: "ET",
      Alpha3Code: "ETH",
      NativeName: "ኢትዮጵያ",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "8",
      Longitude: "38",
      Area: 1104300,
      NumericCode: 231,
      NativeLanguage: "amh",
      CurrencyCode: "ETB",
      CurrencyName: "Ethiopian birr",
      CurrencySymbol: "Br",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/eth.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/eth.png"
    },
    {
      Name: "Falkland Islands (Malvinas)",
      Alpha2Code: "FK",
      Alpha3Code: "FLK",
      NativeName: "Falkland Islands",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-51.75",
      Longitude: "-59",
      Area: 12173,
      NumericCode: 238,
      NativeLanguage: "eng",
      CurrencyCode: "FKP",
      CurrencyName: "Falkland Islands pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/flk.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/flk.png"
    },
    {
      Name: "Faroe Islands",
      Alpha2Code: "FO",
      Alpha3Code: "FRO",
      NativeName: "Føroyar",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "62",
      Longitude: "-7",
      Area: 1393,
      NumericCode: 234,
      NativeLanguage: "fao",
      CurrencyCode: "DKK",
      CurrencyName: "Danish krone",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/fro.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/fro.png"
    },
    {
      Name: "Fiji",
      Alpha2Code: "FJ",
      Alpha3Code: "FJI",
      NativeName: "Fiji",
      Region: "Oceania",
      SubRegion: "Melanesia",
      Latitude: "-18",
      Longitude: "175",
      Area: 18272,
      NumericCode: 242,
      NativeLanguage: "eng",
      CurrencyCode: "FJD",
      CurrencyName: "Fijian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/fji.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/fji.png"
    },
    {
      Name: "Finland",
      Alpha2Code: "FI",
      Alpha3Code: "FIN",
      NativeName: "Suomi",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "64",
      Longitude: "26",
      Area: 338424,
      NumericCode: 246,
      NativeLanguage: "fin",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/fin.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/fin.png"
    },
    {
      Name: "France",
      Alpha2Code: "FR",
      Alpha3Code: "FRA",
      NativeName: "France",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "46",
      Longitude: "2",
      Area: 640679,
      NumericCode: 250,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/fra.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/fra.png"
    },
    {
      Name: "French Guiana",
      Alpha2Code: "GF",
      Alpha3Code: "GUF",
      NativeName: "Guyane française",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "4",
      Longitude: "-53",
      Area: null,
      NumericCode: 254,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/guf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/guf.png"
    },
    {
      Name: "French Polynesia",
      Alpha2Code: "PF",
      Alpha3Code: "PYF",
      NativeName: "Polynésie française",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-15",
      Longitude: "-140",
      Area: 4167,
      NumericCode: 258,
      NativeLanguage: "fra",
      CurrencyCode: "XPF",
      CurrencyName: "CFP franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pyf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pyf.png"
    },
    {
      Name: "French Southern Territories",
      Alpha2Code: "TF",
      Alpha3Code: "ATF",
      NativeName: "Territoire des Terres australes et antarctiques françaises",
      Region: "Africa",
      SubRegion: "Southern Africa",
      Latitude: "-49.25",
      Longitude: "69.167",
      Area: 7747,
      NumericCode: 260,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/atf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/atf.png"
    },
    {
      Name: "Gabon",
      Alpha2Code: "GA",
      Alpha3Code: "GAB",
      NativeName: "Gabon",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "-1",
      Longitude: "11.75",
      Area: 267668,
      NumericCode: 266,
      NativeLanguage: "fra",
      CurrencyCode: "XAF",
      CurrencyName: "Central African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gab.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gab.png"
    },
    {
      Name: "Gambia",
      Alpha2Code: "GM",
      Alpha3Code: "GMB",
      NativeName: "Gambia",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "13.46666666",
      Longitude: "-16.56666666",
      Area: 11295,
      NumericCode: 270,
      NativeLanguage: "eng",
      CurrencyCode: "GMD",
      CurrencyName: "Gambian dalasi",
      CurrencySymbol: "D",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gmb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gmb.png"
    },
    {
      Name: "Georgia",
      Alpha2Code: "GE",
      Alpha3Code: "GEO",
      NativeName: "საქართველო",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "42",
      Longitude: "43.5",
      Area: 69700,
      NumericCode: 268,
      NativeLanguage: "kat",
      CurrencyCode: "GEL",
      CurrencyName: "Georgian Lari",
      CurrencySymbol: "ლ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/geo.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/geo.png"
    },
    {
      Name: "Germany",
      Alpha2Code: "DE",
      Alpha3Code: "DEU",
      NativeName: "Deutschland",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "51",
      Longitude: "9",
      Area: 357114,
      NumericCode: 276,
      NativeLanguage: "deu",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/deu.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/deu.png"
    },
    {
      Name: "Ghana",
      Alpha2Code: "GH",
      Alpha3Code: "GHA",
      NativeName: "Ghana",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "8",
      Longitude: "-2",
      Area: 238533,
      NumericCode: 288,
      NativeLanguage: "eng",
      CurrencyCode: "GHS",
      CurrencyName: "Ghanaian cedi",
      CurrencySymbol: "₵",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gha.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gha.png"
    },
    {
      Name: "Gibraltar",
      Alpha2Code: "GI",
      Alpha3Code: "GIB",
      NativeName: "Gibraltar",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "36.13333333",
      Longitude: "-5.35",
      Area: 6,
      NumericCode: 292,
      NativeLanguage: "eng",
      CurrencyCode: "GIP",
      CurrencyName: "Gibraltar pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gib.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gib.png"
    },
    {
      Name: "Greece",
      Alpha2Code: "GR",
      Alpha3Code: "GRC",
      NativeName: "Ελλάδα",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "39",
      Longitude: "22",
      Area: 131990,
      NumericCode: 300,
      NativeLanguage: "ell",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/grc.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/grc.png"
    },
    {
      Name: "Greenland",
      Alpha2Code: "GL",
      Alpha3Code: "GRL",
      NativeName: "Kalaallit Nunaat",
      Region: "Americas",
      SubRegion: "Northern America",
      Latitude: "72",
      Longitude: "-40",
      Area: 2166086,
      NumericCode: 304,
      NativeLanguage: "kal",
      CurrencyCode: "DKK",
      CurrencyName: "Danish krone",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/grl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/grl.png"
    },
    {
      Name: "Grenada",
      Alpha2Code: "GD",
      Alpha3Code: "GRD",
      NativeName: "Grenada",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "12.11666666",
      Longitude: "-61.66666666",
      Area: 344,
      NumericCode: 308,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/grd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/grd.png"
    },
    {
      Name: "Guadeloupe",
      Alpha2Code: "GP",
      Alpha3Code: "GLP",
      NativeName: "Guadeloupe",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "16.25",
      Longitude: "-61.583333",
      Area: null,
      NumericCode: 312,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/glp.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/glp.png"
    },
    {
      Name: "Guam",
      Alpha2Code: "GU",
      Alpha3Code: "GUM",
      NativeName: "Guam",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "13.46666666",
      Longitude: "144.78333333",
      Area: 549,
      NumericCode: 316,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gum.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gum.png"
    },
    {
      Name: "Guatemala",
      Alpha2Code: "GT",
      Alpha3Code: "GTM",
      NativeName: "Guatemala",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "15.5",
      Longitude: "-90.25",
      Area: 108889,
      NumericCode: 320,
      NativeLanguage: "spa",
      CurrencyCode: "GTQ",
      CurrencyName: "Guatemalan quetzal",
      CurrencySymbol: "Q",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gtm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gtm.png"
    },
    {
      Name: "Guernsey",
      Alpha2Code: "GG",
      Alpha3Code: "GGY",
      NativeName: "Guernsey",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "49.46666666",
      Longitude: "-2.58333333",
      Area: 78,
      NumericCode: 831,
      NativeLanguage: "eng",
      CurrencyCode: "GBP",
      CurrencyName: "British pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ggy.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ggy.png"
    },
    {
      Name: "Guinea",
      Alpha2Code: "GN",
      Alpha3Code: "GIN",
      NativeName: "Guinée",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "11",
      Longitude: "-10",
      Area: 245857,
      NumericCode: 324,
      NativeLanguage: "fra",
      CurrencyCode: "GNF",
      CurrencyName: "Guinean franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gin.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gin.png"
    },
    {
      Name: "Guinea-Bissau",
      Alpha2Code: "GW",
      Alpha3Code: "GNB",
      NativeName: "Guiné-Bissau",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "12",
      Longitude: "-15",
      Area: 36125,
      NumericCode: 624,
      NativeLanguage: "por",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gnb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gnb.png"
    },
    {
      Name: "Guyana",
      Alpha2Code: "GY",
      Alpha3Code: "GUY",
      NativeName: "Guyana",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "5",
      Longitude: "-59",
      Area: 214969,
      NumericCode: 328,
      NativeLanguage: "eng",
      CurrencyCode: "GYD",
      CurrencyName: "Guyanese dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/guy.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/guy.png"
    },
    {
      Name: "Haiti",
      Alpha2Code: "HT",
      Alpha3Code: "HTI",
      NativeName: "Haïti",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "19",
      Longitude: "-72.41666666",
      Area: 27750,
      NumericCode: 332,
      NativeLanguage: "fra",
      CurrencyCode: "HTG",
      CurrencyName: "Haitian gourde",
      CurrencySymbol: "G",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/hti.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/hti.png"
    },
    {
      Name: "Heard Island and McDonald Islands",
      Alpha2Code: "HM",
      Alpha3Code: "HMD",
      NativeName: "Heard Island and McDonald Islands",
      Region: "",
      SubRegion: "",
      Latitude: "-53.1",
      Longitude: "72.51666666",
      Area: 412,
      NumericCode: 334,
      NativeLanguage: "eng",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/hmd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/hmd.png"
    },
    {
      Name: "Holy See",
      Alpha2Code: "VA",
      Alpha3Code: "VAT",
      NativeName: "Sancta Sedes",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "41.9",
      Longitude: "12.45",
      Area: 0,
      NumericCode: 336,
      NativeLanguage: "ita",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/vat.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/vat.png"
    },
    {
      Name: "Honduras",
      Alpha2Code: "HN",
      Alpha3Code: "HND",
      NativeName: "Honduras",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "15",
      Longitude: "-86.5",
      Area: 112492,
      NumericCode: 340,
      NativeLanguage: "spa",
      CurrencyCode: "HNL",
      CurrencyName: "Honduran lempira",
      CurrencySymbol: "L",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/hnd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/hnd.png"
    },
    {
      Name: "Hong Kong",
      Alpha2Code: "HK",
      Alpha3Code: "HKG",
      NativeName: "香港",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "22.25",
      Longitude: "114.16666666",
      Area: 1104,
      NumericCode: 344,
      NativeLanguage: "zho",
      CurrencyCode: "HKD",
      CurrencyName: "Hong Kong dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/hkg.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/hkg.png"
    },
    {
      Name: "Hungary",
      Alpha2Code: "HU",
      Alpha3Code: "HUN",
      NativeName: "Magyarország",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "47",
      Longitude: "20",
      Area: 93028,
      NumericCode: 348,
      NativeLanguage: "hun",
      CurrencyCode: "HUF",
      CurrencyName: "Hungarian forint",
      CurrencySymbol: "Ft",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/hun.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/hun.png"
    },
    {
      Name: "Iceland",
      Alpha2Code: "IS",
      Alpha3Code: "ISL",
      NativeName: "Ísland",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "65",
      Longitude: "-18",
      Area: 103000,
      NumericCode: 352,
      NativeLanguage: "isl",
      CurrencyCode: "ISK",
      CurrencyName: "Icelandic króna",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/isl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/isl.png"
    },
    {
      Name: "India",
      Alpha2Code: "IN",
      Alpha3Code: "IND",
      NativeName: "भारत",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "20",
      Longitude: "77",
      Area: 3287590,
      NumericCode: 356,
      NativeLanguage: "hin",
      CurrencyCode: "INR",
      CurrencyName: "Indian rupee",
      CurrencySymbol: "₹",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ind.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ind.png"
    },
    {
      Name: "Indonesia",
      Alpha2Code: "ID",
      Alpha3Code: "IDN",
      NativeName: "Indonesia",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "-5",
      Longitude: "120",
      Area: 1904569,
      NumericCode: 360,
      NativeLanguage: "ind",
      CurrencyCode: "IDR",
      CurrencyName: "Indonesian rupiah",
      CurrencySymbol: "Rp",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/idn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/idn.png"
    },
    {
      Name: "Iran (Islamic Republic of)",
      Alpha2Code: "IR",
      Alpha3Code: "IRN",
      NativeName: "ایران",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "32",
      Longitude: "53",
      Area: 1648195,
      NumericCode: 364,
      NativeLanguage: "fas",
      CurrencyCode: "IRR",
      CurrencyName: "Iranian rial",
      CurrencySymbol: "﷼",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/irn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/irn.png"
    },
    {
      Name: "Iraq",
      Alpha2Code: "IQ",
      Alpha3Code: "IRQ",
      NativeName: "العراق",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "33",
      Longitude: "44",
      Area: 438317,
      NumericCode: 368,
      NativeLanguage: "ara",
      CurrencyCode: "IQD",
      CurrencyName: "Iraqi dinar",
      CurrencySymbol: "ع.د",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/irq.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/irq.png"
    },
    {
      Name: "Ireland",
      Alpha2Code: "IE",
      Alpha3Code: "IRL",
      NativeName: "Éire",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "53",
      Longitude: "-8",
      Area: 70273,
      NumericCode: 372,
      NativeLanguage: "gle",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/irl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/irl.png"
    },
    {
      Name: "Isle of Man",
      Alpha2Code: "IM",
      Alpha3Code: "IMN",
      NativeName: "Isle of Man",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "54.25",
      Longitude: "-4.5",
      Area: 572,
      NumericCode: 833,
      NativeLanguage: "eng",
      CurrencyCode: "GBP",
      CurrencyName: "British pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/imn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/imn.png"
    },
    {
      Name: "Israel",
      Alpha2Code: "IL",
      Alpha3Code: "ISR",
      NativeName: "יִשְׂרָאֵל",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "31.5",
      Longitude: "34.75",
      Area: 20770,
      NumericCode: 376,
      NativeLanguage: "heb",
      CurrencyCode: "ILS",
      CurrencyName: "Israeli new shekel",
      CurrencySymbol: "₪",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/isr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/isr.png"
    },
    {
      Name: "Italy",
      Alpha2Code: "IT",
      Alpha3Code: "ITA",
      NativeName: "Italia",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "42.83333333",
      Longitude: "12.83333333",
      Area: 301336,
      NumericCode: 380,
      NativeLanguage: "ita",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ita.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ita.png"
    },
    {
      Name: "Jamaica",
      Alpha2Code: "JM",
      Alpha3Code: "JAM",
      NativeName: "Jamaica",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.25",
      Longitude: "-77.5",
      Area: 10991,
      NumericCode: 388,
      NativeLanguage: "eng",
      CurrencyCode: "JMD",
      CurrencyName: "Jamaican dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/jam.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/jam.png"
    },
    {
      Name: "Japan",
      Alpha2Code: "JP",
      Alpha3Code: "JPN",
      NativeName: "日本",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "36",
      Longitude: "138",
      Area: 377930,
      NumericCode: 392,
      NativeLanguage: "jpn",
      CurrencyCode: "JPY",
      CurrencyName: "Japanese yen",
      CurrencySymbol: "¥",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/jpn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/jpn.png"
    },
    {
      Name: "Jersey",
      Alpha2Code: "JE",
      Alpha3Code: "JEY",
      NativeName: "Jersey",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "49.25",
      Longitude: "-2.16666666",
      Area: 116,
      NumericCode: 832,
      NativeLanguage: "eng",
      CurrencyCode: "GBP",
      CurrencyName: "British pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/jey.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/jey.png"
    },
    {
      Name: "Jordan",
      Alpha2Code: "JO",
      Alpha3Code: "JOR",
      NativeName: "الأردن",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "31",
      Longitude: "36",
      Area: 89342,
      NumericCode: 400,
      NativeLanguage: "ara",
      CurrencyCode: "JOD",
      CurrencyName: "Jordanian dinar",
      CurrencySymbol: "د.ا",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/jor.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/jor.png"
    },
    {
      Name: "Kazakhstan",
      Alpha2Code: "KZ",
      Alpha3Code: "KAZ",
      NativeName: "Қазақстан",
      Region: "Asia",
      SubRegion: "Central Asia",
      Latitude: "48",
      Longitude: "68",
      Area: 2724900,
      NumericCode: 398,
      NativeLanguage: "kaz",
      CurrencyCode: "KZT",
      CurrencyName: "Kazakhstani tenge",
      CurrencySymbol: "",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kaz.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kaz.png"
    },
    {
      Name: "Kenya",
      Alpha2Code: "KE",
      Alpha3Code: "KEN",
      NativeName: "Kenya",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "1",
      Longitude: "38",
      Area: 580367,
      NumericCode: 404,
      NativeLanguage: "swa",
      CurrencyCode: "KES",
      CurrencyName: "Kenyan shilling",
      CurrencySymbol: "Sh",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ken.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ken.png"
    },
    {
      Name: "Kiribati",
      Alpha2Code: "KI",
      Alpha3Code: "KIR",
      NativeName: "Kiribati",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "1.41666666",
      Longitude: "173",
      Area: 811,
      NumericCode: 296,
      NativeLanguage: "eng",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kir.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kir.png"
    },
    {
      Name: "Korea (Democratic People's Republic of)",
      Alpha2Code: "KP",
      Alpha3Code: "PRK",
      NativeName: "북한",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "40",
      Longitude: "127",
      Area: 120538,
      NumericCode: 408,
      NativeLanguage: "kor",
      CurrencyCode: "KPW",
      CurrencyName: "North Korean won",
      CurrencySymbol: "₩",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/prk.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/prk.png"
    },
    {
      Name: "Korea (Republic of)",
      Alpha2Code: "KR",
      Alpha3Code: "KOR",
      NativeName: "대한민국",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "37",
      Longitude: "127.5",
      Area: 100210,
      NumericCode: 410,
      NativeLanguage: "kor",
      CurrencyCode: "KRW",
      CurrencyName: "South Korean won",
      CurrencySymbol: "₩",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kor.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kor.png"
    },
    {
      Name: "Kuwait",
      Alpha2Code: "KW",
      Alpha3Code: "KWT",
      NativeName: "الكويت",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "29.5",
      Longitude: "45.75",
      Area: 17818,
      NumericCode: 414,
      NativeLanguage: "ara",
      CurrencyCode: "KWD",
      CurrencyName: "Kuwaiti dinar",
      CurrencySymbol: "د.ك",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kwt.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kwt.png"
    },
    {
      Name: "Kyrgyzstan",
      Alpha2Code: "KG",
      Alpha3Code: "KGZ",
      NativeName: "Кыргызстан",
      Region: "Asia",
      SubRegion: "Central Asia",
      Latitude: "41",
      Longitude: "75",
      Area: 199951,
      NumericCode: 417,
      NativeLanguage: "kir",
      CurrencyCode: "KGS",
      CurrencyName: "Kyrgyzstani som",
      CurrencySymbol: "с",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kgz.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kgz.png"
    },
    {
      Name: "Lao People's Democratic Republic",
      Alpha2Code: "LA",
      Alpha3Code: "LAO",
      NativeName: "ສປປລາວ",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "18",
      Longitude: "105",
      Area: 236800,
      NumericCode: 418,
      NativeLanguage: "lao",
      CurrencyCode: "LAK",
      CurrencyName: "Lao kip",
      CurrencySymbol: "₭",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lao.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lao.png"
    },
    {
      Name: "Latvia",
      Alpha2Code: "LV",
      Alpha3Code: "LVA",
      NativeName: "Latvija",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "57",
      Longitude: "25",
      Area: 64559,
      NumericCode: 428,
      NativeLanguage: "lav",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lva.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lva.png"
    },
    {
      Name: "Lebanon",
      Alpha2Code: "LB",
      Alpha3Code: "LBN",
      NativeName: "لبنان",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "33.83333333",
      Longitude: "35.83333333",
      Area: 10452,
      NumericCode: 422,
      NativeLanguage: "ara",
      CurrencyCode: "LBP",
      CurrencyName: "Lebanese pound",
      CurrencySymbol: "ل.ل",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lbn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lbn.png"
    },
    {
      Name: "Lesotho",
      Alpha2Code: "LS",
      Alpha3Code: "LSO",
      NativeName: "Lesotho",
      Region: "Africa",
      SubRegion: "Southern Africa",
      Latitude: "-29.5",
      Longitude: "28.5",
      Area: 30355,
      NumericCode: 426,
      NativeLanguage: "sot",
      CurrencyCode: "LSL",
      CurrencyName: "Lesotho loti",
      CurrencySymbol: "L",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lso.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lso.png"
    },
    {
      Name: "Liberia",
      Alpha2Code: "LR",
      Alpha3Code: "LBR",
      NativeName: "Liberia",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "6.5",
      Longitude: "-9.5",
      Area: 111369,
      NumericCode: 430,
      NativeLanguage: "eng",
      CurrencyCode: "LRD",
      CurrencyName: "Liberian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lbr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lbr.png"
    },
    {
      Name: "Libya",
      Alpha2Code: "LY",
      Alpha3Code: "LBY",
      NativeName: "‏ليبيا",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "25",
      Longitude: "17",
      Area: 1759540,
      NumericCode: 434,
      NativeLanguage: "ara",
      CurrencyCode: "LYD",
      CurrencyName: "Libyan dinar",
      CurrencySymbol: "ل.د",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lby.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lby.png"
    },
    {
      Name: "Liechtenstein",
      Alpha2Code: "LI",
      Alpha3Code: "LIE",
      NativeName: "Liechtenstein",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "47.26666666",
      Longitude: "9.53333333",
      Area: 160,
      NumericCode: 438,
      NativeLanguage: "deu",
      CurrencyCode: "CHF",
      CurrencyName: "Swiss franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lie.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lie.png"
    },
    {
      Name: "Lithuania",
      Alpha2Code: "LT",
      Alpha3Code: "LTU",
      NativeName: "Lietuva",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "56",
      Longitude: "24",
      Area: 65300,
      NumericCode: 440,
      NativeLanguage: "lit",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ltu.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ltu.png"
    },
    {
      Name: "Luxembourg",
      Alpha2Code: "LU",
      Alpha3Code: "LUX",
      NativeName: "Luxembourg",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "49.75",
      Longitude: "6.16666666",
      Area: 2586,
      NumericCode: 442,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lux.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lux.png"
    },
    {
      Name: "Macao",
      Alpha2Code: "MO",
      Alpha3Code: "MAC",
      NativeName: "澳門",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "22.16666666",
      Longitude: "113.55",
      Area: 30,
      NumericCode: 446,
      NativeLanguage: "zho",
      CurrencyCode: "MOP",
      CurrencyName: "Macanese pataca",
      CurrencySymbol: "P",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mac.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mac.png"
    },
    {
      Name: "Macedonia (the former Yugoslav Republic of)",
      Alpha2Code: "MK",
      Alpha3Code: "MKD",
      NativeName: "Македонија",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "41.83333333",
      Longitude: "22",
      Area: 25713,
      NumericCode: 807,
      NativeLanguage: "mkd",
      CurrencyCode: "MKD",
      CurrencyName: "Macedonian denar",
      CurrencySymbol: "ден",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mkd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mkd.png"
    },
    {
      Name: "Madagascar",
      Alpha2Code: "MG",
      Alpha3Code: "MDG",
      NativeName: "Madagasikara",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-20",
      Longitude: "47",
      Area: 587041,
      NumericCode: 450,
      NativeLanguage: "fra",
      CurrencyCode: "MGA",
      CurrencyName: "Malagasy ariary",
      CurrencySymbol: "Ar",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mdg.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mdg.png"
    },
    {
      Name: "Malawi",
      Alpha2Code: "MW",
      Alpha3Code: "MWI",
      NativeName: "Malawi",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-13.5",
      Longitude: "34",
      Area: 118484,
      NumericCode: 454,
      NativeLanguage: "nya",
      CurrencyCode: "MWK",
      CurrencyName: "Malawian kwacha",
      CurrencySymbol: "MK",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mwi.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mwi.png"
    },
    {
      Name: "Malaysia",
      Alpha2Code: "MY",
      Alpha3Code: "MYS",
      NativeName: "Malaysia",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "2.5",
      Longitude: "112.5",
      Area: 330803,
      NumericCode: 458,
      NativeLanguage: "msa",
      CurrencyCode: "MYR",
      CurrencyName: "Malaysian ringgit",
      CurrencySymbol: "RM",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mys.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mys.png"
    },
    {
      Name: "Maldives",
      Alpha2Code: "MV",
      Alpha3Code: "MDV",
      NativeName: "Maldives",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "3.25",
      Longitude: "73",
      Area: 300,
      NumericCode: 462,
      NativeLanguage: "div",
      CurrencyCode: "MVR",
      CurrencyName: "Maldivian rufiyaa",
      CurrencySymbol: ".ރ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mdv.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mdv.png"
    },
    {
      Name: "Mali",
      Alpha2Code: "ML",
      Alpha3Code: "MLI",
      NativeName: "Mali",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "17",
      Longitude: "-4",
      Area: 1240192,
      NumericCode: 466,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mli.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mli.png"
    },
    {
      Name: "Malta",
      Alpha2Code: "MT",
      Alpha3Code: "MLT",
      NativeName: "Malta",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "35.83333333",
      Longitude: "14.58333333",
      Area: 316,
      NumericCode: 470,
      NativeLanguage: "mlt",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mlt.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mlt.png"
    },
    {
      Name: "Marshall Islands",
      Alpha2Code: "MH",
      Alpha3Code: "MHL",
      NativeName: "M̧ajeļ",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "9",
      Longitude: "168",
      Area: 181,
      NumericCode: 584,
      NativeLanguage: "mah",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mhl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mhl.png"
    },
    {
      Name: "Martinique",
      Alpha2Code: "MQ",
      Alpha3Code: "MTQ",
      NativeName: "Martinique",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "14.666667",
      Longitude: "-61",
      Area: null,
      NumericCode: 474,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mtq.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mtq.png"
    },
    {
      Name: "Mauritania",
      Alpha2Code: "MR",
      Alpha3Code: "MRT",
      NativeName: "موريتانيا",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "20",
      Longitude: "-12",
      Area: 1030700,
      NumericCode: 478,
      NativeLanguage: "ara",
      CurrencyCode: "MRO",
      CurrencyName: "Mauritanian ouguiya",
      CurrencySymbol: "UM",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mrt.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mrt.png"
    },
    {
      Name: "Mauritius",
      Alpha2Code: "MU",
      Alpha3Code: "MUS",
      NativeName: "Maurice",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-20.28333333",
      Longitude: "57.55",
      Area: 2040,
      NumericCode: 480,
      NativeLanguage: "mfe",
      CurrencyCode: "MUR",
      CurrencyName: "Mauritian rupee",
      CurrencySymbol: "₨",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mus.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mus.png"
    },
    {
      Name: "Mayotte",
      Alpha2Code: "YT",
      Alpha3Code: "MYT",
      NativeName: "Mayotte",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-12.83333333",
      Longitude: "45.16666666",
      Area: null,
      NumericCode: 175,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/myt.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/myt.png"
    },
    {
      Name: "Mexico",
      Alpha2Code: "MX",
      Alpha3Code: "MEX",
      NativeName: "México",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "23",
      Longitude: "-102",
      Area: 1964375,
      NumericCode: 484,
      NativeLanguage: "spa",
      CurrencyCode: "MXN",
      CurrencyName: "Mexican peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mex.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mex.png"
    },
    {
      Name: "Micronesia (Federated States of)",
      Alpha2Code: "FM",
      Alpha3Code: "FSM",
      NativeName: "Micronesia",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "6.91666666",
      Longitude: "158.25",
      Area: 702,
      NumericCode: 583,
      NativeLanguage: "eng",
      CurrencyCode: "",
      CurrencyName: "[D]",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/fsm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/fsm.png"
    },
    {
      Name: "Moldova (Republic of)",
      Alpha2Code: "MD",
      Alpha3Code: "MDA",
      NativeName: "Moldova",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "47",
      Longitude: "29",
      Area: 33846,
      NumericCode: 498,
      NativeLanguage: "ron",
      CurrencyCode: "MDL",
      CurrencyName: "Moldovan leu",
      CurrencySymbol: "L",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mda.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mda.png"
    },
    {
      Name: "Monaco",
      Alpha2Code: "MC",
      Alpha3Code: "MCO",
      NativeName: "Monaco",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "43.73333333",
      Longitude: "7.4",
      Area: 2,
      NumericCode: 492,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mco.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mco.png"
    },
    {
      Name: "Mongolia",
      Alpha2Code: "MN",
      Alpha3Code: "MNG",
      NativeName: "Монгол улс",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "46",
      Longitude: "105",
      Area: 1564110,
      NumericCode: 496,
      NativeLanguage: "mon",
      CurrencyCode: "MNT",
      CurrencyName: "Mongolian tögrög",
      CurrencySymbol: "₮",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mng.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mng.png"
    },
    {
      Name: "Montenegro",
      Alpha2Code: "ME",
      Alpha3Code: "MNE",
      NativeName: "Црна Гора",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "42.5",
      Longitude: "19.3",
      Area: 13812,
      NumericCode: 499,
      NativeLanguage: "srp",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mne.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mne.png"
    },
    {
      Name: "Montserrat",
      Alpha2Code: "MS",
      Alpha3Code: "MSR",
      NativeName: "Montserrat",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "16.75",
      Longitude: "-62.2",
      Area: 102,
      NumericCode: 500,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/msr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/msr.png"
    },
    {
      Name: "Morocco",
      Alpha2Code: "MA",
      Alpha3Code: "MAR",
      NativeName: "المغرب",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "32",
      Longitude: "-5",
      Area: 446550,
      NumericCode: 504,
      NativeLanguage: "ara",
      CurrencyCode: "MAD",
      CurrencyName: "Moroccan dirham",
      CurrencySymbol: "د.م.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mar.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mar.png"
    },
    {
      Name: "Mozambique",
      Alpha2Code: "MZ",
      Alpha3Code: "MOZ",
      NativeName: "Moçambique",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-18.25",
      Longitude: "35",
      Area: 801590,
      NumericCode: 508,
      NativeLanguage: "por",
      CurrencyCode: "MZN",
      CurrencyName: "Mozambican metical",
      CurrencySymbol: "MT",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/moz.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/moz.png"
    },
    {
      Name: "Myanmar",
      Alpha2Code: "MM",
      Alpha3Code: "MMR",
      NativeName: "Myanma",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "22",
      Longitude: "98",
      Area: 676578,
      NumericCode: 104,
      NativeLanguage: "mya",
      CurrencyCode: "MMK",
      CurrencyName: "Burmese kyat",
      CurrencySymbol: "Ks",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mmr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mmr.png"
    },
    {
      Name: "Namibia",
      Alpha2Code: "NA",
      Alpha3Code: "NAM",
      NativeName: "Namibia",
      Region: "Africa",
      SubRegion: "Southern Africa",
      Latitude: "-22",
      Longitude: "17",
      Area: 825615,
      NumericCode: 516,
      NativeLanguage: "afr",
      CurrencyCode: "NAD",
      CurrencyName: "Namibian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nam.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nam.png"
    },
    {
      Name: "Nauru",
      Alpha2Code: "NR",
      Alpha3Code: "NRU",
      NativeName: "Nauru",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "-0.53333333",
      Longitude: "166.91666666",
      Area: 21,
      NumericCode: 520,
      NativeLanguage: "nau",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nru.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nru.png"
    },
    {
      Name: "Nepal",
      Alpha2Code: "NP",
      Alpha3Code: "NPL",
      NativeName: "नेपाल",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "28",
      Longitude: "84",
      Area: 147181,
      NumericCode: 524,
      NativeLanguage: "nep",
      CurrencyCode: "NPR",
      CurrencyName: "Nepalese rupee",
      CurrencySymbol: "₨",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/npl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/npl.png"
    },
    {
      Name: "Netherlands",
      Alpha2Code: "NL",
      Alpha3Code: "NLD",
      NativeName: "Nederland",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "52.5",
      Longitude: "5.75",
      Area: 41850,
      NumericCode: 528,
      NativeLanguage: "nld",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nld.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nld.png"
    },
    {
      Name: "New Caledonia",
      Alpha2Code: "NC",
      Alpha3Code: "NCL",
      NativeName: "Nouvelle-Calédonie",
      Region: "Oceania",
      SubRegion: "Melanesia",
      Latitude: "-21.5",
      Longitude: "165.5",
      Area: 18575,
      NumericCode: 540,
      NativeLanguage: "fra",
      CurrencyCode: "XPF",
      CurrencyName: "CFP franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ncl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ncl.png"
    },
    {
      Name: "New Zealand",
      Alpha2Code: "NZ",
      Alpha3Code: "NZL",
      NativeName: "New Zealand",
      Region: "Oceania",
      SubRegion: "Australia and New Zealand",
      Latitude: "-41",
      Longitude: "174",
      Area: 270467,
      NumericCode: 554,
      NativeLanguage: "eng",
      CurrencyCode: "NZD",
      CurrencyName: "New Zealand dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nzl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nzl.png"
    },
    {
      Name: "Nicaragua",
      Alpha2Code: "NI",
      Alpha3Code: "NIC",
      NativeName: "Nicaragua",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "13",
      Longitude: "-85",
      Area: 130373,
      NumericCode: 558,
      NativeLanguage: "spa",
      CurrencyCode: "NIO",
      CurrencyName: "Nicaraguan córdoba",
      CurrencySymbol: "C$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nic.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nic.png"
    },
    {
      Name: "Niger",
      Alpha2Code: "NE",
      Alpha3Code: "NER",
      NativeName: "Niger",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "16",
      Longitude: "8",
      Area: 1267000,
      NumericCode: 562,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ner.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ner.png"
    },
    {
      Name: "Nigeria",
      Alpha2Code: "NG",
      Alpha3Code: "NGA",
      NativeName: "Nigeria",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "10",
      Longitude: "8",
      Area: 923768,
      NumericCode: 566,
      NativeLanguage: "eng",
      CurrencyCode: "NGN",
      CurrencyName: "Nigerian naira",
      CurrencySymbol: "₦",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nga.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nga.png"
    },
    {
      Name: "Niue",
      Alpha2Code: "NU",
      Alpha3Code: "NIU",
      NativeName: "Niuē",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-19.03333333",
      Longitude: "-169.86666666",
      Area: 260,
      NumericCode: 570,
      NativeLanguage: "niu",
      CurrencyCode: "NZD",
      CurrencyName: "New Zealand dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/niu.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/niu.png"
    },
    {
      Name: "Norfolk Island",
      Alpha2Code: "NF",
      Alpha3Code: "NFK",
      NativeName: "Norfolk Island",
      Region: "Oceania",
      SubRegion: "Australia and New Zealand",
      Latitude: "-29.03333333",
      Longitude: "167.95",
      Area: 36,
      NumericCode: 574,
      NativeLanguage: "eng",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nfk.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nfk.png"
    },
    {
      Name: "Northern Mariana Islands",
      Alpha2Code: "MP",
      Alpha3Code: "MNP",
      NativeName: "Northern Mariana Islands",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "15.2",
      Longitude: "145.75",
      Area: 464,
      NumericCode: 580,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/mnp.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/mnp.png"
    },
    {
      Name: "Norway",
      Alpha2Code: "NO",
      Alpha3Code: "NOR",
      NativeName: "Norge",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "62",
      Longitude: "10",
      Area: 323802,
      NumericCode: 578,
      NativeLanguage: "nor",
      CurrencyCode: "NOK",
      CurrencyName: "Norwegian krone",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/nor.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/nor.png"
    },
    {
      Name: "Oman",
      Alpha2Code: "OM",
      Alpha3Code: "OMN",
      NativeName: "عمان",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "21",
      Longitude: "57",
      Area: 309500,
      NumericCode: 512,
      NativeLanguage: "ara",
      CurrencyCode: "OMR",
      CurrencyName: "Omani rial",
      CurrencySymbol: "ر.ع.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/omn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/omn.png"
    },
    {
      Name: "Pakistan",
      Alpha2Code: "PK",
      Alpha3Code: "PAK",
      NativeName: "Pakistan",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "30",
      Longitude: "70",
      Area: 881912,
      NumericCode: 586,
      NativeLanguage: "eng",
      CurrencyCode: "PKR",
      CurrencyName: "Pakistani rupee",
      CurrencySymbol: "₨",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pak.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pak.png"
    },
    {
      Name: "Palau",
      Alpha2Code: "PW",
      Alpha3Code: "PLW",
      NativeName: "Palau",
      Region: "Oceania",
      SubRegion: "Micronesia",
      Latitude: "7.5",
      Longitude: "134.5",
      Area: 459,
      NumericCode: 585,
      NativeLanguage: "eng",
      CurrencyCode: "(none)",
      CurrencyName: "[E]",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/plw.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/plw.png"
    },
    {
      Name: "Palestine, State of",
      Alpha2Code: "PS",
      Alpha3Code: "PSE",
      NativeName: "فلسطين",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "31.9",
      Longitude: "35.2",
      Area: null,
      NumericCode: 275,
      NativeLanguage: "ara",
      CurrencyCode: "ILS",
      CurrencyName: "Israeli new sheqel",
      CurrencySymbol: "₪",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pse.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pse.png"
    },
    {
      Name: "Panama",
      Alpha2Code: "PA",
      Alpha3Code: "PAN",
      NativeName: "Panamá",
      Region: "Americas",
      SubRegion: "Central America",
      Latitude: "9",
      Longitude: "-80",
      Area: 75417,
      NumericCode: 591,
      NativeLanguage: "spa",
      CurrencyCode: "PAB",
      CurrencyName: "Panamanian balboa",
      CurrencySymbol: "B/.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pan.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pan.png"
    },
    {
      Name: "Papua New Guinea",
      Alpha2Code: "PG",
      Alpha3Code: "PNG",
      NativeName: "Papua Niugini",
      Region: "Oceania",
      SubRegion: "Melanesia",
      Latitude: "-6",
      Longitude: "147",
      Area: 462840,
      NumericCode: 598,
      NativeLanguage: "hmo",
      CurrencyCode: "PGK",
      CurrencyName: "Papua New Guinean kina",
      CurrencySymbol: "K",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/png.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/png.png"
    },
    {
      Name: "Paraguay",
      Alpha2Code: "PY",
      Alpha3Code: "PRY",
      NativeName: "Paraguay",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-23",
      Longitude: "-58",
      Area: 406752,
      NumericCode: 600,
      NativeLanguage: "spa",
      CurrencyCode: "PYG",
      CurrencyName: "Paraguayan guaraní",
      CurrencySymbol: "₲",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pry.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pry.png"
    },
    {
      Name: "Peru",
      Alpha2Code: "PE",
      Alpha3Code: "PER",
      NativeName: "Perú",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-10",
      Longitude: "-76",
      Area: 1285216,
      NumericCode: 604,
      NativeLanguage: "spa",
      CurrencyCode: "PEN",
      CurrencyName: "Peruvian sol",
      CurrencySymbol: "S/.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/per.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/per.png"
    },
    {
      Name: "Philippines",
      Alpha2Code: "PH",
      Alpha3Code: "PHL",
      NativeName: "Pilipinas",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "13",
      Longitude: "122",
      Area: 342353,
      NumericCode: 608,
      NativeLanguage: "fil",
      CurrencyCode: "PHP",
      CurrencyName: "Philippine peso",
      CurrencySymbol: "₱",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/phl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/phl.png"
    },
    {
      Name: "Pitcairn",
      Alpha2Code: "PN",
      Alpha3Code: "PCN",
      NativeName: "Pitcairn Islands",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-25.06666666",
      Longitude: "-130.1",
      Area: 47,
      NumericCode: 612,
      NativeLanguage: "eng",
      CurrencyCode: "NZD",
      CurrencyName: "New Zealand dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pcn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pcn.png"
    },
    {
      Name: "Poland",
      Alpha2Code: "PL",
      Alpha3Code: "POL",
      NativeName: "Polska",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "52",
      Longitude: "20",
      Area: 312679,
      NumericCode: 616,
      NativeLanguage: "pol",
      CurrencyCode: "PLN",
      CurrencyName: "Polish zloty",
      CurrencySymbol: "zł",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pol.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pol.png"
    },
    {
      Name: "Portugal",
      Alpha2Code: "PT",
      Alpha3Code: "PRT",
      NativeName: "Portugal",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "39.5",
      Longitude: "-8",
      Area: 92090,
      NumericCode: 620,
      NativeLanguage: "por",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/prt.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/prt.png"
    },
    {
      Name: "Puerto Rico",
      Alpha2Code: "PR",
      Alpha3Code: "PRI",
      NativeName: "Puerto Rico",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.25",
      Longitude: "-66.5",
      Area: 8870,
      NumericCode: 630,
      NativeLanguage: "spa",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/pri.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/pri.png"
    },
    {
      Name: "Qatar",
      Alpha2Code: "QA",
      Alpha3Code: "QAT",
      NativeName: "قطر",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "25.5",
      Longitude: "51.25",
      Area: 11586,
      NumericCode: 634,
      NativeLanguage: "ara",
      CurrencyCode: "QAR",
      CurrencyName: "Qatari riyal",
      CurrencySymbol: "ر.ق",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/qat.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/qat.png"
    },
    {
      Name: "Republic of Kosovo",
      Alpha2Code: "XK",
      Alpha3Code: "KOS",
      NativeName: "Republika e Kosovës",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "42.666667",
      Longitude: "21.166667",
      Area: 10908,
      NumericCode: null,
      NativeLanguage: "sqi",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kos.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kos.png"
    },
    {
      Name: "Réunion",
      Alpha2Code: "RE",
      Alpha3Code: "REU",
      NativeName: "La Réunion",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-21.15",
      Longitude: "55.5",
      Area: null,
      NumericCode: 638,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/reu.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/reu.png"
    },
    {
      Name: "Romania",
      Alpha2Code: "RO",
      Alpha3Code: "ROU",
      NativeName: "România",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "46",
      Longitude: "25",
      Area: 238391,
      NumericCode: 642,
      NativeLanguage: "ron",
      CurrencyCode: "RON",
      CurrencyName: "Romanian leu",
      CurrencySymbol: "lei",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/rou.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/rou.png"
    },
    {
      Name: "Russian Federation",
      Alpha2Code: "RU",
      Alpha3Code: "RUS",
      NativeName: "Россия",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "60",
      Longitude: "100",
      Area: 17124442,
      NumericCode: 643,
      NativeLanguage: "rus",
      CurrencyCode: "RUB",
      CurrencyName: "Russian ruble",
      CurrencySymbol: "₽",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/rus.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/rus.png"
    },
    {
      Name: "Rwanda",
      Alpha2Code: "RW",
      Alpha3Code: "RWA",
      NativeName: "Rwanda",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-2",
      Longitude: "30",
      Area: 26338,
      NumericCode: 646,
      NativeLanguage: "kin",
      CurrencyCode: "RWF",
      CurrencyName: "Rwandan franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/rwa.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/rwa.png"
    },
    {
      Name: "Saint Barthélemy",
      Alpha2Code: "BL",
      Alpha3Code: "BLM",
      NativeName: "Saint-Barthélemy",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.5",
      Longitude: "-63.41666666",
      Area: 21,
      NumericCode: 652,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/blm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/blm.png"
    },
    {
      Name: "Saint Helena, Ascension and Tristan da Cunha",
      Alpha2Code: "SH",
      Alpha3Code: "SHN",
      NativeName: "Saint Helena",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "-15.95",
      Longitude: "-5.7",
      Area: null,
      NumericCode: 654,
      NativeLanguage: "eng",
      CurrencyCode: "SHP",
      CurrencyName: "Saint Helena pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/shn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/shn.png"
    },
    {
      Name: "Saint Kitts and Nevis",
      Alpha2Code: "KN",
      Alpha3Code: "KNA",
      NativeName: "Saint Kitts and Nevis",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "17.33333333",
      Longitude: "-62.75",
      Area: 261,
      NumericCode: 659,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/kna.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/kna.png"
    },
    {
      Name: "Saint Lucia",
      Alpha2Code: "LC",
      Alpha3Code: "LCA",
      NativeName: "Saint Lucia",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "13.88333333",
      Longitude: "-60.96666666",
      Area: 616,
      NumericCode: 662,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lca.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lca.png"
    },
    {
      Name: "Saint Martin (French part)",
      Alpha2Code: "MF",
      Alpha3Code: "MAF",
      NativeName: "Saint-Martin",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.08333333",
      Longitude: "-63.95",
      Area: 53,
      NumericCode: 663,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/maf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/maf.png"
    },
    {
      Name: "Saint Pierre and Miquelon",
      Alpha2Code: "PM",
      Alpha3Code: "SPM",
      NativeName: "Saint-Pierre-et-Miquelon",
      Region: "Americas",
      SubRegion: "Northern America",
      Latitude: "46.83333333",
      Longitude: "-56.33333333",
      Area: 242,
      NumericCode: 666,
      NativeLanguage: "fra",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/spm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/spm.png"
    },
    {
      Name: "Saint Vincent and the Grenadines",
      Alpha2Code: "VC",
      Alpha3Code: "VCT",
      NativeName: "Saint Vincent and the Grenadines",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "13.25",
      Longitude: "-61.2",
      Area: 389,
      NumericCode: 670,
      NativeLanguage: "eng",
      CurrencyCode: "XCD",
      CurrencyName: "East Caribbean dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/vct.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/vct.png"
    },
    {
      Name: "Samoa",
      Alpha2Code: "WS",
      Alpha3Code: "WSM",
      NativeName: "Samoa",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-13.58333333",
      Longitude: "-172.33333333",
      Area: 2842,
      NumericCode: 882,
      NativeLanguage: "smo",
      CurrencyCode: "WST",
      CurrencyName: "Samoan tala",
      CurrencySymbol: "T",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/wsm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/wsm.png"
    },
    {
      Name: "San Marino",
      Alpha2Code: "SM",
      Alpha3Code: "SMR",
      NativeName: "San Marino",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "43.76666666",
      Longitude: "12.41666666",
      Area: 61,
      NumericCode: 674,
      NativeLanguage: "ita",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/smr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/smr.png"
    },
    {
      Name: "Sao Tome and Principe",
      Alpha2Code: "ST",
      Alpha3Code: "STP",
      NativeName: "São Tomé e Príncipe",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "1",
      Longitude: "7",
      Area: 964,
      NumericCode: 678,
      NativeLanguage: "por",
      CurrencyCode: "STD",
      CurrencyName: "São Tomé and Príncipe dobra",
      CurrencySymbol: "Db",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/stp.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/stp.png"
    },
    {
      Name: "Saudi Arabia",
      Alpha2Code: "SA",
      Alpha3Code: "SAU",
      NativeName: "العربية السعودية",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "25",
      Longitude: "45",
      Area: 2149690,
      NumericCode: 682,
      NativeLanguage: "ara",
      CurrencyCode: "SAR",
      CurrencyName: "Saudi riyal",
      CurrencySymbol: "ر.س",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sau.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sau.png"
    },
    {
      Name: "Senegal",
      Alpha2Code: "SN",
      Alpha3Code: "SEN",
      NativeName: "Sénégal",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "14",
      Longitude: "-14",
      Area: 196722,
      NumericCode: 686,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sen.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sen.png"
    },
    {
      Name: "Serbia",
      Alpha2Code: "RS",
      Alpha3Code: "SRB",
      NativeName: "Србија",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "44",
      Longitude: "21",
      Area: 88361,
      NumericCode: 688,
      NativeLanguage: "srp",
      CurrencyCode: "RSD",
      CurrencyName: "Serbian dinar",
      CurrencySymbol: "дин.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/srb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/srb.png"
    },
    {
      Name: "Seychelles",
      Alpha2Code: "SC",
      Alpha3Code: "SYC",
      NativeName: "Seychelles",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-4.58333333",
      Longitude: "55.66666666",
      Area: 452,
      NumericCode: 690,
      NativeLanguage: "fra",
      CurrencyCode: "SCR",
      CurrencyName: "Seychellois rupee",
      CurrencySymbol: "₨",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/syc.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/syc.png"
    },
    {
      Name: "Sierra Leone",
      Alpha2Code: "SL",
      Alpha3Code: "SLE",
      NativeName: "Sierra Leone",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "8.5",
      Longitude: "-11.5",
      Area: 71740,
      NumericCode: 694,
      NativeLanguage: "eng",
      CurrencyCode: "SLL",
      CurrencyName: "Sierra Leonean leone",
      CurrencySymbol: "Le",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sle.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sle.png"
    },
    {
      Name: "Singapore",
      Alpha2Code: "SG",
      Alpha3Code: "SGP",
      NativeName: "Singapore",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "1.36666666",
      Longitude: "103.8",
      Area: 710,
      NumericCode: 702,
      NativeLanguage: "eng",
      CurrencyCode: "BND",
      CurrencyName: "Brunei dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sgp.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sgp.png"
    },
    {
      Name: "Sint Maarten (Dutch part)",
      Alpha2Code: "SX",
      Alpha3Code: "SXM",
      NativeName: "Sint Maarten",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.033333",
      Longitude: "-63.05",
      Area: 34,
      NumericCode: 534,
      NativeLanguage: "nld",
      CurrencyCode: "ANG",
      CurrencyName: "Netherlands Antillean guilder",
      CurrencySymbol: "ƒ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sxm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sxm.png"
    },
    {
      Name: "Slovakia",
      Alpha2Code: "SK",
      Alpha3Code: "SVK",
      NativeName: "Slovensko",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "48.66666666",
      Longitude: "19.5",
      Area: 49037,
      NumericCode: 703,
      NativeLanguage: "slk",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/svk.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/svk.png"
    },
    {
      Name: "Slovenia",
      Alpha2Code: "SI",
      Alpha3Code: "SVN",
      NativeName: "Slovenija",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "46.11666666",
      Longitude: "14.81666666",
      Area: 20273,
      NumericCode: 705,
      NativeLanguage: "slv",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/svn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/svn.png"
    },
    {
      Name: "Solomon Islands",
      Alpha2Code: "SB",
      Alpha3Code: "SLB",
      NativeName: "Solomon Islands",
      Region: "Oceania",
      SubRegion: "Melanesia",
      Latitude: "-8",
      Longitude: "159",
      Area: 28896,
      NumericCode: 90,
      NativeLanguage: "eng",
      CurrencyCode: "SBD",
      CurrencyName: "Solomon Islands dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/slb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/slb.png"
    },
    {
      Name: "Somalia",
      Alpha2Code: "SO",
      Alpha3Code: "SOM",
      NativeName: "Soomaaliya",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "10",
      Longitude: "49",
      Area: 637657,
      NumericCode: 706,
      NativeLanguage: "som",
      CurrencyCode: "SOS",
      CurrencyName: "Somali shilling",
      CurrencySymbol: "Sh",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/som.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/som.png"
    },
    {
      Name: "South Africa",
      Alpha2Code: "ZA",
      Alpha3Code: "ZAF",
      NativeName: "South Africa",
      Region: "Africa",
      SubRegion: "Southern Africa",
      Latitude: "-29",
      Longitude: "24",
      Area: 1221037,
      NumericCode: 710,
      NativeLanguage: "afr",
      CurrencyCode: "ZAR",
      CurrencyName: "South African rand",
      CurrencySymbol: "R",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/zaf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/zaf.png"
    },
    {
      Name: "South Georgia and the South Sandwich Islands",
      Alpha2Code: "GS",
      Alpha3Code: "SGS",
      NativeName: "South Georgia",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-54.5",
      Longitude: "-37",
      Area: null,
      NumericCode: 239,
      NativeLanguage: "eng",
      CurrencyCode: "GBP",
      CurrencyName: "British pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sgs.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sgs.png"
    },
    {
      Name: "South Sudan",
      Alpha2Code: "SS",
      Alpha3Code: "SSD",
      NativeName: "South Sudan",
      Region: "Africa",
      SubRegion: "Middle Africa",
      Latitude: "7",
      Longitude: "30",
      Area: 619745,
      NumericCode: 728,
      NativeLanguage: "eng",
      CurrencyCode: "SSP",
      CurrencyName: "South Sudanese pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ssd.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ssd.png"
    },
    {
      Name: "Spain",
      Alpha2Code: "ES",
      Alpha3Code: "ESP",
      NativeName: "España",
      Region: "Europe",
      SubRegion: "Southern Europe",
      Latitude: "40",
      Longitude: "-4",
      Area: 505992,
      NumericCode: 724,
      NativeLanguage: "spa",
      CurrencyCode: "EUR",
      CurrencyName: "Euro",
      CurrencySymbol: "€",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/esp.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/esp.png"
    },
    {
      Name: "Sri Lanka",
      Alpha2Code: "LK",
      Alpha3Code: "LKA",
      NativeName: "śrī laṃkāva",
      Region: "Asia",
      SubRegion: "Southern Asia",
      Latitude: "7",
      Longitude: "81",
      Area: 65610,
      NumericCode: 144,
      NativeLanguage: "sin",
      CurrencyCode: "LKR",
      CurrencyName: "Sri Lankan rupee",
      CurrencySymbol: "Rs",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/lka.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/lka.png"
    },
    {
      Name: "Sudan",
      Alpha2Code: "SD",
      Alpha3Code: "SDN",
      NativeName: "السودان",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "15",
      Longitude: "30",
      Area: 1886068,
      NumericCode: 729,
      NativeLanguage: "ara",
      CurrencyCode: "SDG",
      CurrencyName: "Sudanese pound",
      CurrencySymbol: "ج.س.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sdn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sdn.png"
    },
    {
      Name: "Suriname",
      Alpha2Code: "SR",
      Alpha3Code: "SUR",
      NativeName: "Suriname",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "4",
      Longitude: "-56",
      Area: 163820,
      NumericCode: 740,
      NativeLanguage: "nld",
      CurrencyCode: "SRD",
      CurrencyName: "Surinamese dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sur.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sur.png"
    },
    {
      Name: "Svalbard and Jan Mayen",
      Alpha2Code: "SJ",
      Alpha3Code: "SJM",
      NativeName: "Svalbard og Jan Mayen",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "78",
      Longitude: "20",
      Area: null,
      NumericCode: 744,
      NativeLanguage: "nor",
      CurrencyCode: "NOK",
      CurrencyName: "Norwegian krone",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/sjm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/sjm.png"
    },
    {
      Name: "Swaziland",
      Alpha2Code: "SZ",
      Alpha3Code: "SWZ",
      NativeName: "Swaziland",
      Region: "Africa",
      SubRegion: "Southern Africa",
      Latitude: "-26.5",
      Longitude: "31.5",
      Area: 17364,
      NumericCode: 748,
      NativeLanguage: "ssw",
      CurrencyCode: "SZL",
      CurrencyName: "Swazi lilangeni",
      CurrencySymbol: "L",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/swz.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/swz.png"
    },
    {
      Name: "Sweden",
      Alpha2Code: "SE",
      Alpha3Code: "SWE",
      NativeName: "Sverige",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "62",
      Longitude: "15",
      Area: 450295,
      NumericCode: 752,
      NativeLanguage: "swe",
      CurrencyCode: "SEK",
      CurrencyName: "Swedish krona",
      CurrencySymbol: "kr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/swe.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/swe.png"
    },
    {
      Name: "Switzerland",
      Alpha2Code: "CH",
      Alpha3Code: "CHE",
      NativeName: "Schweiz",
      Region: "Europe",
      SubRegion: "Western Europe",
      Latitude: "47",
      Longitude: "8",
      Area: 41284,
      NumericCode: 756,
      NativeLanguage: "deu",
      CurrencyCode: "CHF",
      CurrencyName: "Swiss franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/che.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/che.png"
    },
    {
      Name: "Syrian Arab Republic",
      Alpha2Code: "SY",
      Alpha3Code: "SYR",
      NativeName: "سوريا",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "35",
      Longitude: "38",
      Area: 185180,
      NumericCode: 760,
      NativeLanguage: "ara",
      CurrencyCode: "SYP",
      CurrencyName: "Syrian pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/syr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/syr.png"
    },
    {
      Name: "Taiwan, Province of China",
      Alpha2Code: "TW",
      Alpha3Code: "TWN",
      NativeName: "臺灣",
      Region: "Asia",
      SubRegion: "Eastern Asia",
      Latitude: "23.5",
      Longitude: "121",
      Area: 36193,
      NumericCode: 158,
      NativeLanguage: "cmn",
      CurrencyCode: "TWD",
      CurrencyName: "New Taiwan dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/twn.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/twn.png"
    },
    {
      Name: "Tajikistan",
      Alpha2Code: "TJ",
      Alpha3Code: "TJK",
      NativeName: "Тоҷикистон",
      Region: "Asia",
      SubRegion: "Central Asia",
      Latitude: "39",
      Longitude: "71",
      Area: 143100,
      NumericCode: 762,
      NativeLanguage: "tgk",
      CurrencyCode: "TJS",
      CurrencyName: "Tajikistani somoni",
      CurrencySymbol: "ЅМ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tjk.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tjk.png"
    },
    {
      Name: "Tanzania, United Republic of",
      Alpha2Code: "TZ",
      Alpha3Code: "TZA",
      NativeName: "Tanzania",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-6",
      Longitude: "35",
      Area: 945087,
      NumericCode: 834,
      NativeLanguage: "swa",
      CurrencyCode: "TZS",
      CurrencyName: "Tanzanian shilling",
      CurrencySymbol: "Sh",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tza.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tza.png"
    },
    {
      Name: "Thailand",
      Alpha2Code: "TH",
      Alpha3Code: "THA",
      NativeName: "ประเทศไทย",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "15",
      Longitude: "100",
      Area: 513120,
      NumericCode: 764,
      NativeLanguage: "tha",
      CurrencyCode: "THB",
      CurrencyName: "Thai baht",
      CurrencySymbol: "฿",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tha.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tha.png"
    },
    {
      Name: "Timor-Leste",
      Alpha2Code: "TL",
      Alpha3Code: "TLS",
      NativeName: "Timor-Leste",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "-8.83333333",
      Longitude: "125.91666666",
      Area: 14874,
      NumericCode: 626,
      NativeLanguage: "por",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tls.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tls.png"
    },
    {
      Name: "Togo",
      Alpha2Code: "TG",
      Alpha3Code: "TGO",
      NativeName: "Togo",
      Region: "Africa",
      SubRegion: "Western Africa",
      Latitude: "8",
      Longitude: "1.16666666",
      Area: 56785,
      NumericCode: 768,
      NativeLanguage: "fra",
      CurrencyCode: "XOF",
      CurrencyName: "West African CFA franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tgo.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tgo.png"
    },
    {
      Name: "Tokelau",
      Alpha2Code: "TK",
      Alpha3Code: "TKL",
      NativeName: "Tokelau",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-9",
      Longitude: "-172",
      Area: 12,
      NumericCode: 772,
      NativeLanguage: "tkl",
      CurrencyCode: "NZD",
      CurrencyName: "New Zealand dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tkl.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tkl.png"
    },
    {
      Name: "Tonga",
      Alpha2Code: "TO",
      Alpha3Code: "TON",
      NativeName: "Tonga",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-20",
      Longitude: "-175",
      Area: 747,
      NumericCode: 776,
      NativeLanguage: "ton",
      CurrencyCode: "TOP",
      CurrencyName: "Tongan pa?anga",
      CurrencySymbol: "T$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ton.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ton.png"
    },
    {
      Name: "Trinidad and Tobago",
      Alpha2Code: "TT",
      Alpha3Code: "TTO",
      NativeName: "Trinidad and Tobago",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "11",
      Longitude: "-61",
      Area: 5130,
      NumericCode: 780,
      NativeLanguage: "eng",
      CurrencyCode: "TTD",
      CurrencyName: "Trinidad and Tobago dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tto.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tto.png"
    },
    {
      Name: "Tunisia",
      Alpha2Code: "TN",
      Alpha3Code: "TUN",
      NativeName: "تونس",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "34",
      Longitude: "9",
      Area: 163610,
      NumericCode: 788,
      NativeLanguage: "ara",
      CurrencyCode: "TND",
      CurrencyName: "Tunisian dinar",
      CurrencySymbol: "د.ت",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tun.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tun.png"
    },
    {
      Name: "Turkey",
      Alpha2Code: "TR",
      Alpha3Code: "TUR",
      NativeName: "Türkiye",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "39",
      Longitude: "35",
      Area: 783562,
      NumericCode: 792,
      NativeLanguage: "tur",
      CurrencyCode: "TRY",
      CurrencyName: "Turkish lira",
      CurrencySymbol: "",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tur.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tur.png"
    },
    {
      Name: "Turkmenistan",
      Alpha2Code: "TM",
      Alpha3Code: "TKM",
      NativeName: "Türkmenistan",
      Region: "Asia",
      SubRegion: "Central Asia",
      Latitude: "40",
      Longitude: "60",
      Area: 488100,
      NumericCode: 795,
      NativeLanguage: "tuk",
      CurrencyCode: "TMT",
      CurrencyName: "Turkmenistan manat",
      CurrencySymbol: "m",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tkm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tkm.png"
    },
    {
      Name: "Turks and Caicos Islands",
      Alpha2Code: "TC",
      Alpha3Code: "TCA",
      NativeName: "Turks and Caicos Islands",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "21.75",
      Longitude: "-71.58333333",
      Area: 948,
      NumericCode: 796,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tca.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tca.png"
    },
    {
      Name: "Tuvalu",
      Alpha2Code: "TV",
      Alpha3Code: "TUV",
      NativeName: "Tuvalu",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-8",
      Longitude: "178",
      Area: 26,
      NumericCode: 798,
      NativeLanguage: "tvl",
      CurrencyCode: "AUD",
      CurrencyName: "Australian dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/tuv.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/tuv.png"
    },
    {
      Name: "Uganda",
      Alpha2Code: "UG",
      Alpha3Code: "UGA",
      NativeName: "Uganda",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "1",
      Longitude: "32",
      Area: 241550,
      NumericCode: 800,
      NativeLanguage: "swa",
      CurrencyCode: "UGX",
      CurrencyName: "Ugandan shilling",
      CurrencySymbol: "Sh",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/uga.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/uga.png"
    },
    {
      Name: "Ukraine",
      Alpha2Code: "UA",
      Alpha3Code: "UKR",
      NativeName: "Україна",
      Region: "Europe",
      SubRegion: "Eastern Europe",
      Latitude: "49",
      Longitude: "32",
      Area: 603700,
      NumericCode: 804,
      NativeLanguage: "ukr",
      CurrencyCode: "UAH",
      CurrencyName: "Ukrainian hryvnia",
      CurrencySymbol: "₴",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ukr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ukr.png"
    },
    {
      Name: "United Arab Emirates",
      Alpha2Code: "AE",
      Alpha3Code: "ARE",
      NativeName: "دولة الإمارات العربية المتحدة",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "24",
      Longitude: "54",
      Area: 83600,
      NumericCode: 784,
      NativeLanguage: "ara",
      CurrencyCode: "AED",
      CurrencyName: "United Arab Emirates dirham",
      CurrencySymbol: "د.إ",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/are.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/are.png"
    },
    {
      Name: "United Kingdom of Great Britain and Northern Ireland",
      Alpha2Code: "GB",
      Alpha3Code: "GBR",
      NativeName: "United Kingdom",
      Region: "Europe",
      SubRegion: "Northern Europe",
      Latitude: "54",
      Longitude: "-2",
      Area: 242900,
      NumericCode: 826,
      NativeLanguage: "eng",
      CurrencyCode: "GBP",
      CurrencyName: "British pound",
      CurrencySymbol: "£",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/gbr.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/gbr.png"
    },
    {
      Name: "United States Minor Outlying Islands",
      Alpha2Code: "UM",
      Alpha3Code: "UMI",
      NativeName: "United States Minor Outlying Islands",
      Region: "Americas",
      SubRegion: "Northern America",
      Latitude: "",
      Longitude: "",
      Area: null,
      NumericCode: 581,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States Dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/umi.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/umi.png"
    },
    {
      Name: "United States of America",
      Alpha2Code: "US",
      Alpha3Code: "USA",
      NativeName: "United States",
      Region: "Americas",
      SubRegion: "Northern America",
      Latitude: "38",
      Longitude: "-97",
      Area: 9629091,
      NumericCode: 840,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/usa.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/usa.png"
    },
    {
      Name: "Uruguay",
      Alpha2Code: "UY",
      Alpha3Code: "URY",
      NativeName: "Uruguay",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "-33",
      Longitude: "-56",
      Area: 181034,
      NumericCode: 858,
      NativeLanguage: "spa",
      CurrencyCode: "UYU",
      CurrencyName: "Uruguayan peso",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ury.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ury.png"
    },
    {
      Name: "Uzbekistan",
      Alpha2Code: "UZ",
      Alpha3Code: "UZB",
      NativeName: "O‘zbekiston",
      Region: "Asia",
      SubRegion: "Central Asia",
      Latitude: "41",
      Longitude: "64",
      Area: 447400,
      NumericCode: 860,
      NativeLanguage: "uzb",
      CurrencyCode: "UZS",
      CurrencyName: "Uzbekistani som",
      CurrencySymbol: "",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/uzb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/uzb.png"
    },
    {
      Name: "Vanuatu",
      Alpha2Code: "VU",
      Alpha3Code: "VUT",
      NativeName: "Vanuatu",
      Region: "Oceania",
      SubRegion: "Melanesia",
      Latitude: "-16",
      Longitude: "167",
      Area: 12189,
      NumericCode: 548,
      NativeLanguage: "bis",
      CurrencyCode: "VUV",
      CurrencyName: "Vanuatu vatu",
      CurrencySymbol: "Vt",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/vut.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/vut.png"
    },
    {
      Name: "Venezuela (Bolivarian Republic of)",
      Alpha2Code: "VE",
      Alpha3Code: "VEN",
      NativeName: "Venezuela",
      Region: "Americas",
      SubRegion: "South America",
      Latitude: "8",
      Longitude: "-66",
      Area: 916445,
      NumericCode: 862,
      NativeLanguage: "spa",
      CurrencyCode: "VEF",
      CurrencyName: "Venezuelan bolívar",
      CurrencySymbol: "Bs F",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/ven.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/ven.png"
    },
    {
      Name: "Viet Nam",
      Alpha2Code: "VN",
      Alpha3Code: "VNM",
      NativeName: "Việt Nam",
      Region: "Asia",
      SubRegion: "South-Eastern Asia",
      Latitude: "16.16666666",
      Longitude: "107.83333333",
      Area: 331212,
      NumericCode: 704,
      NativeLanguage: "vie",
      CurrencyCode: "VND",
      CurrencyName: "Vietnamese d?ng",
      CurrencySymbol: "₫",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/vnm.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/vnm.png"
    },
    {
      Name: "Virgin Islands (British)",
      Alpha2Code: "VG",
      Alpha3Code: "VGB",
      NativeName: "British Virgin Islands",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.431383",
      Longitude: "-64.62305",
      Area: 151,
      NumericCode: 92,
      NativeLanguage: "eng",
      CurrencyCode: "",
      CurrencyName: "[D]",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/vgb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/vgb.png"
    },
    {
      Name: "Virgin Islands (U.S.)",
      Alpha2Code: "VI",
      Alpha3Code: "VIR",
      NativeName: "Virgin Islands of the United States",
      Region: "Americas",
      SubRegion: "Caribbean",
      Latitude: "18.34",
      Longitude: "-64.93",
      Area: 346,
      NumericCode: 850,
      NativeLanguage: "eng",
      CurrencyCode: "USD",
      CurrencyName: "United States dollar",
      CurrencySymbol: "$",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/vir.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/vir.png"
    },
    {
      Name: "Wallis and Futuna",
      Alpha2Code: "WF",
      Alpha3Code: "WLF",
      NativeName: "Wallis et Futuna",
      Region: "Oceania",
      SubRegion: "Polynesia",
      Latitude: "-13.3",
      Longitude: "-176.2",
      Area: 142,
      NumericCode: 876,
      NativeLanguage: "fra",
      CurrencyCode: "XPF",
      CurrencyName: "CFP franc",
      CurrencySymbol: "Fr",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/wlf.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/wlf.png"
    },
    {
      Name: "Western Sahara",
      Alpha2Code: "EH",
      Alpha3Code: "ESH",
      NativeName: "الصحراء الغربية",
      Region: "Africa",
      SubRegion: "Northern Africa",
      Latitude: "24.5",
      Longitude: "-13",
      Area: 266000,
      NumericCode: 732,
      NativeLanguage: "ber",
      CurrencyCode: "MAD",
      CurrencyName: "Moroccan dirham",
      CurrencySymbol: "د.م.",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/esh.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/esh.png"
    },
    {
      Name: "Yemen",
      Alpha2Code: "YE",
      Alpha3Code: "YEM",
      NativeName: "اليَمَن",
      Region: "Asia",
      SubRegion: "Western Asia",
      Latitude: "15",
      Longitude: "48",
      Area: 527968,
      NumericCode: 887,
      NativeLanguage: "ara",
      CurrencyCode: "YER",
      CurrencyName: "Yemeni rial",
      CurrencySymbol: "﷼",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/yem.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/yem.png"
    },
    {
      Name: "Zambia",
      Alpha2Code: "ZM",
      Alpha3Code: "ZMB",
      NativeName: "Zambia",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-15",
      Longitude: "30",
      Area: 752612,
      NumericCode: 894,
      NativeLanguage: "eng",
      CurrencyCode: "ZMW",
      CurrencyName: "Zambian kwacha",
      CurrencySymbol: "ZK",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/zmb.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/zmb.png"
    },
    {
      Name: "Zimbabwe",
      Alpha2Code: "ZW",
      Alpha3Code: "ZWE",
      NativeName: "Zimbabwe",
      Region: "Africa",
      SubRegion: "Eastern Africa",
      Latitude: "-20",
      Longitude: "30",
      Area: 390757,
      NumericCode: 716,
      NativeLanguage: "nya",
      CurrencyCode: "BWP",
      CurrencyName: "Botswana pula",
      CurrencySymbol: "P",
      Flag:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlags/zwe.svg",
      FlagPng:
        "https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/zwe.png"
    }
  ]
};
