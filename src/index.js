import './css/styles.css';
import API from './fetchCountries'

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchForm: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
    // event.preventDefault();
    const nameCountry = refs.searchForm.value.trim();
    if (nameCountry === '') {
        return ((refs.countryList.innerHTML = ''),
            (refs.countryInfo.innerHTML = ''));
    };


    API.fetchCountries(nameCountry)
        .then(response => {
            console.log(response);
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';

            if (response.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

            } else if (response.length <= 10 && response.length >= 2) {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(response));

            } else {
                refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(response));
            }

        })
        .catch(() => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            return [];
        })
}



function renderCountryInfo(countries) {
    return countries.map((country) => {
        console.log(country)
        return `<img src=${country.flags.svg} alt="flag" width="100" hight="100">
<h2 class = country-info__name>${country.name.official}</h2>
 <ul class="country-info__list">
            <li class="country-info__item"><p><b>Name: </b>${country.name.official}</p></li>
            <li class="country-info__item"><p><b>Capital: </b>${country.capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${country.population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(country.languages)}</p></li>
        </ul>`;
    }).join('');


    // refs.countryInfo.innerHTML = markup;
};


function renderCountryList(countries) {
    return countries
        .map((country) => {
            return `
          <li class = country-list__item>
            <img class = country-list__img src="${country.flags.svg}" alt="${country.name.official}" width="30" hight="30">
            <p class = country-list__name>${country.name.official}</p>
          </li>
      `;
        }).join("");
    // refs.countryList.innerHTML = markup;
}
// { { } }


// fetchCountries()
// console.log(fetchCountries(ukraine))
// function fetchCountries(name) {
//     fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
//     ).then(response => {
//         // console.log(response.json());

//         return response.json();

//     }).then(country => {
//         console.log(country)

//     }).catch(error => {
//         console.log(error)
//     })
//     return country.map(
//         ({
//             flags: ${ svg },
//         name: ${ official },
//         capital,
//         population,
//         languages
//     }) => {
//     return `<img src=${svg} alt="flag" width="100"></img>
// <h2 >${official}</h2>
//  <p >Capital: <span>${capital}</span> </p>
// <p >Population: <span>${population}</span></p>
//  <p >Languages: <span>${languages}</span></p>
//  `
// }
//  )
// };