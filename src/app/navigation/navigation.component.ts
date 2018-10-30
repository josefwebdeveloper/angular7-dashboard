import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  users;
  currentUser;
  subscription: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private dataService: DataService
  ) {
    this.subscription = this.dataService.getUser().subscribe(currentUser => {

      this.currentUser = currentUser;
      console.log("currentUser navbar", this.currentUser);
      // console.log("index");
      // let obj = this.users.find(obj =>{ 
      //   obj.name.first == 3;
      // });
      // let index = this.users.name.last.indexOf(this.currentUser.name.last);
      let index = this.users.findIndex(par => par.name.last === this.currentUser.name.last);
      console.log("index", index);
     this.users[index]=this.currentUser;
      console.log(" this.users navbar",  this.users);

    });
  }
  // findObjectByKeyAndSave(array, key, value) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i][key] === value) {
  //       return array[i];
  //     }
  //   }
  //   return null;
  // }
  sendUser(user): void {

    this.dataService.sendUser(user);
  }
  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void {
    this.apiService.getUsers()
      .subscribe(users => {


        // console.log("users", users);
        // users=users.results;
        this.users = users['results'];
        console.log("users", this.users);
        return this.users;
      })
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    console.log("subscription destroyed");
  }
}
