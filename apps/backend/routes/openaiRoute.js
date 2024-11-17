require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const authenticateUser = require('../authenticateUser.js/authenticateUser');
const Query = require('../models/queryModel');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/openai', authenticateUser , async (req, res) => {

  const userId = req.userId; // Extracted from middleware
  console.log("USERID FRO MIDDLEWARE", req.userId);
  const { inputData, selectedOptions } = req.body;

  const prompt = `
    Venue Type: ${selectedOptions[0]},
    Color Preference: ${selectedOptions[1]},
    Style Preference: ${selectedOptions[2]},
    Size Choice: ${selectedOptions[3]},
    Mood: ${selectedOptions[4]},
    GenderOrientation: ${selectedOptions[5]},
    Additional Details: ${inputData}.
    
    Based on these inputs give me structured outfit recommendations in this format:
    1. Markdown headers (###, ####) for sections.
    2. Lists with numbered points (1., 2.) for each recommendation.
    3. Bullet points for details within each recommendation.
  `;

  try {
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
    res.status(500).json({ message: "Failed to fetch data from OpenAI", error: error.message });
  }
});

  
  module.exports = router;

