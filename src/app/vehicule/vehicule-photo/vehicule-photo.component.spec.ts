import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculePhotoComponent } from './vehicule-photo.component';

describe('VehiculePhotoComponent', () => {
  let component: VehiculePhotoComponent;
  let fixture: ComponentFixture<VehiculePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculePhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
