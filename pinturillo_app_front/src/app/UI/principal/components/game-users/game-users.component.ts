import { Component } from '@angular/core';
import { GameDataService } from '../../services/game-data.service';
import { User } from '../../../../domain/model/users/user';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SocketGameService } from '../../services/socket-game.service';

@Component({
  selector: 'app-game-users',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './game-users.component.html',
  styleUrl: './game-users.component.css'
})
export class GameUsersComponent {
  public  users: User[] = [];

  constructor( private gameServ: GameDataService, private socketServ: SocketGameService ){}

  ngOnInit(): void {

    this.socketServ.sendMessage({ type: 'GET_ROOM_USERS' })
    this.updateUsers();
  }

  updateUsers(){

    this.socketServ.$subject.subscribe( (message: any) => {

      if( !message ){
        return;
      }

      try {
        
        const users = JSON.parse(message);
        this.users = users.data.sort((a: { userPoints: number; }, b: { userPoints: number; }) => b.userPoints - a.userPoints );
      } catch (error) {
        
      }        
    })
  }

  getUserImage(index: number){
    return "../../../../../assets/Avatars/" + this.users[index].userAvatar;
  }

}
