const HousePrices = require("../models/housePrices");

const saveHousePrice = async (houseData) => {
  try {
    const newHousePrice = new HousePrices(houseData);
    await newHousePrice.save();
    return 1;
  } catch (error) {
    throw error;
  }
};

const GetAllHouses = async (query) => {
  try {
    const allHouses = await HousePrices.find(query);
    return allHouses;
  } catch (error) {
    throw error;
  }
};

const GetHouseData = async (query) => {
  try {
    const houseData = await HousePrices.aggregate(query);
    return houseData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveHousePrice,
  GetHouseData,
  GetAllHouses,
};
