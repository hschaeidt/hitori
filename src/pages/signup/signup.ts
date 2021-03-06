import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController,
  ViewController
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { SigninPage } from '../signin/signin';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  translations = {};
  email = '';
  password = '';
  passwordRepeat = '';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
              public authProvider: AuthProvider, public loadingCtrl: LoadingController,
              public modalCtrl: ModalController, public translate: TranslateService) {
    this.translate.get([
      'Alert.InvalidInput.Title',
      'Alert.InvalidInput.Message',
      'Alert.Button.OK',
      'Alert.SignupFailed.Title',
      'Alert.SignupFailed.Reason.PasswordMismatch',
      'Loading.SigningUp'
    ]).subscribe(response => {
      this.translations = response;
    });
  }

  handleSignup() {
    if (this.email === '' || this.password === '') {
      const alert = this.alertCtrl.create({
        title: this.translations['Alert.InvalidInput.Title'],
        subTitle: this.translations['Alert.InvalidInput.Message'],
        buttons: [this.translations['Alert.Button.OK']]
      });

      alert.present();
    } else if (this.password !== this.passwordRepeat) {
      const alert = this.alertCtrl.create({
        title: this.translations['Alert.SignupFailed.Title'],
        subTitle: this.translations['Alert.SignupFailed.Reason.PasswordMismatch'],
        buttons: [this.translations['Alert.Button.OK']]
      });

      alert.present();
    } else {
      const loading = this.loadingCtrl.create({
        content: this.translations['Loading.SigningUp'],
      });

      loading.present();

      this.authProvider.createUser(this.email, this.password).then(
        () => this.authProvider.signinUser(this.email, this.password)
      ).then(
        () => {
          loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(errors => {
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: this.translations['Alert.SignupFailed.Title'],
          subTitle: (errors && errors.message) || '',
          buttons: [this.translations['Alert.Button.OK']]
        });

        alert.present();
      });
    }
  }

  handleSigninClick() {
    this.dismiss().then(
      () => this.modalCtrl.create(SigninPage).present()
    );
  }

  dismiss() {
    return this.viewCtrl.dismiss();
  }
}
