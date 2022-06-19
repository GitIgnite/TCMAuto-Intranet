import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEquipementComponent } from './gestion-equipement.component';

describe('GestionEquipementComponent', () => {
  let component: GestionEquipementComponent;
  let fixture: ComponentFixture<GestionEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
