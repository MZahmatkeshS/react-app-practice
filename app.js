// app.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { connectToMongoDB, closeMongoDBConnection } = require('./db'); // Assuming db.js is in the same directory

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/information-form', (req, res) => {
    res.render('information-form');
});

app.post('/submit-information', async (req, res) => {
    const { name, email } = req.body;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('userData'); // Replace 'userData' with your desired collection name

        // Insert the submitted data into the MongoDB collection
        await collection.insertOne({ name, email });

        closeMongoDBConnection(); // Close the MongoDB connection

        res.redirect('/database-report'); // Redirect to the database report page after submission
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/database-report', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('userData'); // Replace 'userData' with your actual collection name

        // Fetch data from MongoDB collection
        const userData = await collection.find().toArray();

        res.render('database-report', { userData });
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});