const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5050;

// middleware
app.use(cors());
app.use(express.json());

// ********************************
// MongoDB integration
const uri =
    'mongodb+srv://kmrajibfaysal:N3nGnsw3sZjxGM1c@cluster0.yzknm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        console.log('MongoDB connection Successful');

        const database = client.db('amazon-simple');
        const productsCollection = database.collection('products');

        const query = {};
        const cursor = productsCollection.find(query);
        const products = await cursor.toArray();

        // database get operations
        app.get('/products', async (req, res) => {
            res.send(products);
        });
    } finally {
        //
    }
}

run().catch(console.dir);
// ********************************
// GET requests
app.get('/', (req, res) => {
    res.send('Amazon simple server is running in port 5050');
});

// Watch dog
app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening on port 5050.');
});
