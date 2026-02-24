import Hotel from "../models/Hotel.js";

// ================= GET ALL HOTELS =================
export const getAllHotels = async (req, res) => {
  try {
    // latest added hotels
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE HOTEL =================
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= TOP 5 RATED HOTELS =================
export const getTopRatedHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .sort({ averageRating: -1 }) // highest rating first
      .limit(5);

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
