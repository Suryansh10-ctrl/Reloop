require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user');
const marketplaceRoutes = require('./routes/marketplace');

const app = express();
// Allow frontend to call APIs. In production set a specific origin in .env (FRONTEND_URL).
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Health check
app.get('/api/ping', (req, res) => res.json({ ok: true, time: Date.now() }));

// Serve frontend static files from the Public folder at project root
const publicPath = path.join(__dirname, '..', 'Public');
app.use(express.static(publicPath));

// Fallback to index.html for non-API routes (SPA)
app.get('*', (req, res) => {
	if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'API route not found' });
	res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/reloop';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch(err => console.error('MongoDB connection error:', err));

