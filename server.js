const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
  }));
  

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Define a route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.post('/submitForm', (req, res) => {
    try {
      const formData = req.body;
  
      // Validate required fields
      if (!formData.name || !formData.email) {
        throw new Error('Required fields are empty');
      }
  
      // If all validations pass, save the form data to CSV file and send a success response
      const csvData = `${formData.name},${formData.email}\n`;
      fs.appendFileSync('formData.csv', csvData);
      res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error processing form:', error);
      res.status(500).json({ success: false, message: 'Error processing the form' });
    }
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
