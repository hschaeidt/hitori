import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApolloModule } from 'apollo-angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { PeoplePage } from '../pages/people/people';
import { InboxPage } from '../pages/inbox/inbox';
import { SettingsPage } from '../pages/settings/settings';
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { PresentationPage } from "../pages/presentation/presentation";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PeopleProvider } from '../providers/people/people';
import { ConversationsProvider } from '../providers/conversations/conversations';
import { Auth0Provider } from '../providers/auth0/auth0';
import { ApolloProvider } from '../providers/apollo/apollo';
import { UserProvider } from '../providers/user/user';
import { ProfileProvider } from '../providers/profile/profile';
import { FormsModule } from "@angular/forms";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

const apolloProvider = new ApolloProvider(new Storage({ name: '_ionicstorage' }));

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    PeoplePage,
    InboxPage,
    TabsPage,
    SettingsPage,
    SigninPage,
    SignupPage,
    PresentationPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ApolloModule.forRoot(apolloProvider.getClient.bind(apolloProvider)),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    PeoplePage,
    InboxPage,
    TabsPage,
    SettingsPage,
    SigninPage,
    SignupPage,
    PresentationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeopleProvider,
    ConversationsProvider,
    Auth0Provider,
    ApolloProvider,
    UserProvider,
    ProfileProvider
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
