import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationPage } from './pesentation';

@NgModule({
  declarations: [
    PresentationPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentationPage),
  ],
})
export class PresentationPageModule {}
