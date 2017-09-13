import { Component } from '@angular/core';
import {
  IonicPage, NavController, ViewController, NavParams, AlertController, LoadingController,
  ModalController
} from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { TabsPage } from "../tabs/tabs";
import { SigninPage } from "../signin/signin";

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
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public alertCtrl: AlertController,
              public userProvider: UserProvider, public loadingCtrl: LoadingController,
              public modalCtrl: ModalController) {
  }

  handleSignup() {
    if (this.email === '' || this.password === '') {
      const alert = this.alertCtrl.create({
        title: 'Sign up failed',
        subTitle: 'Did you forget to enter a Email or Password?',
        buttons: ['OK']
      });

      alert.present();
    }

    else if (this.password !== this.passwordRepeat) {
      const alert = this.alertCtrl.create({
        title: 'Sign up failed',
        subTitle: 'The passwords didn\'t match',
        buttons: ['OK']
      });

      alert.present();
    }

    else {
      const loading = this.loadingCtrl.create({
        content: 'Signing up...'
      });

      loading.present();

      this.userProvider.createUser(this.email, this.password).then(
        () => this.userProvider.signinUser(this.email, this.password)
      ).then(
        () => {
          loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(errors => {
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Sign up failed',
          subTitle: errors.message,
          buttons: ['OK']
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
