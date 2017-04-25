//usrList
module.controller('userCtrl', ["$scope", "startFromFilter", "manageService", "$http", function($scope, startFromFilter, manageService, http) {
    $scope.users = [];

    manageService.getAllUsersFromNode().success(function(res) {
        $scope.users = res;
        console.log($scope.users);



        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.users.length;
        $scope.entryLimit = 3; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        // $watch search to update pagination

    });
    //delete user
    $scope.deleteUser = function(id) {
        // return promise in success do http call; 
        manageService.deleteUserFromNode(id).success(
            function(res) {
                console.log(res);
                manageService.getAllUsersFromNode().success(function(res) {
                    $scope.users = res;
                    updatePage();
                });
            }).
        error(function(err) {
            console.log(err);
        });

    };
    //order
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        console.log("order by " + propertyName);
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
    var updatePage = function() {
        $scope.$watch(null, function(newVal, oldVal) {
            $scope.filtered = startFromFilter($scope.users, newVal);
            $scope.totalItems = $scope.filtered.length;
            console.log("upadte page: " + $scope.totalItems);
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }, true);
    };
}]);

//usrEdit
module.controller('userEdit', ["$scope", "manageService", "$routeParams", function($scope, manageService, $routeParams) {
    console.log($routeParams.param);
    $scope.userId = $routeParams.param;
    manageService.getUserById($scope.userId).success(function(res) {
        $scope.user = res;
        console.log($scope.user._id);
        $scope.passw1 = '';
        $scope.passw2 = '';
        $scope.fName = $scope.user.fName;
        $scope.lName = $scope.user.lName;
        $scope.title = $scope.user.title;
        $scope.sex = $scope.user.sex;
        $scope.age = $scope.user.age;
        $scope.$watch('passw1', function() { test(); });
        $scope.$watch('passw2', function() { test(); });
        $scope.$watch('fName', function() { test(); });
        $scope.$watch('lName', function() { test(); });
        $scope.$watch('title', function() { test(); });
        $scope.$watch('age', function() { test(); });
        $scope.$watch('sex', function() { test(); });

    });
    var test = function() {
        if ($scope.passw1 !== $scope.passw2 ||
            !(!isNaN($scope.age) &&
                $scope.age > 0 &&
                $scope.age % 1 === 0 &&
                $scope.age.length != 0 &&
                angular.isNumber(+$scope.age))) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ((!$scope.fName.length ||
                !$scope.lName.length ||
                !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };
    //editUser
    $scope.saveEdit = function() {
        manageService.editUserFromNode($scope.userId, $scope.fName,
            $scope.lName, $scope.sex, $scope.age, $scope.title).success(
            function(res) {
                console.log(res); //return the list page
            }).error(function(err) {
            console.log(err);
        });
    };

}]);

//usrAdd
module.controller('userAdd', ["$scope", "manageService", function($scope, manageService) {
    //$scope.users = manageService.getAllUsers();
    $scope.fName = '';
    $scope.lName = '';
    $scope.sex = '';
    $scope.age = '';
    $scope.title = '';
    $scope.passw1 = '';
    $scope.passw2 = '';
    //var id;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.$watch('passw1', function() { test(); });
    $scope.$watch('passw2', function() { test(); });
    $scope.$watch('fName', function() { test(); });
    $scope.$watch('lName', function() { test(); });
    $scope.$watch('title', function() { test(); });
    $scope.$watch('age', function() { test(); });
    $scope.$watch('sex', function() { test(); });
    var test = function() {
        if ($scope.passw1 !== $scope.passw2 ||
            !(!isNaN($scope.age) &&
                $scope.age > 0 &&
                $scope.age % 1 === 0 &&
                $scope.age.length != 0 &&
                angular.isNumber(+$scope.age))) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ((!$scope.fName.length ||
                !$scope.lName.length ||
                !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };

    //addUser
    $scope.saveAdd = function() {
        manageService.addUserToNode($scope.fName, $scope.lName,
            $scope.sex, $scope.age, $scope.title).success(
            function(res) {
                console.log(res); // 
            }).error(function(err) {
            console.log(err);
        });
    };
}]);

module.filter('startFrom', function() {
    return function(input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});