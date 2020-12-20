import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPostViewComponent } from './edit-post-view.component';

describe('EditPostViewComponent', () => {
  let component: EditPostViewComponent;
  let fixture: ComponentFixture<EditPostViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
