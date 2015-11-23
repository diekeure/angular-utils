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