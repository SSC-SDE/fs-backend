
const express = require('express');
const router = express.Router();

// Define the /getOptions route
router.get("/getOptions", async (req, res) => {
    console.log('Fetching options...');
    res.json({
      venueOptions: ["Spicy", "Sweet", "Sour", "Salty"],
      colorOptions: ["Red", "Green", "Blue"],
      styleOptions: ["Modern", "Classic", "Funky"],
      sizeOptions: ["Small", "Medium", "Large"],
      moodOptions: ["Happy", "Sad", "Excited"],
    });
});

module.exports = router;