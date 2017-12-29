import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-log',
  templateUrl: 'new-log.html',
})
export class NewLogPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
