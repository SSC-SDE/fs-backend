require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/openai', async (req, res) => {
  console.log(req);
  const { inputData, selectedOptions } = req.body;
  
  const prompt = `
    Venue Type: ${selectedOptions[0]},
    Color Preference: ${selectedOptions[1]},
    Style Preference: ${selectedOptions[2]},
    Size Choice: ${selectedOptions[3]},
    Mood: ${selectedOptions[4]}.
    Additional Details: ${inputData}.
    
    Please suggest recommendations based on these inputs.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant providing venue and style recommendations." },
        { role: "user", content: prompt }
      ],
    });

    res.status(200).json({ response: completion.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data from OpenAI", error: error.message });
  }
});

  
  module.exports = router;

