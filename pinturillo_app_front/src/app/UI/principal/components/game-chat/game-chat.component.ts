import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { GameDataService } from '../../services/game-data.service';
import { User } from '../../../../domain/model/users/user';
import { Answer } from '../../../../domain/model/answers/answer';
import { CommonModule } from '@angular/common';
import { SocketGameService } from '../../services/socket-game.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';

interface message {
  type        : string;
  data        : string;
  pointsToSum : number;
}

@Component({
  selector: 'app-game-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-chat.component.html',
  styleUrl: './game-chat.component.css'
})
export class GameChatComponent {

  @ViewChild('answers', { static: true }) answersContainer!: ElementRef;
  firstTime: boolean = true;
  playerNameDrawing: string = ''
  canSendMessage: boolean = true;

  public messages: any[] = [];
  public pointsSum: number = 0;

  constructor(private renderer: Renderer2, private socketServ: SocketGameService, private router: Router, private toastServ: ToastService, private storageServ: StorageService, private gameServ: GameDataService) {}

  ngAfterViewInit() { 
    // Haz que se desplace hacia abajo automáticamente
    const scrollDiv = this.answersContainer.nativeElement;
    this.renderer.setProperty(scrollDiv, 'scrollTop', scrollDiv.scrollHeight);
    this.updatePointsSum()

   this.connectToSocket();
  }

  connectToSocket(){
    this.socketServ.$subject.subscribe( (message: any) => {
      
      if( !message ){
        return;
      }

      if( message.includes("type")) return;

      if( !message.includes("error") ){ 

        if( message.includes("has started their turn") ){
          this.playerNameDrawing = message.split(" ")[0];
          this.jugadorDibuja();
        }

        this.receiveMessage( message );
      }
      else{
        this.outGame( message );
      }
    })
  }


  jugadorDibuja(){

    if(this.storageServ.compareNameFromStorage(this.playerNameDrawing)){
      this.canSendMessage = false;
    }
    else{
      this.canSendMessage = true;
    }
  }

  updatePointsSum(){
    this.gameServ.getPointsToSum().subscribe( (points: number ) => {
      this.pointsSum = points;
    })
  }

  sendMessage(event: any){
    const inputElement = event.target as HTMLInputElement;

    if( inputElement.value.trim() === '' ){
      return;
    }

    this.socketServ.sendMessage(JSON.stringify( { type: 'SEND_MESSAGE', data: inputElement.value.trim(), pointsToSum: this.pointsSum} ))
    inputElement.value = '';
  }
  

  outGame( message: string ){

    this.toastServ.showError(  message.split(":")[1].split("}")[0].replace('"', "").replace('"', "")  );
    this.socketServ.close();
    this.messages.push( message );
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.socketServ.close();
  }

  receiveMessage( message: any ){
    this.messages.unshift( message )

  }
}
