// вычисление высоты шапки для подстаноски margin: -hight

(() => {

  const firstScreen = document.querySelector('.first-screen');
  if (!firstScreen) return;

  const header = document.querySelector('#header');

  function changeFirstScreenMarginTop() {
    firstScreen.style.maginTop = `-${header.clientHeight}px`
  }

  changeFirstScreenMarginTop();

  window.addEventListener('resize', changeFirstScreenMarginTop);

})();
