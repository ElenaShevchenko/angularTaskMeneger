'use strict';

/* Directives */

(function (){
    'use strict';

    angular
        .module('taskApp')
        .directive('customModal', customModal);

       function customModal() {
        return {
            templateUrl: 'popup.html',
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                header: '@',
                toggleModal: '&',
                show: '=',
                data: '='
            },
            link: function (scope, element, attrs) {
                console.log(scope, element, attrs)
            }
        };
    }
})();
