const buttonListener = document.getElementById("submit");
buttonListener.addEventListener("click", function () {
    const name = document.getElementById("name");
    const eyes = document.getElementById("eyes");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");
    const age = document.getElementById("age");
    const skin = document.getElementById("skin");
    const hair = document.getElementById("hair");
    const race = document.getElementById("race");
    const looks = document.getElementById("looks");
    const personality = document.getElementById("personality");
    const bio = document.getElementById("bio");

    var nameVal = name.value;
    var eyesVal = eyes.value;
    var weightVal = weight.value;
    var heightVal = height.value;
    var ageVal = age.value;
    var skinVal = skin.value;
    var hairVal = hair.value;
    var raceVal = race.value;
    var looksVal = looks.value;
    var personalityVal = personality.value;
    var bioVal = bio.value;

    alert(nameVal + " has been added to your list of characters" + "\n" + "submit button has been pressed");


    $("#name").val("");
    $("#eyes").val("");
    $("#weight").val("");
    $("#height").val("");
    $("#age").val("");
    $("#skin").val("");
    $("#hair").val("");
    $("#race").val("");
    $("#looks").val("");
    $("#personality").val("");
    $("#bio").val("");

    return false;
});

$("#clear").click(function () {
    $("#name").val("");
    $("#eyes").val("");
    $("#weight").val("");
    $("#height").val("");
    $("#age").val("");
    $("#skin").val("");
    $("#hair").val("");
    $("#race").val("");
    $("#looks").val("");
    $("#personality").val("");
    $("#bio").val("");

});