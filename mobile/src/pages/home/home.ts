import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { NewLogPage } from '../new-log/new-log';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {

  }

  public onNewLogClick(): void {
    let newLogModal = this.modalCtrl.create(NewLogPage);

    newLogModal.onDidDismiss(() => {

    });

    newLogModal.present();
  }
}
