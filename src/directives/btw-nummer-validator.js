(function () {

    'use strict';

    angular.module('dk.utils').directive('dkBtwNummer', dkBtwNummer);

	function dkBtwNummer() {
		return {
			require: 'ngModel',
			link: function(scope, element, attributes, ngModel) {
				ngModel.$validators.dkBtwNummer = function(modelValue) {
					if(!modelValue) return false;
					modelValue = modelValue.toString().toUpperCase();

					var patt = new RegExp("BE[0-9]{10}");
					return patt.test(modelValue) && (97-parseInt(modelValue.substr(3,7))%97 === parseInt(modelValue.substr(-2)));
				};
			},
			restrict: 'A'
		};
	}

})();