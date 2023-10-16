import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TweetListTestDataComponent } from './tweet-list-test-data.component';

describe('TweetListTestDataComponent', () => {
  let component: TweetListTestDataComponent;
  let fixture: ComponentFixture<TweetListTestDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetListTestDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetListTestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
