$('#submitbtn').click(function () {

    var name = $('#name').val();
    var eyes = $('#eyes').val();
    var weight = $('#weight').val();
    var height = $('#height').val();
    var age = $('#age').val();
    var skin = $('#skin').val();
    var hair = $('#hair').val();
    var race = $('#race').val();
    var looks = $('#looks').val();
    var personality = $('#personality').val();
    var bio = $('#bio').val();


    var jsonObject = {
        name: name,
        eyes: eyes,
        weight: weight,
        height: height,
        age: age,
        skin: skin,
        hair: hair,
        race: race,
        looks: looks,
        personality: personality,
        bio: bio
    };

    console.log(JSON.stringify(jsonObject));
    $.ajax({
        method: 'post',
        url: charTreeURL + "/writeData",
        data: jsonObject,
        success: function (response) {
            var data = JSON.parse(response);
            if ((data.msg) == "SUCCESS") {
                return;
            } else {
                console.log(data.msg);
            }

        },
        error: function (err) {
            console.log(err);
        }
    });
    return false;

});

$('#clearbtn').click(function () {

    $('#name').val("");
    $('#eyes').val("");
    $('#weight').val("");
    $('#height').val("");
    $('#age').val("");
    $('#skin').val("");
    $('#hair').val("");
    $('#race').val("");
    $('#looks').val("");
    $('#personality').val("");
    $('#bio').val("");
});
