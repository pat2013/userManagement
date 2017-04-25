var module = angular.module("sampleApp", ['ui.bootstrap', 'ngRoute', 'userSerivce']);

module.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'listUser.html',
            controller: 'userCtrl'

        }).
        when('/edit/:param', {
            templateUrl: 'editUser.html',
            controller: 'userEdit'
        }).
        when('/add', {
            templateUrl: 'addUser.html',
            controller: 'userAdd'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);