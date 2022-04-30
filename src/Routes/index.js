const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tempdir/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".csv");
  },
});

const upload = multer({ storage: storage });

const { dumpData } = require("../controllers/dumpData");
const {
  getAllBudgetHomes,
  getAllSqftHomes,
  getAllAgedHomes,
  predictstandardizedPrices,
} = require("../controllers/budgetHome");

router.get("/", (req, res) => {
  res.send("HII");
});

router.post("/dumpdata", upload.single("file"), dumpData);

router.get("/budgethomes", getAllBudgetHomes);
router.get("/sqfthomes", getAllSqftHomes);
router.get("/agehomes", getAllAgedHomes);
router.get("/predictsStandardizedPrices", predictstandardizedPrices);

router.post("/", (req, res) => {
  res.send("HII");
});

module.exports = router;
