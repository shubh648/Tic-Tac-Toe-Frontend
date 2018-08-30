import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketServiceService } from '../socket-service.service';

@Component({
  selector: 'app-playertype',
  templateUrl: './playertype.component.html',
  styleUrls: ['./playertype.component.scss']
})
export class PlayertypeComponent implements OnInit {

  user1;
  hidden = true;
  errMsg;

  constructor(private socketService: SocketServiceService, private router: Router, private activatedroute: ActivatedRoute) {
    console.log("came to plyertype");
  }

  ngOnInit() {

    this.user1 = this.activatedroute.snapshot.queryParamMap.get('user1');

  }

  singlePlayer() {

    this.router.navigate(["/playerkey"], { queryParams: { user1: this.user1, user2: "COMPUTER", playerType: "SinglePlayer" } });
  }

  multiPlayer() {

    this.checkData(this.user1);
  }

  onSubmit(username) {
    if (username) {

      this.checkData(username);

      if (this.hidden === false) {
        this.errMsg = "Username Already Exist.";
      }

    }
  }

  checkData(username) {
    this.socketService.emit('getData', {}, (data) => {

      if (data && data.some(e => e.player === username.toUpperCase())) {
        this.hidden = false;
      }
      else {
        this.hidden = true;
        this.router.navigate(["/playerlist"], { queryParams: { user1: username.toUpperCase(), playerType: "MultiPlayer" } });
      }
    });
  }

}
