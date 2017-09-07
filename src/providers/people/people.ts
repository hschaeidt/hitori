import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PeopleProvider {

  constructor(public http: Http) {
    console.log('Hello PeopleProvider Provider');
  }

  getRandomPeople(amount: number) {
    return this.http.get(`https://randomuser.me/api/?results=${amount}`)
      .map(res => res.json());
  }
}
