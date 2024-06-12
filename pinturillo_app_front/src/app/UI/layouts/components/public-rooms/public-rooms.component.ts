import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoomServiceService } from '../../../../infraestructure/driven-adapter/room-api/room-service.service';
import { Room } from '../../../../domain/model/rooms/room';
import { Router } from '@angular/router';


@Component({
  selector: 'app-public-rooms',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './public-rooms.component.html',
  styleUrl: './public-rooms.component.css'
})
export class PublicRoomsComponent implements OnInit{

  private roomService = inject(RoomServiceService);

  roomsList: any[] = [];

  constructor( private router: Router ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  private loadRooms(): void {
    this.roomService.getAll()?.subscribe((res: Room[]) => {
      this.roomsList = res.filter(room => room.state === 'En curso' || room.state === 'Sin iniciar');
    });
  }

  selectedRoom(event: Event, room: Room) {
    if (event && event.target) {
      const previouslySelected = document.querySelector('.selected');
      if (previouslySelected) previouslySelected.classList.remove('selected');

      const roomElement = (event.target as HTMLElement).closest('.room');
      if (roomElement) roomElement.classList.add('selected');

      this.router.navigate(['game/' + room.id]);
    }
  }

}
