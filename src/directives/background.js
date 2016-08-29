/**
 * Created by bcasier on 23/11/15.
 */
(function () {
  'use strict';

  angular.module('dk.utils').directive('dkBackground', dkBackground);

  /* @ngInject */
  function dkBackground() {
    return {
      link: function(scope, element, attrs) {
        attrs.$observe('dkBackground', function(dkBackground) {
          if (!dkBackground) { return; }

          if (dkBackground.substr(0, 5) === 'data:') {
            element.style.backgroundImage = dkBackground;
            return;
          }
          element[0].style.backgroundImage = 'url("'+ dkBackground + '")';			// then replace default image with dk-src

        });
      },
      restrict: 'A'
    };
  }

})();
