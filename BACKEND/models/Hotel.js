import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    images: [
      {
        type: String
      }
    ],
    averageRating: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
