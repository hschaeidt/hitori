import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from "../signin/signin";
import { SignupPage } from "../signup/signup";

/**
 * Generated class for the PresentationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  handleLogin() {
    this.modalCtrl.create(SigninPage).present();
  }

  handleSignup() {
    this.modalCtrl.create(SignupPage).present();
  }
}
