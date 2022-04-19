export default function fetchCountries(name) {
    const URL = 'https://restcountries.com/v3.1/name';
    const FIELDS = '?fields=name,capital,population,flags,languages';
    return fetch(`${URL}/${name}${FIELDS}`).then(response => {

        if (!response.ok) {
            throw error(response.status);
        }
        return response.json()
    });    
        
};

