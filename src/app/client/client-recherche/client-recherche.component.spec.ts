import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRechercheComponent } from './client-recherche.component';

describe('ClientRechercheComponent', () => {
  let component: ClientRechercheComponent;
  let fixture: ComponentFixture<ClientRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
