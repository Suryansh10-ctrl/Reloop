const express = require('express');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('createdBy', 'username');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new item (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const item = new Item({
      title,
      description,
      price,
      imageUrl,
      createdBy: req.userId
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
