
const express = require('express');
const router = express.Router();

// Define the /getOptions route
router.get("/getOptions", async (req, res) => {

    res.json({
      venueOptions: ["Restaurant", "Cafe", "Bar", "Club", "Beach", "Park", "Movie Theatre"],
      colorOptions: ["Red", "Green", "Blue"],
      styleOptions: ["Modern", "Classic", "Funky"],
      sizeOptions: ["Small", "Medium", "Large"],
      moodOptions: ["Happy", "Sad", "Excited"],
      genderOptions: ["Masculine","Feminine","Non-Binary"]
    });
});

module.exports = router;