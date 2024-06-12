import { Component, Inject } from '@angular/core';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { GameChatComponent } from '../components/game-chat/game-chat.component';
import { GameUsersComponent } from '../components/game-users/game-users.component';
import { User } from '../../../domain/model/users/user';
import { GameDataService } from '../services/game-data.service';
import { CommonModule } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { SocketGameService } from '../services/socket-game.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameBoardComponent, GameUsersComponent, GameChatComponent, CommonModule ],
  providers: [provideAnimations()],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  showRanking: boolean = false;
  partidaFinalizada: boolean = false;
  usersRanking: User[]= [];

  constructor(private gameServ:GameDataService, 
              private socketServ: SocketGameService, 
              private storageServ: StorageService, 
              private router: Router ){}

  ngOnInit(): void {
    this.connectUserToGame();
    this.viewIfRoomClose();
  }

  mostrarModal( value: boolean ) {
    this.showRanking = value;
    this.router.navigate(['/home']);
  }

  viewIfRoomClose(){
    this.socketServ.$subject.subscribe( (message: any) => {
      if( !message ){
        return;
      }

      try {

        if( message.includes("The game has been finished.")) this.partidaFinalizada = true;
        if( message.includes("ROOM_USERS") && this.partidaFinalizada ){

          const data = JSON.parse(message).data;
          this.getUsersPodium( data );
        }
      } catch (error) {
        
      }
    })
  } 
  
  getUsersPodium( users: any ){
    users.sort((a: { userPoints: number; }, b: { userPoints: number; }) => b.userPoints - a.userPoints );
    this.usersRanking = users.slice(0, 3);
    this.showRanking = true;
  }

  getUserImage(userImage: string){
    return "../../../../assets/Avatars/" + userImage;
  }

  getIdRoom(): number{
    return parseInt( this.router.url.split("/")[2] );
  }

  parseUserAvatarSessionToServer( avatarSession: string ): string{
    return avatarSession.replace('../../../../assets/Avatars/', '');
  }

  connectUserToGame(){
    const user = this.storageServ.getUserFromSessionStorage();
    console.log(user)
    if( user ){

      const idRoom: number =  this.getIdRoom();
      const userAvatarParsed = this.parseUserAvatarSessionToServer( user.userAvatar );
      this.socketServ.connect( user.userName, userAvatarParsed, idRoom );

    } else{
      this.router.navigate(['/home']);
    }
  }
}
