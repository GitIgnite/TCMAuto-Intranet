import {Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import Swiper, {SwiperOptions} from "swiper";
import {SwiperComponent} from "swiper/angular";

@Component({
  selector: 'app-swiper-img',
  templateUrl: './swiper-img.component.html',
  styleUrls: ['./swiper-img.component.scss']
})
export class SwiperImgComponent implements OnInit {

  @Input()
  public images: any[] = [];

  selectedIndex : number = 0 ;

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 40,
    effect: "fade",
  };

  @ViewChild('swiperRef', { static: false }) swiper?: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  displayImage(imageByteArray: any) {
    let objectURL = 'data:image/png;base64,' + imageByteArray;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  next() {
    this.selectedIndex = this.selectedIndex + 1;
  }

  previous() {
    this.selectedIndex = this.selectedIndex - 1;
  }

  slideTo(index: number) {
    console.log("Slide To : " + index);
    if(this.swiper) {
      this.selectedIndex = index;
      this.swiper.swiper.slideTo(index, 0)
    }
  }

}
