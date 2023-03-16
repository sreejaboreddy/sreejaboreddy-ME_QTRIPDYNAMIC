import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const x = search.split("=");
  return x[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the
  try {
    let url = config.backendEndpoint+`/adventures?city=${city}`;
    let a = await fetch(url);
    let y = await a.json();
    return y;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.forEach((element) => {
    document.getElementById("data").innerHTML += `
  <div class="col-6 col-lg-3 mb-3 ">
    <a href="detail/?adventure=${element.id}" id="${element.id}">
      <div class=" card ">
      <img class="activity-card img" src="${element.image}" />
       <div class="category-banner">${element.category}</div>
       <div class="card-body  text-center d-md-flex justify-content-between">
       <h5 class="card-title">${element.name}</h5>
       <p class="card-text">₹${element.costPerHead}</p>
      </div>
        <div class="card-body  text-center d-md-flex justify-content-between ">
          <h5 class="card-title">Duration</h5>
          <p class="card-text">${element.duration} Hours</p>
        </div>
      </div>
    </a>
  </div>
    `;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  var result = [];

  list.forEach((element) => {
    if (element.duration >= low && element.duration <= high)
      result.push(element);
  });
  return result;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  var res = [];
  list.forEach((element) => {
    if (categoryList.includes(element.category)) res.push(element);
  });

  return res;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  var dur = filters.duration;
  var rest;
  if (filters.category.length === 0 && dur === "") return list;
  if (filters.category.length !== 0 && dur === "") {
    rest = filterByCategory(list, filters.category);
  }
  if (dur !== "" && filters.category.length === 0) {
    var s = dur.split("-");
    rest = filterByDuration(list, parseInt(s[0]), parseInt(s[1]));
  }
  if (filters.category.length !== 0 && dur !== "") {
    var s = dur.split("-");
    var rest1 = filterByDuration(list, parseInt(s[0]), parseInt(s[1]));
    rest = filterByCategory(rest1, filters.category);
  }
  return rest;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters" , JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const fil = localStorage.getItem("filters");
  if(fil != null){
    return JSON.parse(fil);
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  document.getElementById("category-list").textContent = "";
  //TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter walue and Gener
  filters.category.forEach((category) => {
    let pillEle = document.createElement("div");
    pillEle.className = "category-filter";
    pillEle.innerHTML = `<div> ${category}</div›`;
    document.getElementById("category-list").appendChild(pillEle);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
