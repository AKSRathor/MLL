import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiHomeKeyrowComponent } from './api-home-keyrow.component';

describe('ApiHomeKeyrowComponent', () => {
  let component: ApiHomeKeyrowComponent;
  let fixture: ComponentFixture<ApiHomeKeyrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiHomeKeyrowComponent]
    });
    fixture = TestBed.createComponent(ApiHomeKeyrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
