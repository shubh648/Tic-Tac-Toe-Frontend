import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-player',
  templateUrl: './waiting-player.component.html',
  styleUrls: ['./waiting-player.component.scss']
})
export class WaitingPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.onbeforeunload = function() { return "Your work will be lost."; };

  }


}
