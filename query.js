const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://mz:ttl1MYhOGS1GW8DW@cluster0.8a5qpc5.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to run queries
async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to the database');

    // Specify the database and collection
    const database = client.db('mongoP1');
    const collection = database.collection('posts');

    // Find all documents
    const allDocuments = await collection.find({}).toArray();
    console.log('All Documents:', allDocuments);

    // Find documents with a specific field value
    const aliceDocuments = await collection.find({ "category": "Event" }).toArray();
    console.log('Event Documents:', aliceDocuments);

    // Find documents with conditions
    const ageGreaterThan25 = await collection.find({ "likes": { "$lt": 3 } }).toArray();
    console.log('likes < 3 Documents:', ageGreaterThan25);
    const tagNewsDocuments = await collection.find({ tags: "news" }).toArray();
    console.log('Tag "news" Documents:', tagNewsDocuments);

  } finally {
    // Close the connection when finished
    await client.close();
    console.log('Connection closed');
    
  }
}

// Run the queries
run();