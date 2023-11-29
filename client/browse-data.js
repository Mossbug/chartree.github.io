var chars = [];
var activeChar = 0;

var app = angular.module("browseCharactersApp", []);

app.controller('browseCharactersCtrl', function ($scope, $http) {

    $scope.obj = {};

    $scope.get_records = function () {
        $http({
            method: "get",
            url: charTreeURL + "/get-records"
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                chars = response.data.characterData;
                $scope.obj = chars[activeChar];
                $scope.showHide();
            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        });
    };

    $scope.get_records();

    $scope.changeSpell = function (direction) {
        activeChar += direction;
        $scope.obj = chars[activeChar];
        $scope.showHide();
    }

    $scope.showHide = function () {
        $scope.hidePrev = (activeChar === 0) ? true : false;
        $scope.hideNext = (activeChar === chars.length - 1) ? true : false;
    }
});
