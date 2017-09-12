import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PresentationPage } from '../pages/presentation/pesentation';
import { Auth0Provider } from '../providers/auth0/auth0';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PresentationPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authProvider: Auth0Provider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Auth handling
      authProvider.handleAuthentication().then(() => {
        // success
      }, () => {
        authProvider.isAuthenticated().then(isAuthenticated => {
          if (!isAuthenticated) {
            authProvider.login();
          }
        });
      });
    });
  }
}
