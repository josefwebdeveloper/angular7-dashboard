import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  private subject = new Subject<any>();

  sendUser(user) {
    this.subject.next( user );
  }


  getUser(): Observable<any> {
    return this.subject.asObservable();
  }
  sendUsers(users) {
    this.subject.next( users );
  }


  getUsers(): Observable<any> {
    return this.subject.asObservable();
  }

}
