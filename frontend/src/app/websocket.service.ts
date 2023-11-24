import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from './environments/environments';

const SOCKET_URL = environment.websocket_endpoint; //

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socket: WebSocketSubject<any>;
  private destroy$ = new Subject<void>();
  
  constructor() {
    this.socket = webSocket(SOCKET_URL);
  }

  public send(data: any) {
    this.socket.next(data);
  }

  public close() {
    this.destroy$.next();
  }
}