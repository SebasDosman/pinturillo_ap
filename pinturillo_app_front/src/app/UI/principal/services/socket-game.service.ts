import { Injectable } from '@angular/core';

import {env} from '../../../enviroments/enviroments';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketGameService{

  private ws: WebSocket | undefined;
  private url: string = env.SERVER_URL + '/room/';

  subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public $subject: Observable<any> = this.subject.asObservable();

  constructor() {}

  connect( userName: string, userAvatar: string, idRoom: number ){
    this.ws = new WebSocket( this.url + idRoom + '/' + userName + '/' + userAvatar );
    console.log( this.url + idRoom + '/' + userName + '/' + userAvatar  );

    this.ws.onopen = () =>{
      console.log('Connected to server');
    }

    this.ws.onmessage = (msg) =>{
      this.subject.next( msg.data );
    }

    this.ws.onerror = (err) =>{
      console.error( 'WebSocket Error', err );
    }

    this.ws.onclose = () =>{
      console.log( 'Disconnected to the server' );
    }
  }

  webSocketConnect(){
    return this.ws;
  }

  sendMessage( message: any ){
    
    if( this.ws ){

      if( this.ws.readyState === WebSocket.OPEN ) {
        this.ws.send( message );
      }
      else {
        console.error('WebSocket is not open, state: ' + this.ws.readyState );
      }
    }
  }

  close(){
    if( this.ws ){
      this.ws.close();
    }
  }
}
