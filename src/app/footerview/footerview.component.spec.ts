import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterviewComponent } from './footerview.component';

describe('FooterviewComponent', () => {
  let component: FooterviewComponent;
  let fixture: ComponentFixture<FooterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
