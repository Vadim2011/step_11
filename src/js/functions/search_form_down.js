// выпадающий инпут для ввода поиска

(() => {
  const searchForm = document.querySelector('.search-form');
  const searchBth = searchForm.querySelector('.search-form__icon');
  const searchInput = searchForm.querySelector('.search-form__input');

  document.addEventListener('click', () => {
    searchInput.classList.remove('active');
  });

  searchForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  searchBth.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.toggle('active');
  });
})();


// .input {
//   border: none;
//   border-radius: 10em;
//   height: 44px;
//   max-width: 200px;
//   padding: 0 3em;
//   font-size: 1em;

//   position: absolute;
//   right: 0;
//   top: calc(100% + 30px);
//   opacity: 0;
//   visibility: hidden;
//   pointer-events: none;

//   &::placeholder{
//     font-size: 0.5em;
//     color: gray;
//   }

//   &.active {
//     opacity: 1;
//     visibility: visible;
//     pointer-events: auto;
//     top: calc(100% + 20px);
//   }
// }
