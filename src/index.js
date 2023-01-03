import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import countryCardTmp from './templates/country-card.hbs';
import countryListTmp from './templates/country-list.hbs';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const wrapperEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function handleCountryName(event) {
  event.preventDefault();
  const searchCountry = event.target.value.trim();
  listEl.innerHTML = '';
  wrapperEl.innerHTML = '';

  fetchCountries(searchCountry)
    .then(data => {
      if (data.length === 1) {
        return wrapperEl.insertAdjacentHTML('beforeend', countryCardTmp(data));
      }
      if (data.length >= 2 && data.length < 10) {
        return listEl.insertAdjacentHTML('beforeend', countryListTmp(data));
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that namee');
    });
}

inputEl.addEventListener('input', debounce(handleCountryName, DEBOUNCE_DELAY));
