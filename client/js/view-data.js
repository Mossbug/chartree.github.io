// function to create the HTML table based on characterData
function createCharacterTable(characterData) {
    var tableHTML = '<colgroup><col class="col-xs-3"></colgroup>';
    tableHTML += '<thead><tr><th>name</th><th>eyes</th><th>weight</th><th>height</th><th>age</th><th>skin</th><th>hair</th><th>race</th><th>looks</th><th>personality</th><th>bio</th></tr></thead><tbody>';

    for (var i = 0; i < characterData.length; i++) {
        tableHTML += '<tr>';
        tableHTML += '<td>' + characterData[i].name + '</td>';
        tableHTML += '<td>' + characterData[i].eyes + '</td>';
        tableHTML += '<td>' + characterData[i].weight + '</td>';
        tableHTML += '<td>' + characterData[i].height + '</td>';
        tableHTML += '<td>' + characterData[i].age + '</td>';
        tableHTML += '<td>' + characterData[i].skin + '</td>';
        tableHTML += '<td>' + characterData[i].hair + '</td>';
        tableHTML += '<td>' + characterData[i].race + '</td>';
        tableHTML += '<td>' + characterData[i].looks + '</td>';
        tableHTML += '<td>' + characterData[i].personality + '</td>';
        tableHTML += '<td>' + characterData[i].bio + '</td>';
        tableHTML += '<td><button class="delete-button" data-id="' + characterData[i].id + '">Delete</button></td>'; // Add the delete button
        tableHTML += '</tr>';
    }

    tableHTML += '</tbody>';

    document.getElementById('charTable').innerHTML = tableHTML;
    activateDeleteButtonListeners();
}

// function to retrieve the character data from the server
function retrieveData() {
    $.ajax({
        url: charTreeURL + '/get-records',
        type: 'get',
        success: function (response) {
            var data = JSON.parse(response);
            if (data.msg == "SUCCESS") {
                createCharacterTable(data.characterData);
            } else {
                console.log(data.msg);
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

retrieveData(); // call the function to retrieve and display the character table

// Function to activate listeners for delete buttons
function activateDeleteButtonListeners() {
    var deleteButtons = document.getElementsByClassName('delete-button');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteRecord()); // Add event listener to delete button
    }
}

// Function to handle delete record action
function deleteRecord() {
    var deleteID = $(this).closest("tr").attr("data-id");

    $.ajax({
        url: "/delete-record",
        type: "DELETE",
        data: { deleteID: deleteID },
        success: function (response) {
            var result = JSON.parse(response);
            if (result.msg === "SUCCESS") {
                // Refresh the table after deletion
                retrieveCharacterData();
            } else {
                console.log(result.msg);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
};