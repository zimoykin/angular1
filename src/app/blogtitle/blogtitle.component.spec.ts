import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogtitleComponent } from './blogtitle.component';

describe('BlogtitleComponent', () => {
  let component: BlogtitleComponent;
  let fixture: ComponentFixture<BlogtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogtitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
