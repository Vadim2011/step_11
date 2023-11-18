
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
const swipersteps = new Swiper('.steps__content', {
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

const swiperreviews = new Swiper('.reviews__content', {
  // configure Swiper to use modules
  slidesPerView: 1,
  spaceBetween: 10,

  navigation: {
    nextEl: ".reviews__slider-btn--next",
    prevEl: ".reviews__slider-btn--prev",
  },
});
