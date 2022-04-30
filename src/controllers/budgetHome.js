const { GetHouseData, GetAllHouses } = require("../modules/housePrice");

const getAllBudgetHomes = async (req, res, next) => {
  try {
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    const query = [
      {
        $match: { price: { $gt: minPrice, $lt: maxPrice } },
      },
    ];
    const availableHouses = await GetHouseData(query);
    res.status(200).send(availableHouses);
  } catch (error) {
    next(error);
  }
};

const getAllSqftHomes = async (req, res, next) => {
  try {
    const minSqft = parseInt(req.query.minSqft);
    const query = [
      {
        $match: { sqft_living: { $gt: minSqft } },
      },
    ];
    const availableHouses = await GetHouseData(query);
    res.status(200).send(availableHouses);
  } catch (error) {
    next(error);
  }
};

const getAllAgedHomes = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year);
    const query = [
      {
        $match: { $or: [{ yr_built: year + 1 }, { yr_renovated: year + 1 }] },
      },
    ];

    const allAgedHomes = await GetHouseData(query);
    res.status(200).send(allAgedHomes);
  } catch (error) {
    next(error);
  }
};

const calculateNewHomePrices = (allHomes) => {
  const newHomesPrices = allHomes.map((house) => {
    const {
      bedrooms,
      bathrooms,
      sqft_living,
      sqft_lot,
      floors,
      waterfront,
      view,
      condition,
      sqft_above,
      sqft_basement,
      yr_built,
      yr_renovated,
    } = house;

    house.price =
      ((bedrooms * bathrooms * (sqft_living / sqft_lot) * floors +
        waterfront +
        view) *
        condition *
        (sqft_above + sqft_basement) -
        10 * (2022 - Math.max(yr_built, yr_renovated))) *
      100;
    return house;
  });
  return newHomesPrices;
};

const predictstandardizedPrices = async (req, res, next) => {
  try {
    const query = {};
    const allHomes = await GetAllHouses(query);
    const allNewHomePrices = await calculateNewHomePrices(allHomes);
    res.status(200).send(allNewHomePrices);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBudgetHomes,
  getAllSqftHomes,
  getAllAgedHomes,
  predictstandardizedPrices,
};
