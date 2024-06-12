import { Injectable } from '@angular/core';
import { AlertsService } from 'mk-magic-alerts';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private alertSvc: AlertsService ) { }

  showError( message: string ){
    this.alertSvc.showError( message );
  }

  showSuccess( message: string ){
    this.alertSvc.showSuccess( message );
  }
}
