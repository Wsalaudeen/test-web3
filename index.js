const desks = [];

const revenues = {
  total: 0,
  basic: 0,
  premium: 0,
  executive: 0,
};

const deskGrid = document.getElementById("desk-grid");
const formEl = document.getElementById("form");
const totalCharge = document.getElementById("total-charge");
const totalRevenue = document.getElementById("total-revenue");
const basicRevenue = document.getElementById("basic-revenue");
const premiumRevenue = document.getElementById("premium-revenue");
const executiveRevenue = document.getElementById("executive-revenue");

for (let i = 0; i < 15; i++) {
  const desk = document.createElement("div");
  desk.classList.add("desk");
  desk.dataset.index = i;
  desk.dataset.type = i < 10 ? "individual" : "team";
  desk.innerText = i < 10 ? `${i + 1}` : `${i - 9}`;
  desk.addEventListener("click", handleClick);
  deskGrid.appendChild(desk);
  desks.push({
    element: desk,
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

function handleFormSubmit(event) {
  event.preventDefault();
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
    total *= 0.9;
  }

  totalCharge.innerText = `Total Charge: $${total.toFixed(2)}`;
  revenues.total += total;
  updateDashboard();
}

function updateDashboard() {
  totalRevenue.innerText = revenues.total.toFixed(2);
  basicRevenue.innerText = revenues.basic.toFixed(2);
  premiumRevenue.innerText = revenues.premium.toFixed(2);
  executiveRevenue.innerText = revenues.executive.toFixed(2);
}
