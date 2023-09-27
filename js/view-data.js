var data = JSON.stringify([
    {
        name: "Alabaster Aurora",
        eyes: "Light Blue",
        weight: "120 lbs",
        height: "6 ft even",
        age: "18",
        skin: "pale",
        hair: "white",
        race: "human",
        looks: "has a mechanical arm",
        personality: "cold and calculating",
        bio: "His brother Winter is sick and he is trying to save him",
    },
    {
        name: "Ove Baslof",
        eyes: "green",
        weight: "180 lbs",
        height: "6ft 5in",
        age: "22",
        skin: "tan greyish pink",
        hair: "brownish grey",
        race: "firbolg",
        looks: "N/A",
        personality: "timid and kind",
        bio: "He is just adventuring looking to see what life outside of the deriath woods may have in store for him",
    },
    {
        name: "Lucas Santos",
        eyes: "Blue",
        weight: "120 lbs",
        height: "5ft 10in",
        age: "26",
        skin: "tanned brown",
        hair: "black and long",
        race: "human",
        looks: "he often wears a wildling disguise",
        personality: "manipulative and chaotic",
        bio: "He wants to make the world a better place by taking down the corrupt in power",
    },
    {
        name: "Leo Brightmane",
        eyes: "blue",
        weight: "280 lbs",
        height: "6ft 1in",
        age: "26",
        skin: "pale pink",
        hair: "off white",
        race: "wildling -> cat",
        looks: "scars under his chin",
        personality: "loving, giving, and friendly",
        bio: "He hsa a dark past in which he killed someone near to him. Now he strives to make up for that",
    },
    {
        name: "Heart",
        eyes: "black",
        weight: "350lbs",
        height: "4'11",
        age: "10",
        skin: "metal",
        hair: "N/A",
        race: "Automaton",
        looks: "Stands with a bit of a hunch",
        personality: "Naive and loving",
        bio: "She is learning what it means to be alive through the people around her",
    },
]);
var jsonObject = JSON.parse(data);

main();
function main() {
    console.log(data);
    console.log(jsonObject);

    showTable();
}


function showTable() {
    var htmlString = "";
    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].name + "</td>";
        htmlString += "<td>" + jsonObject[i].eyes + "</td>";
        htmlString += "<td>" + jsonObject[i].weight + "</td>";
        htmlString += "<td>" + jsonObject[i].height + "</td>";
        htmlString += "<td>" + jsonObject[i].age + "</td>";
        htmlString += "<td>" + jsonObject[i].skin + "</td>"
        htmlString += "<td>" + jsonObject[i].hair + "</td>"
        htmlString += "<td>" + jsonObject[i].race + "</td>"
        htmlString += "<td>" + jsonObject[i].looks + "</td>"
        htmlString += "<td>" + jsonObject[i].personality + "</td>"
        htmlString += "<td>" + jsonObject[i].bio + "</td>";
        htmlString += "</tr>";
    }

    $("#charTable").html(htmlString);
}
