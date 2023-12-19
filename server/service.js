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
            const deleteItId = req.body.deleteItId;
            var d_id = new ObjectID(deleteItId);
            const deletedItem = await characterList.deleteOne({ _id: d_id });

            res.send(JSON.stringify({ msg: "SUCCESS" }));
            console.log("Character deleted:", deletedItem);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting the character.');
        }

    });


};





module.exports = services;