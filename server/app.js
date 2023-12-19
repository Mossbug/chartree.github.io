const { MongoClient, ObjectID } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

const router = require('./router.js');
const services = require('./service.js');


try {
    MongoClient.connect(
        "mongodb://localhost:27017",
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error, client) => {
            if (error) {
                console.log("error connecting to Chartree database");
            } else {
                db = client.db("Chartree");
                console.log("connected to Chartree database");
                // Perform database operations here
            }
        }
    );
} catch (error) {
    console.log("error connecting to Chartree database");
}


app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Serve static files from the "client" directory
app.use("/client", express.static(path.resolve(__dirname + "/../client")));


// Set up router and services
router(app);
services(app);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`port connected`);
});

