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
                model: '=bind',
                callback: '&'
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
            if (oldValue == newValue)
                return;

            validate();
            onChange(vm.model);
        });

        function validate() {
            if (vm.model.readOnly || !vm.model.value || vm.model.value.length === 0) {
                vm.validInput = true;
                return;
            }

            var num = parseFloat(vm.model.value);
            vm.validInput = !Number.isNaN(num) && num.toFixed(2).toString() === vm.model.value;
        }

        function onChange(model) {
            vm.callback({ field: model });
        }
    }
})();