'use strict';

/* Controllers */

var taskApp = angular.module('taskApp', []);

taskApp.controller('TaskListCtrl', function($scope, $http) {
    $scope.completedTask = [];
    $scope.activeTask = [];

    $http.get('tasks/tasks.json').success(function(data) {
        $scope.tasks = data;
        for (var i = 0; i < $scope.tasks.length; i++){
          if ($scope.tasks[i].completed){
              $scope.completedTask.push($scope.tasks[i]);
          }
            else {
              $scope.activeTask.push($scope.tasks[i]);
          }
            console.log($scope.completedTask, $scope.activeTask)
        }
    });

    $scope.tabName = 'active';
    $scope.activeTab = true;
    $scope.completedTab = false;
    $scope.sortType     = 'name'; // default sorting
    $scope.sortReverse  = false;  // reverse sort
});





