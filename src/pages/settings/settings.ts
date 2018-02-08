import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  translations = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authProvider: AuthProvider, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public translate: TranslateService) {
    this.translate.get([
      'Loading.SigningOut'
    ]).subscribe(response => {
      this.translations = response;
    });
  }

  logout() {
    const loader = this.loadingCtrl.create({
      content: this.translations['Loading.SigningOut']
    });

    loader.present();

    this.authProvider.logoutUser()
      .then(() => {
        location.reload(true);
      })
      .catch(
      (errors) => {
        const alert = this.alertCtrl.create({
          title: 'Logout failed',
          subTitle: errors.message,
          buttons: ['OK']
        });

        alert.present();
      }
    );
  }
}
