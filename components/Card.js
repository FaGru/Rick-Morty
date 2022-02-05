export function Card() {
  console.clear();
  createCharacters();

  async function createCharacters() {
    try {
      const response = await fetch(
        'https://rickandmortyapi.com/api/character?page=1%22'
      );
      const data = await response.json();
      createObject(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function createObject(people) {
    let cards = []
    people.forEach(person => {
        cards = cards.concat(
          {
            name: `${person.name}`,
            image: `${person.image}`,
            status: `${person.status}`,
            species: `${person.species}`,
            gender: `${person.gender}`,
            location: `${person.location.name}`,
            episodes:`${person.episode.length}`,
          }
        )
      })
      console.log(cards)
    let locationList = [];
    people.forEach(person => {
    locationList = locationList.concat(person.location.name);
    });
    locationList.unshift('all')
    const locationSet = new Set(locationList);

    buildFilter(locationSet);

    let currentFilter = 'all';

    const filterContainer = document.querySelector('[data-js="filterContainer"]')
    filterContainer.addEventListener('change', () => {
    currentFilter = filterContainer.elements.location.value;
    renderCards();
    })

    renderCards();


    function renderCards() {
    const cardContainer = document.querySelector('[data-js="cardContainer"]')
    cardContainer.innerHTML = '';

    cards
      .filter(card => card.location.includes(currentFilter) || currentFilter === 'all')
      .forEach(card => {
        const cardElement = document.createElement('article');
        cardElement.className = 'Card';
        cardElement.innerHTML = `
          <img class="Card__picture" src=${card.image} height="100" width="100" alt="">
          <h2 class="Card__name">${card.name}</h2>
          <ul class="Card__list">
             <li class="Card__list-element">status: ${card.status}</li>
             <li>species: ${card.species}</li>
             <li>gender: ${card.gender}</li>
             <li id="location">location: ${card.location}</li>
             <li>number of episodes: ${card.episodes}</li>
          </ul>`;
         cardContainer.append(cardElement);
      })
    }

    function buildFilter(tags) {
       const filterContainer = document.querySelector('[data-js="filterContainer"]')
       tags.forEach(tag => {
       const labelElement = document.createElement('label');
       labelElement.className = 'filter__label';
       labelElement.innerHTML = `
        <input type="radio" name="location" value=${tag} data-js="radioButton">${tag}
         `;
       filterContainer.append(labelElement);
       });
    }
  }
}
