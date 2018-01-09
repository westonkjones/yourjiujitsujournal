import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';

import { Instructor } from '../instructor';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstructorProvider {
  private database: SQLiteObject;
  private databaseStateSubject: BehaviorSubject<boolean>;
  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    this.databaseStateSubject = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'instructors.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        
        this.databaseInit();

        this.databaseStateSubject.next(true);
      });
    });
  }

  private databaseInit(): void {
    this.createInstructorTable();
  }

  private createInstructorTable(): void {
    this.database.executeSql("CREATE TABLE IF NOT EXISTS instructor(id integer primary key autoincrement NOT NULL, firstName Text NOT NULL, lastName Text NOT NULL, belt TEXT NOT NULL)", []);
  }
  
  public addInstructor(instructor: Instructor): Promise<Instructor> {
    return this.database.executeSql('INSERT INTO instructor (firstName, lastName, belt) VALUES (?, ?, ?)',
      [instructor.getFirstName(), instructor.getLastName(), instructor.getBelt()]).then(data => {
        return data;
      }, error => {
        return error;
      });
  }

  public getAllInstructors(): Promise<Instructor[]> {
    return this.database.executeSql('SELECT * FROM instructor', []).then(data => {
      let instructors = [];
      if(data.rows.length > 0) {
        data.rows.foreach(instructor => {
          instructors.push(new Instructor(instructor.firstName, instructor.lastName, instructor.belt));
        })
      }

      return instructors;
    });
  }

  public getDatabaseStateObservable(): Observable<boolean> {
    return this.databaseStateSubject.asObservable();
  }
}
