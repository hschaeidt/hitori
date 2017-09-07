import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { PeoplePage } from '../people/people';
import { InboxPage } from '../inbox/inbox';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  inboxTabRoot = InboxPage;
  peopleTabRoot = ProfilePage;
  profileTabRoot = PeoplePage;
  settingsTabRoot = SettingsPage;

  constructor() {

  }
}
