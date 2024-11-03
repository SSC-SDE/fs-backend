require('dotenv').config();  // Load environment variables at the top
const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users'); // Adjust the path if your file is elsewhere

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Define routes
app.use('/api/users', usersRoute); // Use the /api/users path for user-related routes

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from the Node.js and MongoDB setup!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});