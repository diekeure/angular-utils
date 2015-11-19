describe('compareTo directive', function() {
  var $compile,
      $rootScope;

  // Load the module, which contains the directive
  beforeEach(module('dk.utils'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('compares the model value from the current element with another model value', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<form name='myForm'><div dk-compare-to='anotherValue' ng-model='myValue' name='myInput'></div></form>")($rootScope);

    $rootScope.myValue = "Bert";
    $rootScope.anotherValue = "Thomas";
    $rootScope.$digest();
    
    expect($rootScope.myForm.myInput.$valid).toBe(false);

    $rootScope.myValue = "Thomas";
    $rootScope.anotherValue = "Thomas";
    $rootScope.$digest();

    expect($rootScope.myForm.myInput.$valid).toBe(true);
  });
});