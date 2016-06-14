describe('btw-nummer-validator directive', function() {
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

  it('invalidates a malformed BTW-nummer', function() {
    var element = $compile(angular.element("<form name='myForm'><input dk-btw-nummer ng-model='myBtwNummer' name='btwNummer' /></form>"))($rootScope);

    expectInvalid('BE089932401');
    expectInvalid('NL0899324018');
    expectInvalid('089932401');
    expectInvalid('BE0899324011212');
    expectInvalid('TEST');
    expectInvalid('');
    expectInvalid(null);
    expectInvalid(undefined);
    expectInvalid();
    expectInvalid('BE0899324019');

    expectValid('BE0899324018');

  });

  function expectInvalid(number){
	$rootScope.myForm.btwNummer.$setViewValue(number);
    $rootScope.$digest();
    expect($rootScope.myForm.btwNummer.$valid).toBe(false);
  }

  function expectValid(number){
	$rootScope.myForm.btwNummer.$setViewValue(number);
    $rootScope.$digest();
    expect($rootScope.myForm.btwNummer.$valid).toBe(true);
  }
});