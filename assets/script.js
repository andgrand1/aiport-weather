const airportRequest = "https://api.api-ninjas.com/v1/airports?region=";
const airportOptions = {
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "bnQwuT6BX0QsPXbYebfY/A==Y1ZwZQ6OLOMQOTSp",
  },
};
const airportContainerEl = document.querySelector("#airport-container");
const weatherContainerEl = document.querySelector("#weather-container");
const selectedStateNameEl = document.querySelector("#selected-state-display");
const selectedAirportNameEl = document.querySelector(
  "#selected-airport-display"
);
const stateSelect = document.getElementById("selectState");
const selectedStateDiv = document.getElementById("selectedState");
const getLatLon =
  "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=he2cZTB2Vlx8rA2Gj6ezwTEYbrBvZ6vN&q=";

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
};

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
    airportEl.setAttribute("data-lat", airportLat);
    airportEl.setAttribute("data-lon", airportLon);
    airportEl.onclick = function (event) {
      var element = event.target;
      // when click, check elements for "selected-airport"
      // if element w/"selected-airport" exists, remove "selected-airport"
      if (document.querySelector("#selected-airport")) {
        console.log("it exists");
        document.querySelector("#selected-airport").removeAttribute("id");
      }
      element.setAttribute("id", "selected-airport");
      var selected = document.querySelector("#selected-airport");
      console.log(selected);
      var lat = element.getAttribute("data-lat");
      var lon = element.getAttribute("data-lon");
      console.log(lat, lon, airportName);
      getWeather(lat, lon, airportName);
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

function getWeather(lat, lon, name) {
  fetch(`${getLatLon}${lat},${lon}`)
    .then(function (response) {
      console.log(response.status);
      response.json().then(function (data) {
        console.log(data);
        const weatherKey = data.Key;
        console.log(weatherKey, name);
        keyWeather(weatherKey, name);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function keyWeather(weatherKey, airport) {
  const weatherRequest = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${weatherKey}?apikey=he2cZTB2Vlx8rA2Gj6ezwTEYbrBvZ6vN`;

  fetch(weatherRequest)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          selectedAirportNameEl.textContent = airport;
          weatherSummary = data.Headline.Text;
          
          weatherTemperatureMin =
            data.DailyForecasts[0].Temperature.Minimum.Value +
            " " +
            data.DailyForecasts[0].Temperature.Minimum.Unit;
          weatherTemperatureMax =
            data.DailyForecasts[0].Temperature.Maximum.Value +
            " " +
            data.DailyForecasts[0].Temperature.Maximum.Unit;

          var weatherEl = document.createElement("div");
          weatherEl.classList =
            "list-item flex-row justify-space-between align-center";

          var summaryEl = document.createElement("span");
          summaryEl.classList = "flex-row align-center";
          summaryEl.textContent = weatherSummary;

          weatherEl.appendChild(summaryEl);

          var tempEl = document.createElement("span");
          tempEl.classList = "flex-row align-center";
          tempEl.textContent =
            "Temperature range: " +
            weatherTemperatureMin +
            " -" +
            weatherTemperatureMax;

          weatherEl.appendChild(tempEl);

          weatherContainerEl.appendChild(weatherEl);
        });
      }
    })
    .catch(function (error) {
      console.log(err);
    });
}
