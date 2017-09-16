import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, ViewController
} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SignupPage } from "../signup/signup";
import { TranslateService } from "@ngx-translate/core";
import "rxjs/add/operator/mergeMap";

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
  translations = {};
  email: string = '';
  password: string = '';

  constructor(public alertCtrl: AlertController, public userProvider: UserProvider,
              public viewCtrl: ViewController, public loadingCtrl: LoadingController,
              public modalCtrl: ModalController, public translate: TranslateService) {
    this.translate.get([
      'Alert.InvalidInput.Title',
      'Alert.InvalidInput.Message',
      'Alert.Button.OK',
      'Alert.LoginFailed.Title',
      'Loading.SigningIn'
    ]).subscribe(response => {
      this.translations = response;
    });
  }

  handleLogin() {
    if (this.email === '' || this.password === '') {
      const alert = this.alertCtrl.create({
        title: this.translations['Alert.InvalidInput.Title'],
        subTitle: this.translations['Alert.InvalidInput.Message'],
        buttons: [this.translations['Alert.Button.OK']]
      });

      alert.present();
    } else {
      const loader = this.loadingCtrl.create({
        content: this.translations['Loading.SigningIn']
      });

      loader.present();

      this.userProvider.signinUser(this.email, this.password).then(
        () => {
          location.reload();
        }
      ).catch(
        (errors) => {
          loader.dismiss();

          const alert = this.alertCtrl.create({
            title: this.translations['Alert.LoginFailed.Title'],
            subTitle: errors.message,
            buttons: [this.translations['Alert.Button.OK']]
          });

          alert.present();
        }
      );
    }
  }

  handleSignupClick() {
    this.dismiss().then(
      () => this.modalCtrl.create(SignupPage).present()
    );
  }

  dismiss() {
    return this.viewCtrl.dismiss();
  }
}
