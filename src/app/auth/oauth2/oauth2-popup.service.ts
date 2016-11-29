import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
interface IPopupOptions {
  height?: number
  width?: number
}
@Injectable()
export class Oauth2PopupService {

  public interval: number;
  public name: string;
  public popup: Window;
  private pollingSubscription: Subscription;
  private previousPromise: Promise<any>;

  constructor() {
    let onBeforeUnload: any = window.onbeforeunload;
    window.onbeforeunload = () => {
      if (typeof onBeforeUnload === 'function') {
        onBeforeUnload();
      }
      this.closeAndCleanup();
    };
  }

  open(url: string, options: IPopupOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.popup) {
        this.closeAndCleanup();
      }
      this.name = 'oauth2_popup_' + Date.now().toString();
      this.popup = window.open(url, this.name, Oauth2PopupService.stringifyOptions(options));
      if (!this.popup || this.popup.closed) {
        reject(new Error('remote could not open or was closed'));
        return;
      } else {
        this.popup.focus();
      }
      // close detected
      let polling = this.schedulePooling();
      this.pollingSubscription = polling.subscribe((v) => {
        if (v && v == 'closed'){
          reject(new Error('Remote was closed or a authentication message otherwise not received before the window closed.'));
        }
      });

    }).catch((value) => { this.finally(value); throw value });
  }

  schedulePooling(): Observable<any> {
    let subj = new Subject();
    this.interval = window.setInterval(() => {
      // Popup closed
      if (this.popup && this.popup.closed) {
        subj.next('closed');
      }
    }, 35);
    return subj.asObservable();
  }

  finally(value: any): any {
    this.closeAndCleanup();
    return value;
  }

  closeAndCleanup() {
    clearInterval(this.interval);
    if (this.popup && !this.popup.closed) {
      this.popup.close();
    }
    if (this.name) {
      this.pollingSubscription.unsubscribe();
    }
    this.name = null;
    this.popup = null;
  }

  protected static stringifyOptions(options: IPopupOptions): string {
    options = options || {width: 400, height: 500};
    let parts = [];
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        parts.push(key + '=' + options[key]);
      }
    }
    return parts.join(',');
  }
}
