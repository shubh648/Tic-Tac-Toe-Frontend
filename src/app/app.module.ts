import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { StartButtonComponent } from './start-button/start-button.component';

import { routingModule } from './routing.module';
import { AppHomeComponent } from './app-home/app-home.component';
import { UserComponent } from './user/user.component';
import { PlayertypeComponent } from './playertype/playertype.component';
import { PlayerkeyComponent } from './playerkey/playerkey.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { WaitingPlayerComponent } from './waiting-player/waiting-player.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    StartButtonComponent,
    AppHomeComponent,
    UserComponent,
    PlayertypeComponent,
    PlayerkeyComponent,
    PlayerListComponent,
    WaitingPlayerComponent,
  ],
  imports: [
    BrowserModule,
    routingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
