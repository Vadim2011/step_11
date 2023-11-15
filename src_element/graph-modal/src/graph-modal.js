export default class GraphModal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    }                     // назначать асигновать
    this.options = Object.assign(defaultOptions, options);
    // получаем модальное окно по классу
    this.modal = document.querySelector('.graph-modal');
    this.speed = 300;
    // блекнуть
    this.animation = 'fade';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    // работа с блоками с фиксированным позиционированием добавить класс
    this._fixBlocks = document.querySelectorAll('.fix-block');
    // вызываем метод
    this.events();
  }

  events() {
    // если найдено окно
    if (this.modal) {
      document.addEventListener('click', function (e) {
        // данн в эл по кот клик --
        // button
        // class="btn-reset modal-btn modal-1"
        // data-graph-path="first"
        // data-graph-animation="fadeInUp"
        // data-graph-speed="500"

        //  на документ навешиваем событие клик если ближайший содержит дата атрибут
        const clickedElement = e.target.closest(`[data-graph-path]`);
        if (clickedElement) {
          //  плучаем кдасс модального окно из данных елемента
          let target = clickedElement.dataset.graphPath;
           //  плучаем стиль анимащии из данных елемента
          let animation = clickedElement.dataset.graphAnimation;
           //  плучаем скорость из данных елемента
          let speed = clickedElement.dataset.graphSpeed;
           //  если получ данные по анимации иначе дефолт знач
          this.animation = animation ? animation : 'fade';
           //  если получ данные по скорости иначе дефолт
          this.speed = speed ? parseInt(speed) : 300;
          // получаем модальное окно
          // данн в мод окне --
          // div
          // class="graph-modal__container"
          // role="dialog"
          // aria-modal="true"
          // data-graph-target="first">
          // <button class="btn-reset graph-modal__close js-modal-close"
          // aria-label="Закрыть модальное окно"></button>
          // <div class="graph-modal__content"

          this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`);
          // вызываем функц откр
          this.open();
          return;
        }

        // если при клике по докум элемент по которому кликнули содержит класс закрыть ПО Х
        if (e.target.closest('.js-modal-close')) {
          // вызываем ф-ю закрыть
          this.close();
          return;
        }
      }.bind(this));

      // закрытие при клике ПО Esc
      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }

      // клавиша tab
        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));

      // второй слушатель на том же уровне модальные окна сложены в контейнер с класс graph-modal закрытие по ОБЛАСТИ
      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('graph-modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }

  }

  open(selector) {
    // елемент на котором было сфокусировано событие
    this.previousActiveElement = document.activeElement;

    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }

    // под модальное окно которое вызывает кнопка
    this.modalContainer = this._nextContainer;

    // если передан селектор иначе селектор из кнопки
    if (selector) {
      this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
    }

    //
    this.modalContainer.scrollTo(0, 0)
    //  устанавливаем переменную
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    // добавляем класс к модальному контейнеру
    this.modal.classList.add('is-open');
    // свойство скролла чтобы небыло прыжка к телу
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';

    //  отключаем скролл
    this.disableScroll();
    // добавляем к под модальному класс
    this.modalContainer.classList.add('graph-modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('graph-modal-open');

      this.enableScroll();

      document.body.style.scrollBehavior = '';
      document.documentElement.style.scrollBehavior = '';

      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();

      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement)
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}
