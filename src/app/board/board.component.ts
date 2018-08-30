import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../socket-service.service';

import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cells = Array(9).fill(null);
  clicked: boolean = true;
  player;
  winner = null;
  user1;
  user2;
  userType;
  playerKey;
  userTurn;
  user1_move = 0;
  user2_move = 0;
  ioConnection: any


  constructor(private socketService: SocketServiceService, private activatedroute: ActivatedRoute, private router: Router) {
    console.log("came to board")
  }


  ngOnInit() {
    const { queryParamMap } = this.activatedroute.snapshot;
    this.user1 = queryParamMap.get('user1');
    this.user2 = queryParamMap.get('user2');
    this.userType = queryParamMap.get('playerType');
    this.playerKey = queryParamMap.get('key');

    this.player = this.playerKey;
    this.userTurn = this.user1;

    if (!(this.user1 && this.user2 && this.userType && this.playerKey && this.userType)) {
      this.router.navigate([""]);
    }



  }


  get gameStatusMessage() {
    return this.winner ? `${this.winner} has won!` : this.cells.includes(null) ? `${this.userTurn}'s Turn` :
      `Match Draw`;
  }

  compUser() {

    let randomPosition = Math.floor(Math.random() * this.cells.length);

    if (!this.cells[randomPosition]) {

      this.cells[randomPosition] = this.player;
      this.user2_move++;

      if (this.winnigCondition()) {
        this.winner = "COMPUTER";
      }

      this.player = this.player === 'X' ? 'O' : 'X';
      this.userTurn = this.user1;
      this.clicked = true;
    }
    else {
      if (this.cells.includes(null)) {
        this.compUser();
      }
    }

  }

  singlePlayer(position) {
    this.clicked = false;

    if (!this.winner && !this.cells[position]) {
      this.cells[position] = this.player;
      this.user1_move++;
      if (this.winnigCondition()) {
        this.winner = this.user1;
        return;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
      this.userTurn = this.user2;

      if (this.player != this.playerKey && this.userType === "SinglePlayer") {

        setTimeout(this.compUser.bind(this), 1000);

      }
    }
  }

  multiPlayer(position) {

    this.socketService.emit('setPosition', position);

    this.socketService.emit('getPosition', {}, (pos) => {
      console.log(pos);

      if (!this.winner && !this.cells[pos]) {

        this.cells[pos] = this.player;

        (this.userTurn == this.user1) ? this.user1_move++ : this.user2_move++;

        if (this.winnigCondition()) {
          this.winner = this.userTurn;
          return;
        }

        this.player = this.player === 'X' ? 'O' : 'X';
        (this.userTurn == this.user1) ? this.userTurn = this.user2 : this.userTurn = this.user1;
      }
    });
  }

  Move(position) {
    if (this.userType === "SinglePlayer") {
      this.singlePlayer(position);
    }
    else {
      this.multiPlayer(position);
    }
  }

  winnigCondition() {

    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let condition of conditions) {
      if (this.cells[condition[0]] && this.cells[condition[0]] === this.cells[condition[1]]
        && this.cells[condition[1]] === this.cells[condition[2]]) {
        return true;
      }
    }
    return false;

  }

  restartGame() {
    this.cells = Array(9).fill(null);
    this.player = this.playerKey;
    this.winner = null;
    this.clicked = true;
    this.user1_move = 0;
    this.user2_move = 0;
    this.userTurn = this.user1;
  }

}
