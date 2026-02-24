import express from "express";
import {
  getAllHotels,
  getHotelById,
  getTopRatedHotels
} from "../controllers/hotel.controller.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================

// Top 5 rated hotels (⭐ sabse upar)
router.get("/top", getTopRatedHotels);

// All hotels
router.get("/", getAllHotels);

// Single hotel by ID
router.get("/:id", getHotelById);

export default router;
