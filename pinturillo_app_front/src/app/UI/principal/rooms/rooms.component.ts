import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [],
  providers: [provideAnimations()],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

}
