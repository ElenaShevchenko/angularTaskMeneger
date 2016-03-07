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
    $scope.sortType     = 'name'; // default sorting
    $scope.sortReverse  = false;  // reverse sort
    $scope.showPopup = false; // hide popup by default

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
                   completed: false
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

    $scope.updateTask = function (task){
        console.log (task);
            if (task.completed){
                task.completed = false;
               /* $scope.activeTask.push(task);
                localStorageService.set('activeTask',$scope.activeTask);
                localStorageService.set('completedTask',$scope.completedTask);*/
            }
            else {
                task.completed = true;
                console.log (task);

                /*$scope.activeTask.push(task);*/
                /*$scope.completedTask.push(task);
                $scope.completedTask.push(task);

                console.log (task);
                $scope.completedTask.push(task);
                localStorageService.set('activeTask',$scope.activeTask);
                localStorageService.set('completedTask',$scope.completedTask);*/
            }
    };

    $scope.editTask = function (){
        $scope.showPopup = true;
    };


    $scope.toggleModal = function (data) {
        if(data){
            $scope.data = data;
        }
        $scope.show = !$scope.show;
    };

});





















/*'use strict';

/!* Controllers *!/

var taskApp = angular.module('taskApp', []);

taskApp.controller('TaskListCtrl', function($scope, $http, localStorageService) {
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
        }
    });

    function setTask(task) {
        localStorageService.set('$scope.tasks',task);
    }

    function getTask() {
        return  localStorageService.get('$scope.tasks');
    }




    $scope.tabName = 'active';
    $scope.activeTab = true;
    $scope.completedTab = false;
    $scope.sortType     = 'name'; // default sorting
    $scope.sortReverse  = false;  // reverse sort

    $scope.addTask = function (task){
        console.log (task);
        this.completed = false;
        $http.push('D:\MyDocuments\AngularTraining\angularTaskMeneger\app\tasks\tasks.json', task).success(function(data) {
            $scope.tasks = data;
            console.log ($scope.tasks)
        });
/!*
        var newTask = angular.copy($scope.task);
            if($scope.task.completed){

                $scope.completedTask.push(newTask);
            }else{
                $scope.activeTask.push(newTask);
            }
 *!/

        };
});*/





