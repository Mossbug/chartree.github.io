const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
const services = require('./service.js');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "client" directory
app.use("/client", express.static(path.resolve(__dirname + "/../client")));

//page listeners (our router)
router(app);

//service listeners (our data processes)
services(app);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});