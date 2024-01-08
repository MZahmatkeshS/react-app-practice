const express = require('express');
const { connectToMongoDB, closeMongoDBConnection } = require('../db');

const router = express.Router();

// Route to insert a single post
router.post('/single', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('posts');

    const result = await collection.insertOne({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      likes: req.body.likes,
      tags: req.body.tags,
      date: new Date()
    });

    res.status(201).json({ message: 'Post created', _id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    closeMongoDBConnection();
  }
});

// Route to insert multiple posts
router.post('/multiple', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('posts');

    const result = await collection.insertMany(req.body.posts);

    res.status(201).json({ message: 'Posts created', _ids: result.insertedIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    closeMongoDBConnection();
  }
});

module.exports = router;