import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketServiceService } from '../socket-service.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  availablePlayers;
  user1;
  user2;
  userType;
  playerKey;
  hideUsers = false;
  msg;


  constructor(private socketService: SocketServiceService, private router: Router, private activatedroute: ActivatedRoute) {
    console.log("came to plyer-list");
  }

  ngOnInit() {
    const { queryParamMap } = this.activatedroute.snapshot;
    this.user1 = queryParamMap.get('user1');
    this.userType = queryParamMap.get('playerType');
    this.socketService.onEventCB('newPlayer', this.addPlayerToList);
    this.initData();
  }

  initData = () => {
    this.socketService.emit('getData', {}, (data) => {
      this.availablePlayers = data;
      console.log('this.availablePlayers', this.availablePlayers);
      if (!this.availablePlayers[0]) {
        this.hideUsers = true;
        this.msg = `No Player Available To Play, You Have To Add Yourself To Available List & Wait For Player Who Join You.`
      } else {
        this.hideUsers = false;
      }
    });
  }

  addPlayerToList = (data) => {
    // if (data.player !== this.user1) {
    //   this.availablePlayers.push(data);
    // }
    // console.log(this.availablePlayers);
    this.initData();
  }

  addToList() {

    // this.socketService.send({ player: this.user1, new: true });
    this.socketService.emit('newGame', { player: this.user1 });
    this.router.navigate(["/waitingPlayer"], { queryParams: { user1: this.user1, playerType: this.userType } });
  }

  joinGame(user1) {
    console.log(user1);
    this.router.navigate(["/board"], { queryParams: { user1: user1, user2: this.user1, playerType: this.userType, key: "X" } });

  }

}
