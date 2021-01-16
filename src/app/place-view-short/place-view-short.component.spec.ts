import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceViewShortComponent } from './place-view-short.component';

describe('PlaceViewShortComponent', () => {
  let component: PlaceViewShortComponent;
  let fixture: ComponentFixture<PlaceViewShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceViewShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceViewShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
