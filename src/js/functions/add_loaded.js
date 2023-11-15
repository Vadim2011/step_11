// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}
