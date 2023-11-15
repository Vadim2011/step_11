/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) document.documentElement.classList.add('touch');
}
/* Проверка мобильного браузера */
export let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  }, BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  }, iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }, Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  }, Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  }, any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
