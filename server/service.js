const { MongoClient, ObjectID } = require('mongodb');
const fs = require('fs');
const path = require('path');



var services = function (app) {
    app.post('/writeData', function (req, res) {

        var characterList = {
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
            bio: req.body.bio
        };


        const collection = db.collection('characterList');

        collection.insertOne(characterList, function (err, result) {
            if (err) {
                res.send(JSON.stringify({ msg: err }));
            } else {
                res.send(JSON.stringify({ msg: "SUCCESS" }));
            }
        });
    });

    app.get('/getData', function (req, res) {
        const collection = db.collection('characterList');

        collection.find().toArray(function (err, data) {
            if (err) {
                res.send(JSON.stringify({ msg: err }));
            } else {
                res.send(JSON.stringify({ msg: "SUCCESS", characterList: data }));
            }
        });
    });

    app.delete('/deleteData', async (req, res) => {
        const characterList = db.collection('characterList');

        try {
            const deleteItId = req.query.deleteItId;
            var d_id = new ObjectID(deleteItId);
            const deletedItem = await characterList.deleteOne({ _id: d_id });

            res.send(JSON.stringify({ msg: "SUCCESS" }));
            console.log("Character deleted:", deletedItem);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting the character.');
        }
    });

    //This is my get by type server listener
    app.get('/filterRace', async (req, res) => {
        const race = req.query.race; // Get the selected race from the request query

        try {
            const collection = db.collection('characterList');
            const characters = await collection.find({ race: race }).toArray();

            res.json({ msg: "SUCCESS", characterList: characters });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "An error occurred while retrieving characters by race" });
        }
    });

    app.put('/updateData', async (req, res) => {
        try {
            const characterList = db.collection('characterList');
            const charID = req.body.charID;

            const {
                name,
                eyes,
                weight,
                height,
                age,
                skin,
                hair,
                race,
                looks,
                personality,
                bio
            } = req.body;

            const updateItem = await characterList.updateOne(
                { _id: ObjectID(charID) },
                {
                    $set: {
                        name,
                        eyes,
                        weight,
                        height,
                        age,
                        skin,
                        hair,
                        race,
                        looks,
                        personality,
                        bio
                    }
                }
            );

            res.send(JSON.stringify({ msg: "SUCCESS" }));
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating the character.');
        }
    });


};





module.exports = services;