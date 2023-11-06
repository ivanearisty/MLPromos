import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

const SOCKET_URL = environment.websocket_endpoint; //

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: WebSocketSubject<any>;
  // public messages$: Observable<WebSocketSubject<any>>; //this feels insane
  private destroy$ = new Subject<void>();
  
  constructor() {
    this.socket = webSocket(SOCKET_URL);
    // this.messages$ = this.socket.asObservable();
  }

  public send(data: any) {
    this.socket.next(data);
  }

  public close() {
    this.destroy$.next();
  }
}