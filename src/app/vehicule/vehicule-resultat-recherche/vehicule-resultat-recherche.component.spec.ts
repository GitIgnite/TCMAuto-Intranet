import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeResultatRechercheComponent } from './vehicule-resultat-recherche.component';

describe('ResultatRechercheComponent', () => {
  let component: VehiculeResultatRechercheComponent;
  let fixture: ComponentFixture<VehiculeResultatRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeResultatRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeResultatRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
