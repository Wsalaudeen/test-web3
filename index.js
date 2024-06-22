// Initialize an array to keep track of all desks
const desks = [];

// Initialize an object to track revenue for different membership tiers and total revenue
const revenues = {
  total: 0,
  basic: 0,
  premium: 0,
  executive: 0,
};

// Get references to various DOM elements that will be manipulated

const deskGrid = document.getElementById("desk-grid");
const formEl = document.getElementById("form");
const totalCharge = document.getElementById("total-charge");
const totalRevenue = document.getElementById("total-revenue");
const basicRevenue = document.getElementById("basic-revenue");
const premiumRevenue = document.getElementById("premium-revenue");
const executiveRevenue = document.getElementById("executive-revenue");

// Loop to create and initialize 15 desk elements
for (let i = 0; i < 15; i++) {
  const desk = document.createElement("div");
  desk.classList.add("desk");
  desk.dataset.index = i; // setting th index of the desk
  desk.dataset.type = i < 10 ? "individual" : "team"; // setting the type based on the index
  desk.innerText = i < 10 ? `${i + 1}` : `${i - 9}`; //the desk label
  desk.addEventListener("click", handleClick); // adding a click for event listener
  deskGrid.appendChild(desk); // appending the desk to the grid
  desks.push({
    element: desk, // Reference to the desk element
    booked: false,
    type: desk.dataset.type,
  });
}

formEl.addEventListener("click", handleFormSubmit);

function handleClick(event) {
  const deskIndex = event.target.dataset.index;
  const desk = desks[deskIndex];

  if (desk.booked) {
    alert("This desk is already booked.");
    return;
  }

  document.getElementById("desk-type").value = desk.type;
  document.getElementById("desk-type").disabled = true;
}

// Function to handle form submissions

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission
  const deskType = document.getElementById("desk-type").value;
  const membershipTier = document.getElementById("membership-tier").value;
  const hours = parseInt(document.getElementById("hours").value, 10);
  const deskIndex = desks.findIndex((d) => d.type === deskType && !d.booked);

  if (deskIndex === -1) {
    alert("No available desks of this type.");
    return;
  }

  const desk = desks[deskIndex];
  desk.booked = true;
  desk.element.classList.add("booked");

  let rate = 0;
  if (deskType === "individual") {
    if (membershipTier === "basic") {
      rate = 10;
      revenues.basic += hours * rate;
    } else if (membershipTier === "premium") {
      rate = 15;
      revenues.premium += hours * rate;
    } else if (membershipTier === "executive") {
      rate = 20;
      revenues.executive += hours * rate;
    }
  } else {
    rate = 25;
  }

  let total = hours * rate;
  if (hours > 3) {
    // Apply a 10% discount if booking for more than 3 hours
    total *= 0.9;
  }

  totalCharge.innerText = `Total Charge: $${total.toFixed(2)}`;
  revenues.total += total;
  updateDashboard();
}

// Function to update the revenue dashboard
function updateDashboard() {
  totalRevenue.innerText = revenues.total.toFixed(2);
  basicRevenue.innerText = revenues.basic.toFixed(2);
  premiumRevenue.innerText = revenues.premium.toFixed(2);
  executiveRevenue.innerText = revenues.executive.toFixed(2);
}
