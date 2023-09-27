var data = '[{"name":"xxx","eyes":"xxx","weight":"xxx","height":"xxx","age":"xxx","skin":"xxx", "hair":"xxx", "race":"xxx", "looks":"xxx", "personality":"xxx", "bio":"xxx"},{"name":"xxx","eyes":"xxx","weight":"xxx","height":"xxx","age":"xxx","skin":"xxx", "hair":"xxx", "race":"xxx", "looks":"xxx", "personality":"xxx", "bio":"xxx"}{"name":"xxx","eyes":"xxx","weight":"xxx","height":"xxx","age":"xxx","skin":"xxx", "hair":"xxx", "race":"xxx", "looks":"xxx", "personality":"xxx", "bio":"xxx"},{"name":"xxx","eyes":"xxx","weight":"xxx","height":"xxx","age":"xxx","skin":"xxx", "hair":"xxx", "race":"xxx", "looks":"xxx", "personality":"xxx", "bio":"xxx"}{"name":"xxx","eyes":"xxx","weight":"xxx","height":"xxx","age":"xxx","skin":"xxx", "hair":"xxx", "race":"xxx", "looks":"xxx", "personality":"xxx", "bio":"xxx"},{"name":"xxx","eyes":"xxx","weight":"xxx","height":"xxx","age":"xxx","skin":"xxx", "hair":"xxx", "race":"xxx", "looks":"xxx", "personality":"xxx", "bio":"xxx"}]';


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
