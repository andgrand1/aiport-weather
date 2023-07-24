var selectEl = document.querySelector('#states');


var statesList = ['Select','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

for (let i = 0; i < statesList.length; i++){
    var optionEl = document.createElement('option');
    optionEl.textContent = statesList[i];
    optionEl.setAttribute("value", statesList[i]);
    optionEl.setAttribute("class", "option-element");
    //console.log(optionEl);
    selectEl.appendChild(optionEl);
}

// var x = document.querySelector("option[value=Select]");
// x.setAttribute("disable", "true")
// console.log("X: ", x)

fetch('https://api.publicapis.org/entries')
.then(function(response) {
    console.log("RES: ", response)
    return response.json();
})
.then(function (data) {
    console.log("DATA: ", data.entries[0].Description)
    var x = document.createElement("p");
    x.textContent = data.entries[0].Description;
    document.querySelector("body").appendChild(x)
})
.catch(function (err) {
    console.log(err)
})

