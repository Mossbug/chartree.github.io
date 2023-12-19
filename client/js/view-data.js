
getData();


function createCharacterTable(characterList) {
    var tableHTML = "";
    for (var i = 0; i < characterList.length; i++) {
        tableHTML += '<div class="characterBox">';
        tableHTML += '<h1 id="nameAge">' + characterList[i].name + ' - ' + characterList[i].age + '</h1>';
        tableHTML += '<p id="raceHeightWeight">' + characterList[i].race + '/ ' + characterList[i].height + '/ ' + characterList[i].weight + '</p > ';
        tableHTML += '<div class="bottomBox"><div class="looksBox">'
        tableHTML += '<h1 class="subheader">Character Looks</h1>' + '<p id="eyes">eye-color:' + characterList[i].eyes + '</p>' + '<p id="skin">skin-color:' + characterList[i].skin + '</p>' + '<p id="hair">hair-color:' + characterList[i].hair + '</p>' + '<p id="looks">other-looks:' + characterList[i].looks + '</p></div>';
        tableHTML += '<div class="loreBox">' + '<h1 class="subheader">Character Info</h1>' + '<p id="personality">personality:' + characterList[i].personality + '</p>' + '<p id="bio">bio/backstory:' + characterList[i].bio + '</p></div>';
        tableHTML += '<button id="delete" class="deletebtn" data-id="' + characterList[i]._id + '">Delete</button>';
        tableHTML += '</div></div>';
    }


    document.getElementById('characterContainer').innerHTML = tableHTML;

}

function getData() {
    $.ajax({
        url: 'http://localhost:3000' + "/getData",
        type: 'get',
        success: function (response) {
            var data = JSON.parse(response);
            if (data.msg == "SUCCESS") {
                createCharacterTable(data.characterList);
            } else {
                console.log(data.msg);
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

$(document).ready(function () {
    $(document).on('click', '#delete', function () {

        console.log("working here");
        var deleteID = $(this).attr('data-id');
        console.log(deleteID);

        if (!deleteID) {
            console.log("Unable to delete character");
            return;
        }

        var confirmData = confirm("Are you sure you'd like to delete this Character?");

        if (confirmData) {
            $.ajax({
                url: '/deleteData',
                type: 'delete',
                data: { deleteItId: deleteID },
                success: function (response) {
                    var data = JSON.parse(response);
                    if (data.msg === "SUCCESS") {
                        getData();
                    } else {
                        console.log(data.msg);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
});
