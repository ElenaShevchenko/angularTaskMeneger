'use strict';

/* jasmine specs for controllers go here */
describe('TaskList controllers', function() {
  var scope, ctrl, $httpBackend;

  describe('TaskListCtrl', function(){

    beforeEach(module('taskApp'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('tasks/tasks.json').
      respond([{name: "to do something very important"}, {name: "to do something 1"}]);

      scope = $rootScope.$new();

      ctrl = $controller('TaskListCtrl', {$scope:scope});
    }));

    it('should create "tasks" model with 2 task fetched from xhr', function() {
      expect(scope.tasks).toBeUndefined();
      $httpBackend.flush();
      expect(scope.tasks).toEqual([{name: 'to do something very important'}, {name: 'to do something 1'}]);
    });

    it('should set the default value of sortType model', function() {
      expect(scope.sortType).toBe('name');
    });

    it('should set the default value of sortReverse model', function() {
      expect(scope.sortReverse).toBe(false);
    });

    it('should set the default value of show model', function() {
      expect(scope.show).toBe(false);
    });

    it('should set the default value of tabName model', function() {
      expect(scope.tabName).toBe('active');
    });

    it('should set the default value of completedTab model', function() {
      expect(scope.completedTab).toBe(false);
    });

  });

});


