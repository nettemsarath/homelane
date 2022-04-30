const mongoose = require("mongoose");

const HousePricesSchema = new mongoose.Schema(
  {
    date: String,
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    sqft_living: Number,
    sqft_lot: Number,
    floors: Number,
    waterfront: Number,
    view: Number,
    condition: Number,
    sqft_above: Number,
    sqft_basement: Number,
    yr_built: Number,
    yr_renovated: Number,
    street: String,
    city: String,
    statezip: String,
    country: String,
  },
  {
    timestamps: true,
  }
);

const HousePrices = mongoose.model("houseprices", HousePricesSchema);
module.exports = HousePrices;
