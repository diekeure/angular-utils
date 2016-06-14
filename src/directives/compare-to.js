(function () {

    'use strict';

    angular.module('dk.utils').directive('dkCompareTo', dkCompareTo);

    /*
	* Compare element model with another model specified in attribute value
    */
	function dkCompareTo() {
		return {
			require: 'ngModel',
			scope: {
				otherModelValue: '=dkCompareTo'
			},
			link: function(scope, element, attributes, ngModel) {
				ngModel.$validators.dkCompareTo = function(modelValue) {
					return modelValue === scope.otherModelValue;
				};
				scope.$watch('otherModelValue', function() {
					ngModel.$validate();
				});
			},
			restrict: 'A'
		};
	}

})();