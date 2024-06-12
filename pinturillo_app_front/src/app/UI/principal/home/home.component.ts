import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Category } from '../../../domain/model/categories/category';
import { CategoryServiceService } from '../../../infraestructure/driven-adapter/category-api/category-service.service';
import { CategoryGateway } from '../../../domain/model/categories/gateway/caregory-gateway';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimations(),
    { provide: CategoryGateway, useClass: CategoryServiceService }
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categoryList: Category[] = [];

  public loginForm      : FormGroup = new FormGroup({});
  public avatarUrl      : string | undefined;
  public tarjetaActivaId: string = 'tarjeta1';

  constructor(
    private _fb    : FormBuilder,
    private router : Router,
    private _storageServ: StorageService,
  ){
    this.loginForm = this._fb.group({
      nick: ['', Validators.required],
      avatar: ['', Validators.required],
    });
    this.changeAvatar();
  }

  ngOnInit(): void {
    localStorage.removeItem('nick');
    localStorage.removeItem('avatar');
  }

  submitForm(): void {

    if (!this.loginForm.value['nick']) {
      this.loginForm.value['nick'] = 'MiNickName123';
    }

    const selectedAvatarUrl = this.avatarUrl ? this.avatarUrl : '../../../../assets/avatars/avatar_0.png';
    this.loginForm.value['avatar'] = selectedAvatarUrl;

    sessionStorage.setItem('nick', this.loginForm.value['nick']);
    sessionStorage.setItem('avatar', selectedAvatarUrl);
    console.log( this.loginForm.value )
    this._storageServ.setUserSessionStorage( this.loginForm.value['nick'], this.loginForm.value['avatar'] );

    this.router.navigate(['rooms']);
  }

  changeAvatar(): void {
    const randomIndex = Math.floor(Math.random() * 26);
    this.avatarUrl = `../../../../assets/avatars/avatar_${randomIndex}.png`;
  }

  changeTarjeta(id: string, botonId: string) {
    document.querySelectorAll('.botones button').forEach((btn: Element) => {
      (btn as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.493)';
    });

    const tarjetaActivaElement = document.getElementById(this.tarjetaActivaId);

    if (tarjetaActivaElement) {
      tarjetaActivaElement.style.display = 'none';
    }

    const element = document.getElementById(id);

    if (element) {
      element.style.display = 'flex';
      const boton = document.getElementById(botonId);

      if (boton) {
        boton.style.backgroundColor = '#fff';
      }

      this.tarjetaActivaId = id;
    }
  }

}
