const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname, './files/data.txt');

var services = function (app) {
    app.post('/write-record', function (req, res) {
        var id = "lib" + Date.now();

        var bookData = {
            name: req.body.name,
            eyes: req.body.eyes,
            weight: req.body.weight,
            height: req.body.height,
            age: req.body.age,
            skin: req.body.skin,
            hair: req.body.hair,
            race: req.body.race,
            looks: req.body.looks,
            personality: req.body.personality,
            bio: req.body.bio,
        };
        var charData = [];

        if (fs.existsSync(DATABASE_FILE)) {
            //Read in current database
            fs.readFile(DATABASE_FILE, "utf8", function (err, data) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    charData = JSON.parse(data);
                    charData.push(charData);
                }
            });
        } else {
            charData.push(bookData);

            fs.writeFile(DATABASE_FILE, JSON.stringify(charData), function (err) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    res.send(JSON.stringify({ msg: "SUCCESS" }))
                }
            });
        }
    });
};


module.exports = services;
