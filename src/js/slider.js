
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(".steps__content", {
//   slidesPerView: 'auto',
// });


import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper';
// import Swiper and modules styles
Swiper.use([Navigation, Pagination, Scrollbar]);
// import 'swiper/css';


// init Swiper:
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  slidesPerView: 'auto',
  spaceBetween: 0,
  scrollbar: {
    el: ".steps__scroll",
    draggable: true,
  },
  navigation: {
    nextEl: ".steps__slider-btn--next",
    prevEl: ".steps__slider-btn--prev",
  },
});
