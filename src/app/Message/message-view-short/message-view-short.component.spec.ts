import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageViewShortComponent } from './message-view-short.component';

describe('MessageViewShortComponent', () => {
  let component: MessageViewShortComponent;
  let fixture: ComponentFixture<MessageViewShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageViewShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageViewShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
