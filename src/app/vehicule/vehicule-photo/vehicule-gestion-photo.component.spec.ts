import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeGestionPhotoComponent } from './vehicule-gestion-photo.component';

describe('VehiculePhotoComponent', () => {
  let component: VehiculeGestionPhotoComponent;
  let fixture: ComponentFixture<VehiculeGestionPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeGestionPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeGestionPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
