import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionViewComponent } from './emotion-view.component';

describe('EmotionViewComponent', () => {
  let component: EmotionViewComponent;
  let fixture: ComponentFixture<EmotionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
