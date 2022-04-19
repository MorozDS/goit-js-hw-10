import './css/styles.css';
import fetchCountries from './js/fetchCountries';
// import renderCountry from './js/renderCountry';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const searchinput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

searchinput.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(e) {
    e.preventDefault();
    const textInput = searchinput.value.trim();
countryList.innerHTML = '';
    info.innerHTML = '';
    fetchCountries(textInput)
        .then(checkLength).catch(error => {

            if (textInput !== '') {return Notiflix.Notify.failure('Oops, there is no country with that name');}
        
    });
  
      
   
}


function checkLength(data) {
    if (data.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    };
   
    renderCountry(data);
};








function renderCountry(data) {
const ar = data.map(({ name: { official }, flags: { svg } }) => {
    return `<li><img src="${svg}" alt="${official}" width="100" height="70"/> ${official}</li>`;
    })
.join('')

    if (data.length === 1) {
        const languages = Object.values(data[0].languages).join(', ');

        const markupInfo = `<ul>
        <li>Capital: ${data[0].capital}</li>
        <li>Population: ${data[0].population}</li>
        <li>Languages: ${languages}</li>
        </ul>`;

        info.insertAdjacentHTML("beforeend", markupInfo);
    }
    return countryList.insertAdjacentHTML("beforeend", ar);
}
