import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { BoardComponent } from './board/board.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { UserComponent } from './user/user.component';
import { PlayertypeComponent } from './playertype/playertype.component';
import { PlayerkeyComponent } from './playerkey/playerkey.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { WaitingPlayerComponent } from './waiting-player/waiting-player.component';

const routes: Routes = [
    { path: '',  component: AppHomeComponent },
    { path: 'board',  component: BoardComponent },
    { path: 'user',  component: UserComponent },
    { path: 'playertype',  component: PlayertypeComponent },
    { path: 'playerkey',  component: PlayerkeyComponent },
    { path: 'playerlist',  component: PlayerListComponent },
    { path: 'waitingPlayer',  component: WaitingPlayerComponent },   
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);