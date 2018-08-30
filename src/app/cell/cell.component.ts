import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input()
  state: string;

  constructor() { }

  ngOnInit() {
  }

}
