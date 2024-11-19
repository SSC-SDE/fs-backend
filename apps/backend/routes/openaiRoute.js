require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const authenticateUser = require('../authenticateUser/authenticateUser');
const Query = require('../models/queryModel');
const User = require('../models/User');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
router.post('/openai', authenticateUser, async (req, res) => {
  const userId = req.userId; // Extracted from middleware
  const { inputData, selectedOptions } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has enough normal tokens
    if (user.tokens.normal <= 0) {
      return res.status(403).json({ message: "No tokens left. Please upgrade to premium." });
    }

    // Reduce the token count by 1
    user.tokens.normal -= 1;
    await user.save();

    console.log(`Remaining tokens for user ${userId}: ${user.tokens.normal}`);

    // Construct the prompt for OpenAI
    const prompt = `
      Venue Type: ${selectedOptions[0]},
      Time Preference: ${selectedOptions[1]},
      Style Preference: ${selectedOptions[2]},
      Vibe: ${selectedOptions[3]},
      Mood: ${selectedOptions[4]},
      GenderOrientation: ${selectedOptions[5]},
      Additional Details: ${inputData}.
      
      Based on these inputs give me structured outfit recommendations in this format:
      1. Markdown headers (###, ####) for sections.
      2. Lists with numbered points (1., 2.) for each recommendation.
      3. Bullet points for details within each recommendation.
    `;

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant providing venue and style recommendations." },
        { role: "user", content: prompt },
      ],
    });

    const generatedResponse = completion.choices[0].message.content.trim();

    // Save query and response to MongoDB with userId
    const savedQuery = await Query.create({
      userId,
      userQuery: inputData,
      selectedOptions,
      generatedResponse,
    });

    res.status(200).json({ response: generatedResponse, savedQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process the request", error: error.message });
  }
});


  
  module.exports = router;

