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
    const cardContainer = document.querySelector('[data-js="cardContainer"]');
    people.forEach(person => {
      const cardElement = document.createElement('article');
      cardElement.className = 'Card';
      cardElement.innerHTML = `
    <img class="Card__picture" src=${person.image} height="100" width="100" alt="">
    <h2 class="Card__name">${person.name}</h2>
    <ul class="Card__list">
      <li class="Card__list-element">status: ${person.status}</li>
      <li>species: ${person.species}</li>
      <li>gender: ${person.gender}</li>
      <li id="location">location: ${person.location.name}</li>
      <li>number of episodes: ${person.episode.length}</li>
    </ul>
    `;
      cardContainer.append(cardElement);
    });
    let locationList = [];
    people.forEach(person => {
      locationList = locationList.concat(person.location.name);
    });
    const locationSet = new Set(locationList);
    buildFilter(locationSet);

    function buildFilter(tags) {
      const filterContainer = document.querySelector(
        '[data-js="filterContainer"]'
      );
      tags.forEach(tag => {
        const labelElement = document.createElement('label');
        labelElement.className = 'filter__label';
        labelElement.innerHTML = `
       <input type="radio" name="location" data-js="radioButton">${tag}
      `;
        filterContainer.append(labelElement);
      });
    }
    //   const radioButton = document.querySelector('[data-js="radioButton"]')
    // radioButton.addEventListener('change', () => {
    //   const labelElement = document.getElementsByClassName('filter__label')
    //   const cardElement = cardContainer.getElementsByClassName('Card')
    //   if(!document.getElementById('location').textContent.includes(labelElement.textContent)){
    //     cardElement.classList.add('hidden')
    //   } else {
    //     cardElement.classList.remove('hidden')
    //   }
    // })
  }
}
