import { Routes } from '@angular/router';
import { HomeComponent } from './UI/principal/home/home.component';
import { GameComponent } from './UI/principal/game/game.component';
import { RoomsLayoutComponent } from './UI/layouts/rooms-layout/rooms-layout.component';

export const routes: Routes = [
    { path: "home"          , component : HomeComponent             },
    { path: "rooms"         , component : RoomsLayoutComponent      },
    { path: "game/:id"      , component : GameComponent             },
    { path: "**"            , redirectTo: "home"                    },
];
