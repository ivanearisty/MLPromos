import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.sass']
})

export class WebsocketComponent implements OnInit, OnDestroy {
  
  private socketSubscription!: Subscription;
  messages: string[] = [];
  private myWebSocket: WebSocketSubject<string> = webSocket("ws://localhost:4000");

  constructor() { }
  
  ngOnInit() {
    this.socketSubscription = this.myWebSocket.subscribe(
      msg => {
        console.log('Received: ' + msg);
        this.messages.push(msg);
      },
      err => console.log(err),
      () => console.log('Complete')
    );
  }
  
  ngOnDestroy() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    this.myWebSocket.complete();
  }
}
