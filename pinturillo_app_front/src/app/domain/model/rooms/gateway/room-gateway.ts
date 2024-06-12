import { Observable } from "rxjs";
import { CreateRoom } from "../create-room";
import { Room } from "../room";
import { Word } from "../../words/word";

export abstract class RoomGateway {
  abstract getAll() : Observable<Room[]> | null;
  abstract findById(_id: number) : Observable<Room> | null;
  abstract findWords(_id: number) : Observable<Word[]> | null;
  abstract create(room: CreateRoom) : Observable<Room> | null;
  abstract update(room: Room) : Observable<Room> | null;
  abstract delete(_id: number) : Observable<any> | null;
}
