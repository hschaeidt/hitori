import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public userProvider: UserProvider,
              public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
  }

  handleLogin() {
    if (this.email === '' || this.password === '') {
      const alert = this.alertCtrl.create({
        title: 'Invalid Input',
        subTitle: 'An Email address and Password must be specified!',
        buttons: ['OK']
      });

      alert.present();
    } else {
      const loader = this.loadingCtrl.create({
        content: 'Signing in...'
      });

      loader.present();

      this.userProvider.signinUser(this.email, this.password).then(
        () => {
          loader.dismiss();
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(
        (errors) => {
          loader.dismiss();

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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
