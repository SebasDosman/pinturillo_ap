import { Injectable } from "@angular/core";
import { RoomGateway } from "../../model/rooms/gateway/room-gateway";
import { Observable } from "rxjs";
import { Room } from "../../model/rooms/room";
import { Word } from "../../model/words/word";

@Injectable({
  providedIn: 'root'
})
export class GetRoomUseCase {
  constructor(private _roomGateway: RoomGateway) { }

  getAll(): Observable<Room[]> | null {
    return this._roomGateway.getAll();
  }

  findById(_id: number): Observable<Room> | null {
    return this._roomGateway.findById(_id);
  }

  findWords(_id: number): Observable<Word[]> | null {
    return this._roomGateway.findWords(_id);
  }
}
