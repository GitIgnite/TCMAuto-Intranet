import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeCreateComponent } from './vehicule-create.component';

describe('VehiculeCreateComponent', () => {
  let component: VehiculeCreateComponent;
  let fixture: ComponentFixture<VehiculeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
