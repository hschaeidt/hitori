import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, ViewController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { TranslateService } from '@ngx-translate/core';

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
  email = '';
  password = '';

  constructor(public alertCtrl: AlertController, public authProvider: AuthProvider,
              public viewCtrl: ViewController, public loadingCtrl: LoadingController,
              public modalCtrl: ModalController, public translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get([
      'Alert.InvalidInput.Title',
      'Alert.InvalidInput.Message',
      'Alert.Button.OK',
      'Alert.LoginFailed.Title',
      'Loading.SigningIn',
    ]).subscribe(response => {
      this.translations = response;
    });
  }

  handleLogin() {
    const inputDataIsValid: boolean = this.isInputDataValid();

    if (inputDataIsValid) {
      const loader = this.loadingCtrl.create({
        content: this.translations['Loading.SigningIn'],
      });

      const loaderResponse = loader.present();

      this.authProvider.signinUser(this.email, this.password).then(
        () => {
          location.reload(true);
        },
      ).catch(
        (errors) => {
          loaderResponse
            .then(() => loader.dismiss())
            .catch(errors => {
              console.log(errors);
            });

          const alert = this.alertCtrl.create({
            title: this.translations['Alert.LoginFailed.Title'],
            subTitle: errors.message,
            buttons: [this.translations['Alert.Button.OK']],
          });

          alert.present().catch((errors) => {
            console.log(errors);
          });
        },
      );
    }
  }

  handleSignupClick() {
    this.dismiss().then(
      () => this.modalCtrl.create(SignupPage).present(),
    );
  }

  dismiss() {
    return this.viewCtrl.dismiss();
  }

  private isInputDataValid() {
    if (this.email === '' || this.password === '') {
      const alert = this.alertCtrl.create({
        title: this.translations['Alert.InvalidInput.Title'],
        subTitle: this.translations['Alert.InvalidInput.Message'],
        buttons: [this.translations['Alert.Button.OK']],
      });

      alert.present().catch((errors) => {
        console.log(errors);
      });

      return false;
    }

    return true;
  }
}
