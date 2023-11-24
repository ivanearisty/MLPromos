import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TweetListComponent } from './tweet-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    TweetListComponent
  ],
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = 'ML Promos';
}
