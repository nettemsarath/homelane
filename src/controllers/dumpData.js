const fs = require("fs");
const csvParser = require("csv-parser");

const { saveHousePrice } = require("../modules/housePrice");

const dumpData = (req, res, next) => {
  const file = req.file;
  console.log("file isss", file);
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("data", async (chunk) => {
      console.log(chunk);
      await saveHousePrice(chunk);
    })
    .on("end", () => {
      fs.unlinkSync(file.path);
      console.log("Done");
      res.status(200).send("Done");
    });
};

module.exports = {
  dumpData,
};
