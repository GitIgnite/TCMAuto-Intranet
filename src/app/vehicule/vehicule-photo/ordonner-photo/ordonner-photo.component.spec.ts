import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnerPhotoComponent } from './ordonner-photo.component';

describe('OrdonnerPhotoComponent', () => {
  let component: OrdonnerPhotoComponent;
  let fixture: ComponentFixture<OrdonnerPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnerPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnerPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
