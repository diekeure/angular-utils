describe('dkSrc directive', function() {
    var $compile,
        $rootScope;

    // Load the module, which contains the directive
    beforeEach(module('dk.utils'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, $injector){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should pass traditional link through src attributes', inject(function($compile, $rootScope, $httpBackend) {
        $httpBackend.expectGET('different_page').respond(function(method,url,data) {
            return [200, 'your different page', {}];
        });
        $rootScope.testUrl = 'test_page';
        var element = $compile('<iframe dk-src="{{testUrl}}"></iframe>')($rootScope);
        $rootScope.testUrl = 'different_page';
        $rootScope.$apply();
        $httpBackend.flush();
        expect(element.attr('src')).toEqual('different_page');
    }));

    it('should pass data:-link through src attributes', inject(function($compile, $rootScope, $httpBackend) {
        $rootScope.testUrl = 'test_page';
        var element = $compile('<iframe dk-src="{{testUrl}}"></iframe>')($rootScope);
        $rootScope.testUrl = 'data:Z3987E83YPS37DST037S37TS03';
        $rootScope.$apply();
        expect(element.attr('src')).toEqual('data:Z3987E83YPS37DST037S37TS03');
    }));
});