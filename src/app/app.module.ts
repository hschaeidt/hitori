import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
  IonicPageModule
} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { PeoplePage } from '../pages/people/people';
import { InboxPage } from '../pages/inbox/inbox';
import { SettingsPage } from '../pages/settings/settings';
import { StartPage } from "../pages/start/start";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PeopleProvider } from '../providers/people/people';
import { ConversationsProvider } from '../providers/conversations/conversations';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    PeoplePage,
    InboxPage,
    TabsPage,
    SettingsPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    PeoplePage,
    InboxPage,
    TabsPage,
    SettingsPage,
    StartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeopleProvider,
    ConversationsProvider,
    AuthProvider
  ]
})
export class AppModule {}
