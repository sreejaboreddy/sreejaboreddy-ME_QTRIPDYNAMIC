import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  var ser = search.split("=");
  // Place holder for functionality to work in the Stubs
  return ser[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let url =
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    let a = await fetch(url);
    let y = await a.json();
    return y;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  adventure.images.forEach((element) => {
    document.getElementById(
      "photo-gallery"
    ).innerHTML += `<img src="${element}" class="d-block w-100 activity-card-image" alt="..."></img>`;
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleControls" class="carousel slide " data-bs-ride="carousel">
  <div class="carousel-indicators" id="indicator">
    
  </div>
  <div class="carousel-inner" id="carousel-inner">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

  images.forEach((ele, ind) => {
    const carItem = document.createElement("div");
    const active = ind === 0 ? " active" : "";
    carItem.className = `carousel-item${active}`;
    carItem.innerHTML = `<img src="${ele}" class="d-block w-100 activity-card-image" alt="..."></img>`;
    document.getElementById("carousel-inner").append(carItem);

    const indic = `
    <button type="button"
     data-bs-target="#carouselExampleIndicators" 
     data-bs-slide-to=${ind}
     ${ind === 0 ? "class= active" : ""}
     aria-current="true" aria-label="Slide ${ind}">
      </button>`;
    document.getElementById("indicator").innerHTML += indic;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available === false) 
  {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
  
  else {
    document.getElementById("reservation-panel-available").style.display =
      "block";

    document.getElementById("reservation-panel-sold-out").style.display =
      "none";

    document.getElementById("reservation-person-cost").innerHTML = String(
      adventure.costPerHead
    );
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure, persons)
  document.getElementById("reservation-person-cost").innerHTML = String(
    adventure.costPerHead
  );
  // return adventure.costPerHead*persons
  document.getElementById("reservation-cost").innerHTML = String(
    adventure.costPerHead * persons
  );
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const postObject = {
      name: form.elements[0].value,
      date: form.elements[1].value,
      person: form.elements[2].value,
      adventure: adventure.id,
    };

    try {
      const makeRequest = async (postObject) => {
        const url = config.backendEndpoint + "/reservations/new";

        return await fetch(url, {
          method: "POST",
          body: JSON.stringify(postObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      };
      makeRequest(postObject);
      alert("Success!");
    } catch (err) {
      alert("Failure!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved === true) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
