import { Component, HostListener } from '@angular/core';
import { RoomsComponent } from '../../principal/rooms/rooms.component';
import { PublicRoomsComponent } from '../components/public-rooms/public-rooms.component';
import { PrivateRoomsComponent } from '../components/private-rooms/private-rooms.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms-layout',
  standalone: true,
  imports: [
    PrivateRoomsComponent,
    PublicRoomsComponent,
    CommonModule
  ],
  templateUrl: './rooms-layout.component.html',
  styleUrl: './rooms-layout.component.css'
})
export class RoomsLayoutComponent {
  isPublic : boolean = false;
  isPrivate : boolean = true;
  isLargeScreen : boolean = window.innerWidth >= 1024;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isLargeScreen = window.innerWidth >= 1024;
  }

  changeToPublic() : void {
    const buttonOne = document.getElementById('button-one');
    const buttonTwo = document.getElementById('button-two');
    buttonOne?.classList.remove('active');
    buttonTwo?.classList.add('active');

    this.isPublic = true;
    this.isPrivate = false;
  }

  changeToPrivate() : void {
    const buttonOne = document.getElementById('button-one');
    const buttonTwo = document.getElementById('button-two');
    buttonOne?.classList.add('active');
    buttonTwo?.classList.remove('active');

    this.isPublic = false;
    this.isPrivate = true;
  }
}
