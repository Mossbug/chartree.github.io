var app = angular.module("charTreeViewApp", []);

app.controller("viewDataCtrl", function ($scope, $http) {
    $scope.hideForm = true;
    $scope.characterList = [];
    $scope.races = [];
    $scope.characterList = [];
    $scope.showEditPopup = false;
    $scope.selectedCharacter = null;

    $scope.getData = function () {
        $http({
            method: "get",
            url: 'http://localhost:3000' + "/getData",
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.characterList = response.data.characterList;

                $scope.races = getRaces($scope.characterList);
                //$scope.selectedRace = $scope.races[0];
            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(JSON.stringify(response));
        });
    }
    $scope.getData();

    $scope.deleteCharacter = function (deleteItem) {

        $http({
            method: "delete",
            url: 'http://localhost:3000' + "/deleteData",
            params: { deleteItId: deleteItem },
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.getData();
            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        });
    }

    $scope.selectedRace = {}; // Initialize selectedRace

    $scope.redrawTable = function () {
        if (angular.equals($scope.selectedRace, {})) {

            $scope.getData();
        } else {
            var race = $scope.selectedRace.value;

            $http({
                method: "get",
                url: 'http://localhost:3000' + "/filterRace",
                params: { race: race }
            }).then(function (response) {
                if (response.data.msg === "SUCCESS") {
                    $scope.characterList = response.data.characterList;
                }
            }, function (response) {
                console.log(response);
            });
        }
    };


    $scope.editData = function (charNumber) {
        $scope.name = $scope.characterList[charNumber].name;
        $scope.race = $scope.characterList[charNumber].race;
        $scope.eyes = $scope.characterList[charNumber].eyes;
        $scope.weight = $scope.characterList[charNumber].weight;
        $scope.height = $scope.characterList[charNumber].height;
        $scope.age = $scope.characterList[charNumber].age;
        $scope.skin = $scope.characterList[charNumber].skin;
        $scope.hair = $scope.characterList[charNumber].hair;
        $scope.looks = $scope.characterList[charNumber].looks;
        $scope.personality = $scope.characterList[charNumber].personality;
        $scope.bio = $scope.characterList[charNumber].bio;
        $scope.characterIDHidden = $scope.characterList[charNumber]['_id'];

        $scope.hideForm = false;
    }

    $scope.updateCharacter = function () {

        $http({
            method: "put",
            url: 'http://localhost:3000' + "/updateData",
            data: {
                "charID": $scope.characterIDHidden,
                "name": $scope.name,
                "race": $scope.race.toLowerCase(),
                "eyes": $scope.eyes,
                "weight": $scope.weight,
                "height": $scope.height,
                "age": $scope.age,
                "skin": $scope.skin,
                "hair": $scope.hair,
                "looks": $scope.looks,
                "personality": $scope.personality,
                "bio": $scope.bio
            }
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                console.log($scope.name);
                $scope.cancelUpdate();

                $scope.getData();

                $scope.name = "";
                $scope.race = "";
                $scope.eyes = "";
                $scope.weight = "";
                $scope.height = "";
                $scope.age = "";
                $scope.skin = "";
                $scope.hair = "";
                $scope.looks = "";
                $scope.personality = "";
                $scope.bio = "";


            }
        }, function (response) {
            console.log(response);
        })
    }

    $scope.cancelUpdate = function () {
        $scope.hideForm = true;
    }
});

function getRaces(characterList) {
    var typeExists;
    var racesArray = [{ value: "xx", display: "NONE" }];

    for (var i = 0; i < characterList.length; i++) {
        typeExists = racesArray.find(function (element) {
            return element.value === characterList[i].type;
        });

        if (typeExists) {
            continue;
        } else {
            for (var j = 0; j < characterList.length; j++) {
                // Check if the race value already exists in the array
                if (!racesArray.some(race => race.value === characterList[j].race)) {
                    // Race value does not exist in the array, add it

                    racesArray.push({ value: characterList[j].race, display: characterList[j].race.toUpperCase() });
                }
            }
        }
    }

    return racesArray;
}

// edit code ---------


//NORMAL CODE -------------------------------------------------------------------------------------------

// function createCharacterTable(characterList) {
//     var tableHTML = "";
//     for (var i = 0; i < characterList.length; i++) {
//         tableHTML += '<div class="characterBox">';
//         tableHTML += '<h1 id="nameAge">' + characterList[i].name + ' - ' + characterList[i].age + '</h1>';
//         tableHTML += '<p id="raceHeightWeight">' + characterList[i].race + '/ ' + characterList[i].height + '/ ' + characterList[i].weight + '</p > ';
//         tableHTML += '<div class="bottomBox"><div class="looksBox">'
//         tableHTML += '<h1 class="subheader">Character Looks</h1>' + '<p id="eyes">eye-color:' + characterList[i].eyes + '</p>' + '<p id="skin">skin-color:' + characterList[i].skin + '</p>' + '<p id="hair">hair-color:' + characterList[i].hair + '</p>' + '<p id="looks">other-looks:' + characterList[i].looks + '</p></div>';
//         tableHTML += '<div class="loreBox">' + '<h1 class="subheader">Character Info</h1>' + '<p id="personality">personality:' + characterList[i].personality + '</p>' + '<p id="bio">bio/backstory:' + characterList[i].bio + '</p></div>';
//         tableHTML += '<button id="delete" class="deletebtn" data-id="' + characterList[i]._id + '">Delete</button>';
//         tableHTML += '</div></div>';
//     }
//     document.getElementById('characterContainer').innerHTML = tableHTML;
// }

// function getData() {
//     $.ajax({
//         url: 'http://localhost:3000' + "/getData",
//         type: 'get',
//         success: function (response) {
//             var data = JSON.parse(response);
//             if (data.msg == "SUCCESS") {
//                 createCharacterTable(data.characterList);
//             } else {
//                 console.log(data.msg);
//             }
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }

// $(document).ready(function () {
//     $(document).on('click', '#delete', function () {

//         console.log("working here");
//         var deleteID = $(this).attr('data-id');
//         console.log(deleteID);

//         if (!deleteID) {
//             console.log("Unable to delete character");
//             return;
//         }

//         var confirmData = confirm("Are you sure you'd like to delete this Character?");

//         if (confirmData) {
//             $.ajax({
//                 url: '/deleteData',
//                 type: 'delete',
//                 data: { deleteItId: deleteID },
//                 success: function (response) {
//                     var data = JSON.parse(response);
//                     if (data.msg === "SUCCESS") {
//                         getData();
//                     } else {
//                         console.log(data.msg);
//                     }
//                 },
//                 error: function (err) {
//                     console.log(err);
//                 }
//             });
//         }
//     });
// });