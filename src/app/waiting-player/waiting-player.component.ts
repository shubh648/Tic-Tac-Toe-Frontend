import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../socket-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting-player',
  templateUrl: './waiting-player.component.html',
  styleUrls: ['./waiting-player.component.scss']
})
export class WaitingPlayerComponent implements OnInit {

  constructor( private socketService: SocketServiceService, private router: Router ) { }

  ngOnInit() {
    this.socketService.onEventCB('joinGame', this.waitingForPlayer);
    // this.initData();
  }

  // initData = () => {
  //   this.socketService.emit('getData', {}, (data) => {

  //     this.availablePlayers = data;

  //     console.log('this.availablePlayers', this.availablePlayers);

  //     if (!this.availablePlayers[0] || ((this.availablePlayers.length === 1) && this.availablePlayers[0].player === this.user1)) {
  //       this.hideUsers = true;
  //       this.msg = `No Player Available To Play, You Have To Add Yourself To Available List & Wait For Player Who Join You.`
  //     } else {
  //       this.hideUsers = false;
  //       this.msg = "";
  //     }
  //   });
  // }

  waitingForPlayer = (data) => {
    console.log(data);
    this.router.navigate(["/board"], { queryParams: { user1: data.player1, user2: data.player2, playerType: "MultiPlayer", user1Key: "X", user2Key:"O" } });
    // this.initData();
  }


}
