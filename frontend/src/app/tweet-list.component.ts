// import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Tweet, TweetComponent } from './tweet.component';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tweet-list',
  template: `
  
  <div class = "buttons">
    <button class= "initButton" (click)="initWebSocket()">Fetch Tweets</button>
    <button class= "stopButton" (click)="stopWebsocket()">Stop Fetching</button>
  </div>

  <div class="tweet-list">

    @for(tweet of testTweets ; track $index){
      <app-tweet [tweet] = 'tweet'></app-tweet>
    }
    @for(tweet of tweets ; track $index){
      <app-tweet [tweet] = 'tweet'></app-tweet>
    }
  </div>

  `,
  styles: [`
    .tweet-list {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 20px;
      margin-top: 1em;
    }

    .initButton,
    .stopButton {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.1s ease;
    }

    .initButton {
      background-color: #4CAF50;
      color: white;
    }

    .stopButton {
      background-color: #f44336;
      color: white;
    }

    .initButton:hover,
    .stopButton:hover {
      background-color: #45a049;
    }

    .initButton:active,
    .stopButton:active {
      transform: translateY(2px);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .app-tweet {
      animation: fadeIn 0.5s ease-in-out;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-top: 10px;
      padding: 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .app-tweet:not(:first-child) {
      animation-delay: 0.3s; // Adjust the delay between tweets
    }
    
  `],
  standalone: true,
  imports: [TweetComponent]
})

export class TweetListComponent implements OnDestroy{
  private socketSubscription: any;
  
  tweets: Tweet[] = [];

  testTweets: Tweet[] = [
    {
      text: 'This is a test tweet 1',
      date: new Date(2002,1, 2),
    },
    {
      text: 'This is a test tweet 2',
      date: new Date(2002, 0, 1),
    },
    {
      text: 'This is a test tweet 3',
      date: new Date(2001, 0, 1),
    },
    // Add more test data as needed
  ];
  
  constructor(private socketService: WebsocketService) {}
  
  initWebSocket() {
    // this.tweets.push(...this.initialTestTweets);
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
