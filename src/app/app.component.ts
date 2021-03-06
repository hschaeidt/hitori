import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PresentationPage } from '../pages/presentation/presentation';
import { Auth0Provider } from '../providers/auth0/auth0';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = PresentationPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public authProvider: Auth0Provider, private translate: TranslateService,
              public userProvider: AuthProvider) {
    // Init translations
    this.initTranslate();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Verify user logged in status
      this.verifyUserLoggedInStatus();
    });
  }

  private initTranslate() {
    // Setup i18n
    this.translate.addLangs(['en', 'fr', 'de']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|de/) ? browserLang : 'en');
  }

  private verifyUserLoggedInStatus() {
    // In the login flow we first consider optimistically the token as valid,
    // Then if not, we redirect back to the presentation page
    this.userProvider.hasToken().then((token) => {
      if (token) {
        this.rootPage = TabsPage;
      }
    });

    this.userProvider.getCurrentUser().subscribe(user => {
      if (user === null) {
        this.rootPage = PresentationPage;
      }
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
