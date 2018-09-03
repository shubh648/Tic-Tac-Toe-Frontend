import { Component, OnInit, OnDestroy } from '@angular/core';
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
  player1Key;
  player2Key;
  userTurn;
  user1_move = 0;
  user2_move = 0;
  ioConnection: any
  currentUser: string;

  constructor(private socketService: SocketServiceService, private activatedroute: ActivatedRoute, private router: Router) {
    console.log("came to board")
  }


  ngOnInit() {
    const { queryParamMap } = this.activatedroute.snapshot;
    this.user1 = queryParamMap.get('user1');
    this.user2 = queryParamMap.get('user2');
    this.userType = queryParamMap.get('playerType');
    this.player1Key = queryParamMap.get('user1Key');
    this.player2Key = queryParamMap.get('user2Key');
    this.currentUser = queryParamMap.get('currentUser') || 'user1';

    this.player = this.player1Key;

    if (!(this.user1 && this.user2 && this.userType && this.player1Key && this.player2Key)) {
      this.router.navigate([""]);
    }


    if (this.userType === "MultiPlayer") {
      this.socketService.onEventCB('multiPlayer', this.multiPlayer);
      this.socketService.onEventCB('restart', this.restart);
      this.socketService.onEventCB('destroy', this.destroy);
    }

    this.userTurn = this.user1;

  }

  destroy = (data) => {
    if (this.userType === "MultiPlayer") {
      alert("Game Ended By User");
      this.router.navigate([""]);
    }

  }


  ngOnDestroy() {
    if (this.userType === "MultiPlayer") {
      this.socketService.emit('destroy', { player1: this.user1, player2: this.user2 });
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


    if (!this.winner && !this.cells[position]) {
      this.clicked = false;
      this.cells[position] = this.player;
      this.user1_move++;
      if (this.winnigCondition()) {
        this.winner = this.user1;
        return;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
      this.userTurn = this.user2;

      if (this.player != this.player1Key && this.userType === "SinglePlayer") {

        setTimeout(this.compUser.bind(this), 1000);

      }
    }
  }

  multiPlayer = (position) => {

    if (!this.winner && !this.cells[position]) {

      this.cells[position] = this.player;

      (this.userTurn == this.user1) ? this.user1_move++ : this.user2_move++;

      if (this.winnigCondition()) {
        this.winner = this.userTurn;
        return;
      }

      this.player = this.player === 'X' ? 'O' : 'X';

      (this.userTurn == this.user1) ? this.userTurn = this.user2 : this.userTurn = this.user1;

      if (this.userTurn == this[this.currentUser]) {
        return this.clicked = true;
      }
    }
  }

  Move(position) {
    if (this.userType === "SinglePlayer") {
      this.singlePlayer(position);
    }
    else {

      if (this.userTurn != this[this.currentUser]) {
        return this.clicked = false;
      }

      this.socketService.emit('multiPlayer', position);

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

  restart = (data) => {
    this.cells = Array(9).fill(null);
    this.player = this.player1Key;
    this.winner = null;
    this.clicked = true;
    this.user1_move = 0;
    this.user2_move = 0;
    this.userTurn = this.user1;
  }

  restartGame() {
    if (this.userType === "SinglePlayer") {
      this.restart(null);
    }
    else {
      this.socketService.emit('restart', "restart");
    }
  }

}
