const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "client" directory
app.use("/client", express.static(path.resolve(__dirname + "/../client/css/style.css")));

// Set up routes using the router file
router(app);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//page listeners (our router)
var router = require("./router.js");
router(app);

//service listeners (our data processes)
var services = require("./services.js");
services(app);

//listen
server = app.listen(port, function (err) {
    if (err) {
        throw err;
    }

    console.log("Listening on port" + port);
});