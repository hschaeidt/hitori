import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PresentationPage } from '../pages/presentation/presentation';
import { Auth0Provider } from '../providers/auth0/auth0';
import { UserProvider } from "../providers/user/user";
import { TabsPage } from "../pages/tabs/tabs";
import "rxjs/add/operator/filter";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PresentationPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public authProvider: Auth0Provider, translate: TranslateService,
              public userProvider: UserProvider) {
    //setup i18n
    translate.addLangs(["en", "fr", "de"]);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|de/) ? browserLang : 'en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // In the login flow we first consider optimistically the token as valid,
      // Then if not, we redirect back to the presentation page
      userProvider.hasToken().then((token) => {
        if (token) {
          this.rootPage = TabsPage;
        }
      });

      userProvider.getCurrentUser().subscribe(user => {
        if (user === null) {
          this.rootPage = PresentationPage;
        }
      });
    });
  }

  auth0LoginHandling() {
    // Auth handling
    this.authProvider.handleAuthentication().then(() => {
      // success
    }, () => {
      this.authProvider.isAuthenticated().then(isAuthenticated => {
        if (!isAuthenticated) {
          this.authProvider.login();
        }
      });
    });
  }
}
