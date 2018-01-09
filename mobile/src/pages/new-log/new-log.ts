import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { InstructorProvider } from '../../providers/instructor/instructor-provider';
import { Instructor } from '../../providers/instructor';
import { Entry } from '../../providers/entry';

@Component({
  selector: 'page-new-log',
  templateUrl: 'new-log.html',
})
export class NewLogPage {
  private entry: Entry;
  private instructors: Instructor[];

  constructor(public viewCtrl: ViewController, private instructorProvider: InstructorProvider) {

  }

  
  ionViewDidLoad() {
    this.entry = new Entry();
    
    this.instructorProvider.getAllInstructors().then((instructors) => {
      this.instructors = instructors;
    }).catch(() => {
      // TODO: Show error toast
    });
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
