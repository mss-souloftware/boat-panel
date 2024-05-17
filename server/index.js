const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(cors({
//     origin: 'https://boat-dashboard.vercel.app'
// }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const User = mongoose.model('User', { username: String, password: String });

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Logout endpoint
app.post('/logout', (req, res) => {
    // You can optionally perform additional cleanup or invalidation tasks here
    res.json({ message: 'Logout successful' });
});

const Captain = mongoose.model('Captain', {
    name: String,
    phone: String,
    email: String,
    country: String,
});

// Route to add captain
app.post('/addCaptain', async (req, res) => {
    try {
        const { name, phone, email, country } = req.body;
        const newCaptain = new Captain({ name, phone, email, country });
        await newCaptain.save();
        res.json({ message: 'Captain added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add captain' });
    }
});

const CaptainData = mongoose.model('Captain');

// Endpoint to get all captains
app.get('/captains', async (req, res) => {
    try {
        const captains = await CaptainData.find();
        res.json(captains);
    } catch (error) {
        console.error('Error fetching captains:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/captainsCount', async (req, res) => {
    try {
        const count = await CaptainData.countDocuments();
        res.json(count);
    } catch (error) {
        console.error('Error fetching captains:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Baot DELETE endpoint
app.delete('/captains/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCaptain = await CaptainData.findByIdAndDelete(id);
        if (!deletedCaptain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        res.json({ message: 'Captain deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Captain with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const Boats = mongoose.model('Boats', {
    name: String, number: String, currentLocation: String, nextLocation: String, cement_s_qnty: String, cement_r_qnty: String, blended_s_qnty: String, blended_r_qnty: String, safra_s_qnty: String, safra_r_qnty: String, fresh_water_s_qnty: String, fresh_water_r_qnty: String, wbm_s_qnty: String, wbm_r_qnty: String, brine_s_qnty: String, brine_r_qnty: String, boatCategory: String, selectedCaptain: String, operationType: String,
});

// Route to add boats
app.post('/addBoat', async (req, res) => {
    try {
        const { name, number, currentLocation, nextLocation, cement_s_qnty, cement_r_qnty, blended_s_qnty, blended_r_qnty, safra_s_qnty, safra_r_qnty, fresh_water_s_qnty, fresh_water_r_qnty, wbm_s_qnty, wbm_r_qnty, brine_s_qnty, brine_r_qnty, boatCategory, selectedCaptain, operationType } = req.body;
        const newBoats = new Boats({
            name, number, currentLocation, nextLocation, cement_s_qnty, cement_r_qnty, blended_s_qnty, blended_r_qnty, safra_s_qnty, safra_r_qnty, fresh_water_s_qnty, fresh_water_r_qnty, wbm_s_qnty, wbm_r_qnty, brine_s_qnty, brine_r_qnty, boatCategory, selectedCaptain, operationType
        });
        await newBoats.save();
        res.json({ message: 'Boat added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add Boat' });
    }
});


const BoatData = mongoose.model('Boats');

// Endpoint to get all Boatss
app.get('/boats', async (req, res) => {
    try {
        const boats = await BoatData.find();
        res.json(boats);
    } catch (error) {
        console.error('Error fetching Boats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/boatsCount', async (req, res) => {
    try {
        const bcount = await BoatData.countDocuments();
        res.json(bcount);
    } catch (error) {
        console.error('Error fetching boats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/boats/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const boat = await BoatData.findById(id);
        if (!boat) {
            return res.status(404).json({ error: 'Boat not found' });
        }
        res.json(boat);
    } catch (error) {
        console.error(`Error fetching Boat with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Baot DELETE endpoint
app.delete('/boats/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBoat = await BoatData.findByIdAndDelete(id);
        if (!deletedBoat) {
            return res.status(404).json({ error: 'Boat not found' });
        }
        res.json({ message: 'Boat deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Boat with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});