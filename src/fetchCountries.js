export default { fetchCountries }

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
    ).then(response => {
        // console.log(response.json());
        if (!response.ok) {

            throw new Error(response.status);
        }

        return response.json();

        // }).then(country => {
        //     console.log(country)}
    })
};
