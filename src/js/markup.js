import countryCardTemplates from '../templates/country-card.hbs';
import countryListTemplates from '../templates/country-list.hbs';

export const outputRef = document.querySelector('.js-container__output');

function markUpRef (markup) {
  return outputRef.innerHTML = markup;
}

export function renderCountryCard (country) {
  markUpRef(countryCardTemplates(country));
}

export function renderCountryList (country) {
  markUpRef(countryListTemplates(country));
}

