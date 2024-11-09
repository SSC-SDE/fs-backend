const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const openaiRoute = require('./routes/openaiRoute'); // Import openaiRoute
const getOptions = require('./routes/getOptions'); // Import getOptions route

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  credentials: true,  // This allows cookies and headers to be passed along with the request
}));

// Middleware
app.use(express.json());  // Make sure JSON body parsing is set up
app.use('/api/options', getOptions);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', openaiRoute); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from the Node.js and MongoDB setup!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
