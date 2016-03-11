'use strict';

/*Controllers*/
var taskApp = angular.module('taskApp', ['LocalStorageModule']);
taskApp.controller('TaskListCtrl', function($scope, $http, localStorageService) {

    $scope.completedTask = [];
    $scope.activeTask = [];

    initList();

    function initList(){
        var completedTask = localStorageService.get('completedTask');
        var activeTask = localStorageService.get('activeTask');

        if(completedTask || activeTask){
            if(completedTask){
                $scope.completedTask.splice(0,$scope.completedTask.length);
                completedTask.forEach(function(item) {
                    $scope.completedTask.push(item);
                });
            }
            if(activeTask){
                $scope.activeTask.splice(0,$scope.activeTask.length);
                activeTask.forEach(function(item) {
                    $scope.activeTask.push(item);
                });
            }

        } else{
            initFromJson();
        }
    }

    function initFromJson(){
        $http.get('tasks/tasks.json').success(function(data) {
            $scope.tasks = data;
            for (var i = 0; i < $scope.tasks.length; i++){
             /*   $scope.tasks[i].enddate = new Date($scope.tasks[i].enddate);*/
                if ($scope.tasks[i].completed){
                    $scope.completedTask.push($scope.tasks[i]);
                }
                else {
                    $scope.activeTask.push($scope.tasks[i]);
                }
            }
        });
    }


    $scope.show = false;
    $scope.tabName = 'active';
    $scope.activeTab = true;
    $scope.completedTab = false;
    $scope.sortType  = 'name'; // default sorting
    $scope.sortReverse  = false;  // reverse sort

    /*Default end date is next working day*/
    $scope.tomorrow = new Date();
    if($scope.tomorrow.getDay() == 5){
        $scope.tomorrow.setDate($scope.tomorrow.getDate() + 2);
    }
    else if ($scope.tomorrow.getDay() == 6){
        $scope.tomorrow.setDate($scope.tomorrow.getDate() + 3);
    }
    else {
        $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
    }

   /* Default priority is 1*/
    $scope.typePriority = [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' }
    ];
    $scope.task = {priority: $scope.typePriority[0].value,
                   enddate : $scope.tomorrow,
                   description: ""

    };

    $scope.addTask = function (){
        var newTask = angular.copy($scope.task);
        if (newTask.completed){
            $scope.completedTask.push(newTask);
            localStorageService.set('completedTask',$scope.completedTask);
            localStorageService.set('activeTask',$scope.activeTask);
        }
        else {
            $scope.activeTask.push(newTask);
            localStorageService.set('activeTask',$scope.activeTask);
            localStorageService.set('completedTask',$scope.completedTask);
        }
    };

    $scope.updateTaskStatus = function (task){
            if (task.completed){
                $scope.completedTask.push(task);
                for (var i = 0; i <  $scope.activeTask.length; i++){
                    if ( $scope.activeTask[i] == task){
                        $scope.activeTask.splice(i, 1);
                    }
                }
                localStorageService.set('activeTask',$scope.activeTask);
                localStorageService.set('completedTask',$scope.completedTask);
            }
            else {
                $scope.activeTask.push(task);
                for (var j = 0; j <  $scope.completedTask.length; j++){
                    if ( $scope.completedTask[j] == task){
                        $scope.completedTask.splice(j, 1);
                    }
                }
                localStorageService.set('activeTask',$scope.activeTask);
                localStorageService.set('completedTask',$scope.completedTask);
            }
    };



    /* Methods */
    $scope.hideModal = function (task){
        task.name = $scope.taskOld.name;
        task.priority = $scope.taskOld.priority;
        task.enddate = $scope.taskOld.enddate;
        task.description = $scope.taskOld.description;
        $scope.toggleModal({show: false});
    };

    $scope.submitModal = function (){
        localStorageService.set('activeTask',$scope.activeTask);
        localStorageService.set('completedTask',$scope.completedTask);
        $scope.toggleModal({show: false});
    };


    $scope.toggleModal = function (data) {
        $scope.taskOld = angular.copy(data);
        if(data){
            if(typeof(data.enddate) != "object") {
                data.enddate = new Date(data.enddate);
            }
            $scope.data = data;
        }
        $scope.show = !$scope.show;
        return $scope.taskOld;
    };
});

















