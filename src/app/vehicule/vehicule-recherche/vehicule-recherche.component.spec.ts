import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeRechercheComponent } from './vehicule-recherche.component';

describe('VehiculeRechercheComponent', () => {
  let component: VehiculeRechercheComponent;
  let fixture: ComponentFixture<VehiculeRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
