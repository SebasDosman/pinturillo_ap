import { Injectable } from "@angular/core";
import { RoomGateway } from "../../model/rooms/gateway/room-gateway";
import { CreateRoom } from "../../model/rooms/create-room";
import { Observable } from "rxjs";
import { Room } from "../../model/rooms/room";

@Injectable({
  providedIn: 'root'
})
export class CreateRoomUseCase {
  constructor(private _roomGateway: RoomGateway) { }

  create(room: CreateRoom): Observable<Room> | null {
    return this._roomGateway.create(room);
  }
}
