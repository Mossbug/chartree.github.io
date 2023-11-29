const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname, './files/data.txt');

var services = function (app) {
    app.post('/write-record', function (req, res) {
        var id = "lib" + Date.now();

        var characterData = {
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
        console.log("data " + JSON.stringify(characterData));
        var charData = [];

        if (fs.existsSync(DATABASE_FILE)) {
            //Read in current database
            fs.readFile(DATABASE_FILE, "utf8", function (err, data) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    charData = JSON.parse(data);
                    charData.push(characterData);

                    fs.writeFile(DATABASE_FILE, JSON.stringify(charData), function (err) {
                        if (err) {
                            res.send(JSON.stringify({ msg: err }));
                        } else {
                            res.send(JSON.stringify({ msg: "SUCCESS" }));
                        }
                    });
                }
            });
        } else {
            charData.push(characterData);

            fs.writeFile(DATABASE_FILE, JSON.stringify(charData), function (err) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    res.send(JSON.stringify({ msg: "SUCCESS" }));
                }
            });
        }
    });

    app.get('/get-records', function (req, res) {
        if (fs.existsSync(DATABASE_FILE)) {
            fs.readFile(DATABASE_FILE, "utf8", function (err, data) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    var charData = JSON.parse(data);
                    res.send(JSON.stringify({ msg: "SUCCESS", characterData: charData }));
                }
            });
        } else {
            var data = [];
            res.send(JSON.stringify({ msg: "SUCCESS", characterData: data }));
        }
    });



};

module.exports = services;