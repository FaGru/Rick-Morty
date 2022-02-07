export function Card() {
  console.clear();
  createCharacters();

  async function createCharacters() {
    const baseUrl = 'https://rickandmortyapi.com/api/character?page=';
    const numPages = 5;

    const urls = Array(numPages)
      .fill() // [undefined, undefined, ...]
      .map((_, index) => baseUrl + (index + 1));

    const promises = urls.map(url => fetch(url).then(res => res.json()));

    Promise.all(promises).then(pages => {
      const people = pages.flatMap(page => page.results);
      createObject(people);
    });
  }

  function createObject(people) {
    let cards = [];
    people.forEach(person => {
      cards = cards.concat({
        name: `${person.name}`,
        image: `${person.image}`,
        status: `${person.status}`,
        species: `${person.species}`,
        gender: `${person.gender}`,
        location: `${person.location.name}`,
        episodes: `${person.episode.length}`,
      });
    });
    let locationList = [];
    people.forEach(person => {
      locationList = locationList.concat(person.location.name);
    });
    locationList.unshift('all');
    const locationSet = new Set(locationList);

    buildFilter(locationSet);

    let currentName = '';

    const nameInput = document.querySelector('[data-js="name-filter-input"]');
    nameInput.addEventListener('input', () => {
      currentName = nameInput.value;
      renderCards();
    });

    let currentFilter = 'all';

    const filterContainer = document.querySelector(
      '[data-js="filterContainer"]'
    );
    filterContainer.addEventListener('change', () => {
      console.log(filterContainer.value);
      currentFilter = filterContainer.value;
      renderCards();
    });

    renderCards();

    function renderCards() {
      const cardContainer = document.querySelector('[data-js="cardContainer"]');
      cardContainer.innerHTML = '';

      const nameFilteredCards = cards.filter(
        card =>
          card.name.toLowerCase().includes(currentName.toLowerCase()) ||
          currentName == ''
      );

      nameFilteredCards
        .filter(
          card =>
            card.location.includes(currentFilter) || currentFilter === 'all'
        )
        .forEach(card => {
          const cardElement = document.createElement('article');
          cardElement.className = 'Card';
          cardElement.classList.add(`Card__color--${card.gender}`);
          cardElement.innerHTML = `
          <img class="Card__picture" src=${card.image} height="110" width="110" alt="">
          <h2 class="Card__name">${card.name}</h2>
          <ul class="Card__list">
             <li class="Card__list-element">status: ${card.status}</li>
             <li class="Card__list-element">species: ${card.species}</li>
             <li class="Card__list-element">gender: ${card.gender}</li>
             <li class="Card__list-element" id="location">location: ${card.location}</li>
             <li class="Card__list-element">number of episodes: ${card.episodes}</li>
          </ul>`;
          cardContainer.append(cardElement);
        });
    }

    function buildFilter(tags) {
      const filterContainer = document.querySelector(
        '[data-js="filterContainer"]'
      );
      tags.forEach(tag => {
        const labelElement = document.createElement('option');
        labelElement.className = 'filter__label filter__input';
        labelElement.value = tag;
        labelElement.innerHTML = `
        ${tag}
         `;
        filterContainer.append(labelElement);
      });
    }
  }
}
