// index.js
// Home page logic (professional & lightweight)

const BASE_URL = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Digital Hospitality Home Page Loaded");
  loadHomeTopHotels();
});

// ================= LOAD TOP RATED HOTELS (HOME PREVIEW) =================
async function loadHomeTopHotels() {
  const container = document.getElementById("homeTopHotels");
  if (!container) return; // safety check

  container.innerHTML = "<p>Loading top rated hotels...</p>";

  try {
    const res = await fetch(`${BASE_URL}/api/hotels/top`);
    const hotels = await res.json();

    container.innerHTML = "";

    if (!Array.isArray(hotels) || hotels.length === 0) {
      container.innerHTML = "<p>No top rated hotels available.</p>";
      return;
    }

    // Show only TOP 3 hotels on homepage
    hotels.slice(0, 3).forEach(hotel => {
      const image =
        hotel.images && hotel.images.length
          ? hotel.images[0]
          : "https://via.placeholder.com/400x300?text=Hotel";

      container.innerHTML += `
        <div class="home-hotel-card">
          <img src="${image}" alt="${hotel.name}">
          <div class="info">
            <h3>${hotel.name}</h3>
            <p>${hotel.location}</p>
            <p class="rating">⭐ ${hotel.averageRating || 0} / 5</p>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading top rated hotels:", error);
    container.innerHTML = "<p>Unable to load data.</p>";
  }
}
