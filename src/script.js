function weatherSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter");
  let cityElement = document.querySelector("#city-name");
cityElement.innerHTML = cityInput.value;
}

let searchformElemet = document.querySelector("#search-form");
searchformElemet.addEventListener("submit", weatherSearch);