const selectEl = document.querySelector("#dropdown-menu3");
const airportRequest = "https://api.api-ninjas.com/v1/airports?region=";
const airportOptions = {
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "bnQwuT6BX0QsPXbYebfY/A==Y1ZwZQ6OLOMQOTSp",
  },
};
const airportContainerEl = document.querySelector("#airport-container");
const selectedStateNameEl = document.querySelector("selected-state-display");

//const weatherRequest = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/347625?apikey=wsXVSsYf0yAjFnbzDKM1PbA50VdzYoXM";
const stateSelect = document.getElementById("selectState");
const selectedStateDiv = document.getElementById("selectedState");
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
    fetch(airportRequestUrl + savedState, airportOptions)
      .then(function (response) {
        console.log(response.status);
        response.json().then(function (data) {
          console.log(data);
          // displayAirports(data, savedState);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

// function displayAirports(airports, stateName) {
//   selectedStateNameEl.textContent = stateName;

//   for (var i = 0; i < airports.length; i++) {
//     const airportName =
//   }
// }

displaySelection();

// fetch(weatherRequest)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data.DailyForecasts[0]);
//           var x = document.createElement("p");
//           x.textContent = JSON.stringify(data.DailyForecasts[0].Temperature);
//           document.querySelector("body").appendChild(x)
//       })

//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {

//
//     });

// selectEl.addEventListener('click', stateSelect)
