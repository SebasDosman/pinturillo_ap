import { Injectable, signal } from '@angular/core';
import { RoomGateway } from '../../../domain/model/rooms/gateway/room-gateway';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { CreateRoom } from '../../../domain/model/rooms/create-room';
import { Room } from '../../../domain/model/rooms/room';
import { Word } from '../../../domain/model/words/word';
import { env } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService extends RoomGateway {
  constructor(private http: HttpClient) {
    super();
  }

  private destroy$: Subject<void> = new Subject()
  url = signal(`${ env.SERVER_URL }/room`)

  override getAll(): Observable<Room[]> | null {
    try {
      return this.http.get<Room[]>(`${ this.url() }/getAll`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override findById(_id: number): Observable<Room> | null {
    try {
      return this.http.get<Room>(`${ this.url() }/findById/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override findWords(_id: number): Observable<Word[]> | null {
    try {
      return this.http.get<Word[]>(`${ this.url() }/findWords/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override create(room: CreateRoom): Observable<Room> | null {
    try {
      return this.http.post<Room>(`${ this.url() }/create`, room);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override update(room: Room): Observable<Room> | null {
    try {
      return this.http.put<Room>(`${ this.url() }/update`, room);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  override delete(_id: number): Observable<any> | null {
    try {
      return this.http.delete<any>(`${ this.url() }/delete/${ _id }`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
