(function () {

    'use strict';

    angular.module('dk.utils', []);

})();
/**
 * Created by bcasier on 23/11/15.
 */
(function () {
  'use strict';

  angular.module('dk.utils').directive('dkBackground', dkBackground);

  /* @ngInject */
  function dkBackground($http) {
    return {
      link: function(scope, element, attrs) {
        attrs.$observe('dkBackground', function(dkBackground) {
          if (!dkBackground) { return; }

          if (dkBackground.substr(0, 5) === 'data:') {
            element.style.backgroundImage = dkBackground;
            return;
          }

          $http.get(dkBackground).success(function() {	// check if image in dk-src exists
            element.style.backgroundImage = dkBackground;			// then replace default image with dk-src
          });
        });
      },
      restrict: 'A'
    };
  }

})();

(function () {

    'use strict';

    angular.module('dk.utils').directive('dkBtwNummer', dkBtwNummer);

	function dkBtwNummer() {
		return {
			require: 'ngModel',
			link: function(scope, element, attributes, ngModel) {
				ngModel.$validators.dkBtwNummer = function(modelValue) {
					if(modelValue === undefined || modelValue === null || modelValue === '') {
						return true;
					}
					modelValue = modelValue.toString().toUpperCase();

					var patt = new RegExp('BE[0-9]{10}');
					return patt.test(modelValue) && (97-parseInt(modelValue.substr(3,7))%97 === parseInt(modelValue.substr(-2)));
				};
			},
			restrict: 'A'
		};
	}

})();
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
/**
 * Created by bcasier on 23/11/15.
 */
(function () {
    'use strict';

    angular.module('dk.utils').directive('dkSrc', dkSrc);

    /* @ngInject */
    function dkSrc($http) {
        return {
            link: function(scope, element, attrs) {
                attrs.$observe('dkSrc', function(dkSrc) {
                    if (!dkSrc) { return; }

                    if (dkSrc.substr(0, 5) === 'data:') {
                        element.attr('src', dkSrc);
                        return;
                    }

                    $http.get(dkSrc).success(function() {	// check if image in dk-src exists
                        element.attr('src', dkSrc);			// then replace default image with dk-src
                    });
                });
            },
            restrict: 'A'
        };
    }

})();
(function () {
	'use strict';

	angular.module('dk.utils').directive('dkUnique', dkUnique);
	
	/* @ngInject */
	function dkUnique($q, $injector) {
		return {
			require: 'ngModel',
			scope: {
				settings: '=dkUnique'
			},
			link: function(scope, element, attributes, ngModel) {
				ngModel.$asyncValidators.dkUnique = function(modelValue) {
					if (modelValue === undefined || modelValue === '') {
						return $q.when();
					}
					
					if (!scope.settings.resource) {
						var toastr = $injector.get('toastr');
						var err = 'Resource missing';
						toastr.error(err);
						//return $q.when(err);	// valid
						return $q.reject(err);	// invalid
					}
					
					var deferred = $q.defer();
					if (scope.settings.resource.checkUnique) {
						scope.settings.resource.checkUnique({
							key: scope.settings.key || 0,
							property: scope.settings.property,
							value: modelValue
						}).$promise.then(
							function(check) {
								if (check.unique) {
									deferred.resolve();
								} else {
									deferred.reject();
								}
							},
							function() {
								deferred.resolve();
							}
						);
					}
					else {
						var where = scope.settings.key ? { id: { neq: scope.settings.key } } : {};	// exclude current record
						where[scope.settings.property] = modelValue;								// search db for input value

						scope.settings.resource.findOne({ filter: { where: where }}).$promise.then(function() {
							deferred.reject();
						}, function() {	// no match found
							deferred.resolve();
						});
					}
					return deferred.promise;
				};
			},
			restrict: 'A'
		};
	}

})();