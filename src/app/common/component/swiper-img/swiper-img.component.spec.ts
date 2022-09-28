import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperImgComponent } from './swiper-img.component';

describe('SwiperImgComponent', () => {
  let component: SwiperImgComponent;
  let fixture: ComponentFixture<SwiperImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
