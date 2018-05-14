var app = angular.module('myApp', []);

app.directive('customDirective', function () {

    function linkFunction(scope,elem,attrs){
        elem.bind('click', function(){
            console.log(elem[0].innerHTML)
        })
    }

    return {
        template: 'Hello',
        restrict: 'A', // A for attribute directive E for element directive
        /* templateUrl: 'customDirective.html' */
        link: linkFunction
    };

})
app.directive('customDirective2', function () {

    function linkFunction($scope,elem,attrs){
        $scope.name = "Hello World"
        $scope.changeName = function (newName){
            $scope.name = newName;
        }
    }

    return {
        template: '<span ng-click="changeName(\'hey there\')">Current text :: {{name}}</span>',
        restrict: 'EA', 
        link: linkFunction
    };

})
app.controller('myCtrl', function ($scope, $http) {
    $http.get("api/courses")
        .then(function (response) {
            $scope.message = response.data;
        });
}); 