import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PeopleProvider} from "../../providers/people/people";

@Component({
  selector: 'page-contact',
  templateUrl: 'people.html'
})
export class PeoplePage {
  public people = [];

  constructor(
    public navCtrl: NavController,
    public peopleService: PeopleProvider
  ) {
    peopleService.getRandomPeople(25)
      .subscribe(data => this.people = data.results);
  }
}
