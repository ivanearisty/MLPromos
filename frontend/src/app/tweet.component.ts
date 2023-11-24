import { Component, Input} from "@angular/core";
import { DatePipe } from "@angular/common";

export interface Tweet {
  text: string;
  date: Date;
}

@Component({
  selector: 'app-tweet',
  imports: [DatePipe],
  standalone: true,
  template: `
    <div class="tweet-item">
      <div class="tweet-content">{{ tweet.text }}</div>
      <div class="tweet-date">{{ tweet.date | date:'medium' }}</div>
    </div>
  `,
  styles: [`
    .tweet-item {
      border: 2px solid #eee;
      padding: 10px;
      margin-bottom: 10px;
    }

    .tweet-content {
      font-size: 14px;
    }

    .tweet-date {
      font-size: 12px;
      color: #888;
    }
  `],
})

export class TweetComponent {
  @Input() tweet!: Tweet;
}