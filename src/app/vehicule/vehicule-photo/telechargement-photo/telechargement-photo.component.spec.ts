import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargementPhotoComponent } from './telechargement-photo.component';

describe('TelechargementPhotoComponent', () => {
  let component: TelechargementPhotoComponent;
  let fixture: ComponentFixture<TelechargementPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelechargementPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelechargementPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
