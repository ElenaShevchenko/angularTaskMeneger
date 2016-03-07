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
                lastViewed: '=',
                data: '='
            },
            link: function (scope, element, attrs) {
                scope.okText = attrs.okText || "OK";
                scope.cancelText = attrs.cancelText || "Cancel";
                if(attrs.oncancel){
                    scope.hideOutFn = scope[attrs.oncancel];
                }
                if(attrs.onsubmit){
                    scope.submitOutFn = scope[attrs.onsubmit];
                }
                scope.hideModal = function () {
                    if(this.hideOutFn){
                        this.hideOutFn();
                    }
                    scope.toggleModal({show: false});
                };
                scope.submitModal = function () {
                    if(this.submitOutFn){
                        this.submitOutFn();
                    }
                    /*scope.lastViewed.person = scope.data;*/
                    scope.toggleModal();
                };
            }
        };
    }
})();
