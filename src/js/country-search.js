import { success, error, notice, info } from '@pnotify/core';

import API from '../js/fetchCountries';

import { renderCountryCard, renderCountryList, outputRef } from './markup';

const debounce = require('lodash.debounce');

const inputRef = document.querySelector('.country-input');

function onCountrySearch (event) {
  event.preventDefault();

  let inputValue = event.target.value;

  if (inputValue !== '') {
    API.fetchCountries(inputValue)
    .then(country => {
      if (country.length === 1) {
        success({
          title: 'Success',
          text: 'now you find your country!',
        });
        return renderCountryCard(country);
      }
      if (country.length >= 2 && country.length <= 10) {
        info({
          title: 'Info',
          delay: 500,
          text: "keep searching and you'll find your country!",
        });
        return renderCountryList(country);
      }
      if (country.length > 10) {
        notice({
          title: 'Notice',
          delay: 500,
          type: 'notice',
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
      if (country.status === 404) {
        error({
          title: 'Error',
          delay: 2000,
          type: 'error',
          text: 'Wrong input!',
        });
      }
    })
    .catch(error => console.log(error));
  }
  outputRef.innerHTML = '';
}

inputRef.addEventListener('input', debounce(onCountrySearch, 500));

