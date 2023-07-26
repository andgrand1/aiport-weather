var selectEl = document.querySelector("#states");
const airportRequest =
  "https://api.api-ninjas.com/v1/airports?region=California";
const airportOptions = {
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "bnQwuT6BX0QsPXbYebfY/A==Y1ZwZQ6OLOMQOTSp",
  },
};

var statesList = [
  "Select",
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

// var x = document.querySelector("option[value=Select]");
// x.setAttribute("disable", "true")
// console.log("X: ", x)

function getApi(airportRequestUrl) {
  fetch(airportRequestUrl, airportOptions)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    });
}

getApi(airportRequest);
