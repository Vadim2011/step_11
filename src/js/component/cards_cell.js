
function fixedBlockPlaceScroll() {
  const fixedBlock = document.querySelector('.filters-price');
  const filters = document.querySelector('.filters');
  const container = document.querySelector('.container');

  fixedBlock.classList.remove('fixed');
  fixedBlock.classList.remove('stop-fixed-scroll');
  fixedBlock.style.left = null;
  fixedBlock.style.width = null;

  // fixedBlock.style.removeProperty("width");
  // element.style.removeAttribute("height");


  // get    getComputedStyle(document.documentElement).getPropertyValue('--container-padding-px')
  // set    document.documentElement.style.setProperty('--my-variable-name', 'pink');
  const offsetLeft = container.offsetLeft + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--container-padding').replace(/rem/, "")) * 16;

  const filtersOffsetTop = filters.offsetTop;
  const filtersWidth = fixedBlock.offsetWidth;
  const smallOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--small-padding').replace(/rem/, "")) * 16;

  const fixedScrollBlock = () => {
    let scrollDistance = window.scrollY;

    if (scrollDistance > (filtersOffsetTop - smallOffset) &&
      scrollDistance <= (filters.offsetHeight + filtersOffsetTop)) {

      fixedBlock.style.left = `${offsetLeft}px`;
      fixedBlock.style.width = `${filtersWidth}px`;
      fixedBlock.classList.remove('stop-fixed-scroll');
      fixedBlock.classList.add('fixed');
    } else {
      fixedBlock.style.left = '0px';
      fixedBlock.style.width = '100%';
      fixedBlock.classList.remove('fixed');
    }

    if (scrollDistance >= (filtersOffsetTop - smallOffset + filters.offsetHeight - fixedBlock.offsetHeight)) {
      fixedBlock.classList.add('stop-fixed-scroll');
      fixedBlock.style.left = '0px';
      fixedBlock.style.width = '100%';
      fixedBlock.classList.remove('fixed');
    }
    // console.log(111)
  }

  window.addEventListener('scroll', fixedScrollBlock);
};

fixedBlockPlaceScroll();
// есть баг при скроле на месте работы фиксации сохраняется размер прежний необходимо переместить или обнулить
// console.log(offsetLeft, getComputedStyle(document.documentElement).getPropertyValue('--container-padding'), smallOffset);
//window.addEventListener('resize', fixedBlockPlaceScroll);


