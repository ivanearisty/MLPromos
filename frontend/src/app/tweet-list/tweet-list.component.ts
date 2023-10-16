import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  `],
  providers: [DatePipe], // Add DatePipe to providers
})

export class TweetListComponent {
  @Input() tweets: Tweet[] = [];
}

