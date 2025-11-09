
const express = require('express');
const router = express.Router();

// Define the /getOptions route
router.get("/getOptions", async (req, res) => {

    res.json({
      venueOptions: ["Restaurant", "Cafe", "Bar", "Club", "Beach", "Park", "Movie Theatre"],
      timeOptions: ["MIDNIGHT", "MIDDAY", "MORNING","AFTERNOON","EVENING","DAWN","DUSK"],
      styleOptions: [
        "Minimalist", "Classic", "Modern", "Vintage", "Futuristic",
        "Scandinavian Minimalist", "Art Deco Classic", "Cyberpunk Futuristic", "Steampunk Vintage", "Bohemian Eclectic",
        "Monochrome", "Pastel", "Vibrant", "Earth Tones", "Dark Academia",
        "Smooth and Sleek", "Rustic and Textured", "Glossy and Shiny", "Matte and Soft", "Industrial and Raw",
        "Geometric", "Floral", "Striped", "Polka Dot", "Animal Print",
        "Mid-Century Modern", "Art Nouveau", "Baroque", "Rococo", "Gothic"
    ],
      sizeOptions: ["Small", "Medium", "Large"],
      moodOptions: [
        "Happy", "Sad", "Excited",
        "Angry", "Calm", "Anxious",
        "Hopeful", "Fearful", "Surprised",
        "Joyful", "Melancholy", "Euphoric",
        "Frustrated", "Content", "Nostalgic","other"
    ],
      genderOptions: ["Masculine","Feminine","Non-Binary"]
    });
});

module.exports = router;