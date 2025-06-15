const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

const personRoutes = require('./routes/personRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
connectDB();
// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Welcome to the Sirinler Site Bina Yonetimi API',
    });
});


// Person Routes
app.use('/api/persons', personRoutes);
// Transaction Routes
app.use('/api/transactions', transactionRoutes);


// Example route
app.get('/api', (req, res) => {
    res.json({ message: 'API is working!' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});