import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
  ) {
    this.subscription = this.dataService.getUser().subscribe(user => {

      this.user = user;
      console.log("user", this.user);
      this.image=this.user.picture.large;
      this.show=`${this.user.name.first}  ${this.user.name.last}`;
    });
  }

  users;
  user;
  subscription: Subscription;
  showheader='Hi, My name is';
  show;
  image;
 
  ngOnInit() {
   
  }
  sendUser(user): void {

    this.dataService.sendUser(user);
  }
   changedateformat(input) {
    var d = new Date(input);
    return [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/');
  }
  usericon;
  mailicon;
  listicon;
  mapicon;
  phoneicon;
  lockicon;
  changeText(icon) {
    console.log(icon);
    if (icon == 'usericon') {
      this.usericon = true;
      this.mailicon = false;
      this.listicon = false;
      this.mapicon = false;
      this.phoneicon = false;
      this.lockicon = false;
      this.showheader='Hi, My name is';
      this.show=`${this.user.name.first}  ${this.user.name.last}`;

    } else if (icon == 'mailicon') {
      this.usericon = false;
      this.mailicon = true;
      this.listicon = false;
      this.mapicon = false;
      this.phoneicon = false;
      this.lockicon = false;
      this.showheader='My email address is';
      this.show=this.user.email;
    }else if (icon == 'listicon') {
      this.usericon = false;
      this.mailicon = false;
      this.listicon = true;
      this.mapicon = false;
      this.phoneicon = false;
      this.lockicon = false;
      this.showheader='My birthday is';
 
      this.show=this.changedateformat(this.user.dob.date);
    }
    else if (icon == 'mapicon') {
      this.usericon = false;
      this.mailicon = false;
      this.listicon = false;
      this.mapicon = true;
      this.phoneicon = false;
      this.lockicon = false;
      this.showheader='My address is';
      this.show=this.user.location.street;
    }
    else if (icon == 'phoneicon') {
      this.usericon = false;
      this.mailicon = false;
      this.listicon = false;
      this.mapicon = false;
      this.phoneicon = true;
      this.lockicon = false;
      this.showheader='My phone number is';
      this.show=this.user.cell;
    }else if (icon == 'lockicon') {
      this.usericon = false;
      this.mailicon = false;
      this.listicon = false;
      this.mapicon = false;
      this.phoneicon = false;
      this.lockicon = true;
      this.showheader='My password is';
      this.show=this.user.login.password;
    }

  }
  voteUser() {
    // console.log("user vote Usercomp",this.user);
    if (this.user.vote) {
      this.user.vote += 1;
    } else {
      this.user.vote = 1;
    }
    console.log("user vote Usercomp", this.user);
    this.sendUser(this.user);

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log("subscription destroyed");
    this.subscription.unsubscribe();
    // console.log("subscription destroyed");
  }

}
