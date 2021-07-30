import { Alert, AlertType } from './../../_models/alert';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    this.clear();
    message = '<span class="alert-icon alert-icon-success"><i class="bi bi-check-lg"></i></span><span class="alert-title alert-title-success">SUCCESS:</span>'+ '<span class="alert-message alert-message-success">'+message+'</span>';
    this.alert(new Alert({  ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: any) {
    this.clear();
    message = '<span class="alert-icon alert-icon-error"><i class="bi bi-exclamation-triangle-fill"></i></span><span class="alert-title alert-title-error">ERROR:</span>'+ '<span class="alert-message alert-message-error">'+message+'</span>';
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: any) {
    this.clear();
    message = '<span class="alert-icon alert-icon-info"><i class="bi bi-exclamation-circle-fill"></i></span><span class="alert-title alert-title-info">INFO:</span>'+ '<span class="alert-message alert-message-info">'+message+'</span>';
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: any) {
    this.clear();
    message = '<span class="alert-icon alert-icon-warn"><i class="bi bi-exclamation-circle-fill"></i></span><span class="alert-title alert-title-warn">WARNING:</span>'+ '<span class="alert-message alert-message-warn">'+message+'</span>';
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method    
  alert(alert: Alert) {
      alert.id = alert.id || this.defaultId;
      this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
      this.subject.next(new Alert({ id }));
  }
}
