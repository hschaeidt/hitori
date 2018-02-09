import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-about',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profile: Profile = {
    publicName: ''
  };

  constructor(public profileProvider: ProfileProvider,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    const loading = this.loadingCtrl.create({
      content: 'Loading profile...'
    });

    loading.present();

    profileProvider.getCurrentUserProfile().subscribe(
      ({data}) => {
        if (data.user !== null && data.user.profile !== null) {
          this.profile.id = data.user.profile.id;
          this.profile.publicName = data.user.profile.publicName;
        }

        loading.dismiss();
      }, () => {
        loading.dismiss();
    });
  }

  handleSaveChanges() {
    const loading = this.loadingCtrl.create({
      content: 'Saving changes...'
    });

    loading.present();

    if (this.profile.id) {
      this.profileProvider.updateCurrentUserProfile(this.profile.id, this.profile.publicName).subscribe(
        ({data}) => {
          this.profile.publicName = data.updateProfile.publicName;
          loading.dismiss();
        }
      );
    } else if (this.profile.publicName.trim() === '') {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Recheck Profile',
        subTitle: 'It seems there is a problem with your profile data :(',
        buttons: ['OK']
      }).present();
    } else {
      this.profileProvider.createCurrentUserProfile(this.profile.publicName).then(
        (result) => result.subscribe(({data}) => {
          this.profile.id = data.createProfile.id;
          loading.dismiss();
        })
      );
    }
  }
}
