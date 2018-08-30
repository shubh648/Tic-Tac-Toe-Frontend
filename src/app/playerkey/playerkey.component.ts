import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playerkey',
  templateUrl: './playerkey.component.html',
  styleUrls: ['./playerkey.component.scss']
})
export class PlayerkeyComponent implements OnInit {

  constructor(private router:Router, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
  }

  user1 = this.activatedroute.snapshot.queryParamMap.get('user1');
  user2 = this.activatedroute.snapshot.queryParamMap.get('user2');
  type = this.activatedroute.snapshot.queryParamMap.get('playerType');

  X_Player(){
    this.router.navigate(["/board"], { queryParams: { user1: this.user1, user2: this.user2, playerType: this.type, key: "X" } });
  }

  O_Player(){
    this.router.navigate(["/board"], { queryParams: { user1: this.user1, user2: this.user2, playerType: this.type, key: "O" } });
  }

}
