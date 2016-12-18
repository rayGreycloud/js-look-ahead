// Data source
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// Initial variable for data to search
const cities = [];

// Use built-in browser method to fetch data
fetch(endpoint)
  .then(blob => blob.json())
  // Push onto data to search
  .then(data => cities.push(...data));

// Search data using search input
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // Create regex using input value
    const regex = new RegExp(wordToMatch, 'gi');
    // Return item if either city or state match
    return place.city.match(regex) || place.state.match(regex)
  });
}

// Format number with commas (for population)
function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Display search results
function displayMatches() {
  // Create results array
  const matchArray = findMatches(this.value, cities);
  // Create li for each match
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">POP: ${numberWithCommas(place.population)}</span>
      </li>
    `;
  // Convert from array of li strings to 1 string list
  }).join('');
  // Set suggestions field to list
  suggestions.innerHTML = html;
}

// Grab elements
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Trigger search and display update when search field value changes or keyups
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
