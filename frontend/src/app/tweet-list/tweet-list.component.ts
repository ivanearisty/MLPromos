// import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet/tweet.component';
import { SocketService } from '../services/socket-service.service' 
import { map } from 'rxjs';

@Component({
  selector: 'app-tweet-list',
  template: `
    <div class="tweet-list">
      <button (click)="initWebSocket()">Fetch Tweets</button>
      <button (click)="stopWebsocket()">Stop Fetching</button>
      <app-tweet-item *ngFor="let tweet of tweets" [tweet]="tweet"></app-tweet-item>
    </div>
  `,
  styles: [`
    .tweet-list {
      border: 1px solid #ccc;
      padding: 10px;
    }
  `]
})

export class TweetListComponent implements OnDestroy{
  private socketSubscription: any;
  
  tweets: Tweet[] = [];
  initialTestTweets: Tweet[] = [
    {
      text: 'This is a test tweet 1',
      date: new Date(2002,1, 2),
    },
    {
      text: 'This is a test tweet 2',
      date: new Date(2002, 0, 1),
    },
    // Add more test data as needed
  ];
  
  constructor(private socketService: SocketService) {}
  
  initWebSocket() {
    this.tweets.push(...this.initialTestTweets);
    console.log("Initializing Websocket Connection");
    this.socketSubscription = this.socketService.socket.pipe(
      map((message: any) => {
        try {
          console.log("Mapping message to tweet");
          console.log(message);
          const parsedMessage = JSON.parse(message);
          this.tweets.push(...parsedMessage); // Add the parsed message to the 'tweets' array
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      })
    ).subscribe();      
  }

  stopWebsocket(){
    this.socketSubscription.unsubscribe();
  }

  ngOnDestroy() {
    console.log("Destorying Websocket Connection");
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }
}

  