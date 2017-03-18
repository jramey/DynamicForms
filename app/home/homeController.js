(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = [];

    function homeController(authenticationService, $location) {
        var vm = this;
        vm.data = { opened: false }
        vm.feedback = '';
        vm.open = open;
        vm.submit = submit;
        vm.onChange = onChange;
        vm.setFieldVisibility = setFieldVisibility;
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.altInputFormats = ['M!/d!/yyyy'];
        vm.date = new Date();
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        vm.mockedFields = [{
                id: 1,
                title: 'Field 1',
                type: 'DECIMAL',
                required: true,
                value: '',
                required: true,
                readOnly: false,
                maxLength: 5,
                visibleMetaData: {},
            },
            {
                id: 2,
                title: 'Field 2',
                type: 'DECIMAL',
                required: false,
                value: 'Disabled',
                required: false,
                readOnly: true,
                maxLength: 5,
                visibleMetaData: {
                    fieldId: 1,
                    value: 2.50
                }
            }
        ];

        function open() {
            vm.data.opened = true;
        }

        function submit() {
            var missingRequiredFiles = vm.mockedFields.filter(function(field) {
                return field.required && (field.display || field.alwaysDisplay) && field.value == '';
            })

            if (missingRequiredFiles.length > 0) {
                vm.feedback = "Missed some fields";
                return;
            }

            console.log(vm.mockedFields);
        }

        function setFieldVisibility(model) {
            if (model.alwaysDisplay)
                return true;

            var fieldsToEvaluate = vm.mockedFields.filter(function(field) {
                return field.id == model.visibleMetaData.fieldId;
            });

            if (fieldsToEvaluate.length === 0) {
                model.alwaysDisplay = true;
                return true;
            }

            model.display = fieldsToEvaluate[0].value == model.visibleMetaData.value;
            return model.display;
        }

        function onChange(field) {
            console.log("change dropdown values if applicable")
        }
    }
})();