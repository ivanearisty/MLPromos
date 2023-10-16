import { Component } from '@angular/core';
import { Tweet } from '../tweet/tweet.component';

@Component({
  selector: 'app-tweet-list-test-data',
  template: '',
})
export class TweetListTestDataComponent {
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
