import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getUserFromSessionStorage(){
    const userName = JSON.parse( sessionStorage.getItem('nick')! );
    const userAvatar = JSON.parse( sessionStorage.getItem('avatar')! );

    if( userName && userAvatar ){
      return { userName, userAvatar };
    } 
    return undefined;
  }

  public setUserSessionStorage( nick: string, avatar: string ){
    sessionStorage.setItem('nick', JSON.stringify(nick));
    sessionStorage.setItem('avatar', JSON.stringify(avatar));
  }

  public compareNameFromStorage( nick: string ){
    const user = this.getUserFromSessionStorage();
    
    if( user?.userName === nick ){
      return true;
    }
    return false;
  }
}
