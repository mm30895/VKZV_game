require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/game');
const path = require('path');
const cors = require('cors');



const app = express();
const PORT = 3000;
app.use(cors());

// Middleware
app.use(express.json());
app.use('/api/game', gameRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Fallback route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
// MongoDB Connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@vkzvdbcluster.kylr1.mongodb.net/slotmachine`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => console.error('MongoDB connection error:', error));
