import { Injectable } from "@angular/core";
import { RoomGateway } from "../../model/rooms/gateway/room-gateway";
import { Room } from "../../model/rooms/room";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModifyRoomUseCase {
  constructor(private _roomGateway: RoomGateway) { }

  update(room: Room): Observable<Room> | null {
    return this._roomGateway.update(room);
  }

  delete(_id: number): Observable<any> | null {
    return this._roomGateway.delete(_id);
  }
}
