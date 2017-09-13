import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider, public alertCtrl: AlertController) {
  }

  logout() {
    this.userProvider.logoutUser().then(() => location.reload()).catch(
      (errors) => {
        const alert = this.alertCtrl.create({
          title: 'Login failed',
          subTitle: errors.message,
          buttons: ['OK']
        });

        alert.present();
      }
    );
  }
}
