const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const openaiRoute = require('./routes/openaiRoute');
const getOptions = require('./routes/getOptions'); // Import getOptions route


dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({ // Replace with your frontend URL
  credentials: true,  // Allows cookies and headers to be passed along with requests
}));

// Middleware
app.use(express.json());  // Ensure JSON body parsing is set up
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', openaiRoute);
app.use('/api/options', getOptions);  // Mount the getOptions route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
