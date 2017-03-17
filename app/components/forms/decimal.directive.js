(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('exampleDecimal', exampleDecimal);

    exampleDecimal.inject = [];

    function exampleDecimal() {
        var directive = {
            templateUrl: '/components/forms/decimal.html',
            controller: DecimalController,
            controllerAs: 'vm',
            bindToController: true,
            restrict: 'E',
            scope: {
                model: '=bind'
            }
        };

        return directive;
    }

    exampleDecimal.inject = ['$scope'];

    function DecimalController($scope) {
        var vm = this;
        vm.model = $scope.model;
        vm.validate = validate;
        vm.validInput = true;

        $scope.$watch("vm.model.value", function(newValue, oldValue) {
            if (vm.model.value.length > 0) {
                validate();
            }
        });

        function validate() {
            if (vm.model.readOnly)
                return;

            var num = parseFloat(vm.model.valid);
            vm.validInput = !Number.isNaN(num) && num.toFixed(2).toString() === vm.model.value;
        }
    }
})();