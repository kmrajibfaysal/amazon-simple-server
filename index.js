const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5050;

// middleware
app.use(cors());
app.use(express.json());

// GET requests
app.get('/', (req, res) => {
    res.send('Amazon simple server is running in port 5050');
});

// Watch dog
app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening on port 5050.');
});
