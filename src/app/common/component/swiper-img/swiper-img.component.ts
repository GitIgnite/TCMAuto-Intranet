import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import {DomSanitizer} from "@angular/platform-browser";
import {SwiperComponent} from "swiper/angular";

@Component({
  selector: 'app-swiper-img',
  templateUrl: './swiper-img.component.html',
  styleUrls: ['./swiper-img.component.scss']
})
export class SwiperImgComponent implements OnInit {

  @Input()
  public images: any[] = [];

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 40,
    effect: "fade"
  };

  @ViewChild('swiperRef', { static: false }) swiper?: SwiperComponent;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  displayImage(imageByteArray: any) {
    let objectURL = 'data:image/png;base64,' + imageByteArray;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  slideTo(index: number) {
    console.log("Slide To : " + index);
    if(this.swiper && this.swiper.swiperRef) {
      this.swiper.swiperRef.slideTo(index - 1, 0);
    }
  }
}
