import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageViewComponent } from './upload-image-view.component';

describe('UploadImageViewComponent', () => {
  let component: UploadImageViewComponent;
  let fixture: ComponentFixture<UploadImageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
