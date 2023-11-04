import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../tweet/tweet.component';

@Component({
  selector: 'app-tweet-list',
  template: `
    <div class="tweet-list">
      <app-tweet-item
        *ngFor="let tweet of tweets"
        [tweet]="tweet"
      ></app-tweet-item>
    </div>
  `,
  styles: [`
    .tweet-list {
      border: 1px solid #ccc;
      padding: 10px;
    }
  `]
})

export class TweetListComponent implements OnInit{
  constructor() { }

  ngOnInit(){

  }

  // @Input() tweets: Tweet[] = [];
  tweets: Tweet[] = [
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
}

