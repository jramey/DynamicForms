(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ui.bootstrap', 'app.forms'])
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: '/home/home.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/Home' });
    }
})();