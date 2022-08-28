import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket = io(environment.apiV1);

  constructor() { }

  public listen(evt: string): Observable<any> {
    return new Observable((subscribe: any) => {
      this.socket.on(evt, (data) => {
        subscribe.next(data)
      })
    })
  }

  public emit(evt: string, data: any): void {
    this.socket.emit(evt, data)
  }

  public isConnected(): any {
    return this.socket.connected
  }

}
