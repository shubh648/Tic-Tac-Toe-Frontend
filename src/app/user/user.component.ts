import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()

  user_name =[];

  constructor(private router:Router) { }

  onSubmit(username){
    if(username){
      this.user_name.push(username.toUpperCase());
      this.router.navigate(["/playertype"], { queryParams: { user1: this.user_name } });
    }
  }

  

  ngOnInit() {
  }

}
