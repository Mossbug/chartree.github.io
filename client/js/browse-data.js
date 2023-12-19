var chars = [];
var activeChar = 0;

var app = angular.module("browseCharactersApp", []);

app.controller('browseCharactersCtrl', function ($scope, $http) {

    $scope.obj = {};

    $scope.getRecords = function () {
        $http({
            method: "get",
            url: "http://localhost:3000" + "/getData"
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                chars = response.data.characterList;
                $scope.obj = chars[activeChar];
                $scope.showHide();
            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        });
    };

    $scope.getRecords();

    $scope.changeData = function (direction) {
        activeChar += direction;
        $scope.obj = chars[activeChar];
        $scope.showHide();
    };

    $scope.showHide = function () {
        $scope.hidePrev = (activeChar === 0) ? true : false;
        $scope.hideNext = (activeChar === chars.length - 1) ? true : false;
    };
});

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
});