const selectEl = document.querySelector("#dropdown-menu3");
const airportRequest = "https://api.api-ninjas.com/v1/airports?region=";
const airportOptions = {
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "bnQwuT6BX0QsPXbYebfY/A==Y1ZwZQ6OLOMQOTSp",
  },
};
const airportContainerEl = document.querySelector("#airport-container");
const selectedStateNameEl = document.querySelector("#selected-state-display");
const selectedAirportNameEl = document.querySelector(
  "#selected-airport-display"
);
const stateSelect = document.getElementById("selectState");
const selectedStateDiv = document.getElementById("selectedState");
const listedAirport = document.getElementById("airport-container");
const getLatLon =
  "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=wsXVSsYf0yAjFnbzDKM1PbA50VdzYoXM&q=";

const statesList = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

for (var i = 0; i < statesList.length; i++) {
  const stateSelected = statesList[i];
  const listedState = document.createElement("option");
  listedState.textContent = stateSelected;
  listedState.value = stateSelected;
  stateSelect.appendChild(listedState);
}

stateSelect.addEventListener("change", () => {
  const selectedState = stateSelect.value;
  selectedStateDiv.textContent = selectedState;
  localStorage.setItem("selectedState", selectedState);
  getAirports(airportRequest);
});

function displaySelection() {
  const savedState = localStorage.getItem("selectedState");

  if (savedState !== null) {
    selectedStateDiv.textContent = savedState;
    stateSelect.value = savedState;

    getAirports(airportRequest);
  }
}

// var x = document.querySelector("option[value=Select]");
// x.setAttribute("disable", "true")
// console.log("X: ", x)

function getAirports(airportRequestUrl) {
  const savedState = localStorage.getItem("selectedState");

  if (savedState !== null) {
    airportContainerEl.textContent = "";

    fetch(airportRequestUrl + savedState, airportOptions)
      .then(function (response) {
        console.log(response.status);
        response.json().then(function (data) {
          console.log(data);
          displayAirports(data, savedState);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

function displayAirports(airports, stateName) {
  selectedStateNameEl.textContent = stateName;

  for (var i = 0; i < airports.length; i++) {
    const airportName = airports[i].name + ", " + airports[i].city;
    const airportLat = airports[i].latitude;
    const airportLon = airports[i].longitude;

    var airportEl = document.createElement("div");
    airportEl.classList =
      "list-item flex-row justify-space-between align-center";
    airportEl.dataset.lat = airportLat;
    airportEl.dataset.lon = airportLon;
    airportEl.onclick = function (event) {
      // listedAirport.forEach((selectedAirport) => {
      //   removeAttribute(selectedAirport);
      // });
      var element = event.target;
      // element.classList = "selected-airport";
      var lat = element.getAttribute("data-lat");
      var lon = element.getAttribute("data-lon");
      getWeather(lat, lon);
      return;
    };

    var titleEl = document.createElement("span");
    titleEl.textContent = airportName;

    airportEl.appendChild(titleEl);

    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    airportEl.appendChild(statusEl);

    airportContainerEl.appendChild(airportEl);
  }
}

displaySelection();

function getWeather(lat, lon) {
  fetch(`${getLatLon}${lat},${lon}`)
    .then(function (response) {
      console.log(response.status);
      response.json().then(function (data) {
        console.log(data);
        const weatherKey = data.Key;
        console.log(weatherKey);
        keyWeather(weatherKey);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function keyWeather(weatherKey) {
  const weatherRequest = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${weatherKey}?apikey=wsXVSsYf0yAjFnbzDKM1PbA50VdzYoXM`;

  fetch(weatherRequest)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data.DailyForecasts[0]);
          var x = document.createElement("p");
          x.textContent = JSON.stringify(data.DailyForecasts[0].Temperature);
          document.querySelector("body").appendChild(x);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      console.log(err);
    });
}
