// hotels.js
const BASE_URL = "http://localhost:5000";

// Store data for search
let topHotelsData = [];
let allHotelsData = [];

document.addEventListener("DOMContentLoaded", () => {
  loadTopHotels();
  loadAllHotels();

  // Search listener
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
});

// ================= TOP 5 HOTELS =================
async function loadTopHotels() {
  const topBox = document.getElementById("topHotels");
  topBox.innerHTML = "<p>Loading top rated hotels...</p>";

  try {
    const res = await fetch(`${BASE_URL}/api/hotels/top`);
    const hotels = await res.json();

    topHotelsData = Array.isArray(hotels) ? hotels : [];
    renderTopHotels(topHotelsData);

  } catch (err) {
    topBox.innerHTML = "<p>Error loading top hotels.</p>";
    console.error(err);
  }
}

// ================= ALL HOTELS =================
async function loadAllHotels() {
  const container = document.getElementById("hotelsContainer");
  container.innerHTML = "<p>Loading hotels...</p>";

  try {
    const res = await fetch(`${BASE_URL}/api/hotels`);
    const hotels = await res.json();

    allHotelsData = Array.isArray(hotels) ? hotels : [];
    renderAllHotels(allHotelsData);

  } catch (err) {
    container.innerHTML = "<p>Error loading hotels.</p>";
    console.error(err);
  }
}

// ================= SEARCH HANDLER =================
function handleSearch() {
  const query = this.value.toLowerCase();

  const filteredTop = topHotelsData.filter(h =>
    h.name.toLowerCase().includes(query) ||
    h.location.toLowerCase().includes(query)
  );

  const filteredAll = allHotelsData.filter(h =>
    h.name.toLowerCase().includes(query) ||
    h.location.toLowerCase().includes(query)
  );

  renderTopHotels(filteredTop);
  renderAllHotels(filteredAll);
}

// ================= RENDER FUNCTIONS =================
function renderTopHotels(hotels) {
  const topBox = document.getElementById("topHotels");
  topBox.innerHTML = "";

  if (hotels.length === 0) {
    topBox.innerHTML = "<p>No matching top rated hotels.</p>";
    return;
  }

  hotels.forEach(hotel => {
    topBox.innerHTML += createHotelCard(hotel, true);
  });
}

function renderAllHotels(hotels) {
  const container = document.getElementById("hotelsContainer");
  container.innerHTML = "";

  if (hotels.length === 0) {
    container.innerHTML = "<p>No matching hotels found.</p>";
    return;
  }

  hotels.forEach(hotel => {
    container.innerHTML += createHotelCard(hotel, false);
  });
}

// ================= CARD TEMPLATE =================
function createHotelCard(hotel, isTop) {
  const imgSrc =
    hotel.images && hotel.images.length
      ? hotel.images[0]
      : "https://via.placeholder.com/600x400?text=Hotel";

  return `
    <div class="hotel-card ${isTop ? "top-card" : ""}">
      ${isTop ? `<span class="badge">TOP RATED</span>` : ""}
      <img src="${imgSrc}" alt="${hotel.name}">
      <div class="hotel-content">
        <h3>${hotel.name}</h3>
        <p class="location">${hotel.location}</p>
        <p class="rating">⭐ ${hotel.averageRating || 0} / 5</p>
        <a href="../detail/hotel-details.html?id=${hotel._id}" class="view-btn">
          View Details
        </a>
      </div>
    </div>
  `;
}
