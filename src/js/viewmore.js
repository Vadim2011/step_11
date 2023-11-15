let dataExample;
let startExample = 0;
let endExample = 3;

const portfolio = document.querySelector('.portfolio__items');
const veiwMore = document.querySelector('.portfolio__btn');

(async function () {
  if (!portfolio) {
    return
  }

  const response = await fetch("example.json", {
    method: "GET"
  });

  if (response.ok) {
    dataExample = await response.json();

    veiwMore.addEventListener('click', initialExample);
    veiwMore.hidden = dataExample.items.length ? false : true;

  } else {
    console.log('not json file or error');
  }
})();


function initialExample() {

  const partData = dataExample.items.slice(startExample, endExample);
  startExample = endExample;
  endExample = startExample + 3;

  partData.forEach(el => {

    let examplItemElem = `<article class="portfolio__item example">
    <a href="${el.url}" class="example__link-img" target="_blank" aria-label="${el.arialabel}"
      rel="nofollow">
      <img loading="lazy" src="${el.img}" height="500" alt="${el.alt}"
        class="example__img">
    </a>
    <h3 class="example__title subtitle">${el.title}</h3>
    <div class="example__text">
      <p>${el.text}</p>
    </div>
    <a href="${el.url}" class="example__link" target="_blank" aria-label="${el.arialabel}"
      rel="nofollow">Перейти</a>
  </article>
  `
    portfolio.insertAdjacentHTML('beforeend', examplItemElem);
  });

  if (dataExample.items.length <= startExample) {
    veiwMore.hidden = true;
  }
}
