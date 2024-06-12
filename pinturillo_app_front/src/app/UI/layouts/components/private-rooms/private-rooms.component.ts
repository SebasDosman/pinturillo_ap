import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../principal/services/storage.service';
import { Router } from '@angular/router';
import { CategoryServiceService } from '../../../../infraestructure/driven-adapter/category-api/category-service.service';
import { RoomServiceService } from '../../../../infraestructure/driven-adapter/room-api/room-service.service';
import { Category } from '../../../../domain/model/categories/category';
import { Room } from '../../../../domain/model/rooms/room';
import { NgFor } from '@angular/common';
import { ToastService } from '../../../principal/services/toast.service';

@Component({
  selector: 'app-private-rooms',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './private-rooms.component.html',
  styleUrl: './private-rooms.component.css'
})
export class PrivateRoomsComponent implements OnInit {

  private categoryService = inject(CategoryServiceService);
  private roomService = inject(RoomServiceService);
  private toastr = inject(ToastService);

  public avatarUrl: string = '';

  categoryList: Category[] = [];
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageServ: StorageService,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      roomName: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const user = this.storageServ.getUserFromSessionStorage();
    this.avatarUrl = user?.userAvatar ? user.userAvatar : 'avatar.png';

    this.categoryService.getAll()?.subscribe((res: Category[]) => {
      this.categoryList = res;
    });
  }

  createRoom(): void {
    if (this.roomForm.invalid) {
      this.toastr.showError('Error: All fields are required');
      return;
    }

    const newRoom: Room = {
      name: this.roomForm.value.roomName,
      state: 'Sin iniciar',
      idCategory: this.roomForm.value.category,
    };

    this.roomService.create(newRoom)?.subscribe((res) => {
        this.toastr.showSuccess('Room created successfully');
        console.log('Room created successfully:', res);
        this.router.navigate(['game/' + res.id]);
        // window.location.reload();
      },(error) => {
        this.toastr.showError(error.error.idCategory || error.error.name || 'Error creating room' );
        console.error('Error creating room:', error);
      }
    );

  }
}
