// app.js
const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
const port = 3000;

app.use(express.json());

// Use posts routes
app.use('/posts', postsRouter);

// Add a simple route for the root path
app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
