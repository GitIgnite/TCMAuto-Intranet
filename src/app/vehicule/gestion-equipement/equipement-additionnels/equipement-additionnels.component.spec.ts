import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementAdditionnelsComponent } from './equipement-additionnels.component';

describe('EquipementAdditionnelsComponent', () => {
  let component: EquipementAdditionnelsComponent;
  let fixture: ComponentFixture<EquipementAdditionnelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementAdditionnelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementAdditionnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
