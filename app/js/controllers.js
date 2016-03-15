/*Controllers*/

(function() {
'use strict';

 angular.module ('taskApp', ['LocalStorageModule'])
        .controller ('TaskListCtrl', TaskListCtrl);

function TaskListCtrl ($scope, $http, localStorageService){

    var vm = this;

    vm.completedTask = [];
    vm.activeTask = [];

    vm.initList = initList;
    vm.initFromJson =  initFromJson;
    vm.addTask = addTask;
    vm.updateTaskStatus = updateTaskStatus;
    vm.hideModal = hideModal;
    vm.submitModal = submitModal;
    vm.toggleModal = toggleModal;

    vm.show = false;
    vm.tabName = 'active';
    vm.activeTab = true;
    vm.completedTab = false;
    vm.sortType    = 'name'; // default sorting
    vm.sortReverse  = false;  // reverse sort

    /*Default end date is next working day*/
    vm.tomorrow = new Date();
    if(vm.tomorrow.getDay() == 5){
        vm.tomorrow.setDate(vm.tomorrow.getDate() + 2);
    }
    else if (vm.tomorrow.getDay() == 6){
        vm.tomorrow.setDate(vm.tomorrow.getDate() + 3);
    }
    else {
        vm.tomorrow.setDate(vm.tomorrow.getDate() + 1);
    }

    /* Default priority is 1*/
    vm.typePriority = [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' }
    ];
    vm.task = {priority: vm.typePriority[0].value,
        enddate : vm.tomorrow,
        description: ""
    };

    /*init date*/
    vm.initList ();

    /* Methods */

    function initList (){
        var completedTask = localStorageService.get('completedTask');
        var activeTask = localStorageService.get('activeTask');

        if(completedTask || activeTask){
            if(completedTask){
                vm.completedTask.splice(0,vm.completedTask.length);
                completedTask.forEach(function(item) {
                    vm.completedTask.push(item);
                });
            }
            if(activeTask){
                vm.activeTask.splice(0,vm.activeTask.length);
                activeTask.forEach(function(item) {
                    vm.activeTask.push(item);
                });
            }

        } else{
           vm.initFromJson();
        }
    }

    function initFromJson (){
        $http.get('tasks/tasks.json').success(function(data) {
            vm.tasks = data;
            for (var i = 0; i < vm.tasks.length; i++){
                if (vm.tasks[i].completed){
                    vm.completedTask.push(vm.tasks[i]);
                }
                else {
                    vm.activeTask.push(vm.tasks[i]);
                }
            }
        });
    }

    function addTask (){
        var newTask = angular.copy(vm.task);
        if (newTask.completed){
            vm.completedTask.push(newTask);
            localStorageService.set('completedTask',vm.completedTask);
            localStorageService.set('activeTask',vm.activeTask);
        }
        else {
            vm.activeTask.push(newTask);
            localStorageService.set('activeTask',vm.activeTask);
            localStorageService.set('completedTask',vm.completedTask);
        }
    }

    function updateTaskStatus (task){
            if (task.completed){
                vm.completedTask.push(task);
                for (var i = 0; i <  vm.activeTask.length; i++){
                    if ( vm.activeTask[i] == task){
                        vm.activeTask.splice(i, 1);
                    }
                }
                localStorageService.set('activeTask',vm.activeTask);
                localStorageService.set('completedTask',vm.completedTask);
            }
            else {
                vm.activeTask.push(task);
                for (var j = 0; j <  vm.completedTask.length; j++){
                    if ( vm.completedTask[j] == task){
                        vm.completedTask.splice(j, 1);
                    }
                }
                localStorageService.set('activeTask',vm.activeTask);
                localStorageService.set('completedTask',vm.completedTask);
            }
    }

    function hideModal (task){
        console.log(task, "task");
        task.name = vm.taskOld.name;
        task.priority = vm.taskOld.priority;
        task.enddate = vm.taskOld.enddate;
        task.description = vm.taskOld.description;
        vm.toggleModal({show: false});
    }

    function submitModal (){
        localStorageService.set('activeTask',vm.activeTask);
        localStorageService.set('completedTask',vm.completedTask);
        vm.toggleModal({show: false});
    }

    function toggleModal (data) {

        vm.taskOld = angular.copy(data);
        console.log(data, vm.taskOld, "old");
        if(data){
            if(typeof(data.enddate) != "object") {
                data.enddate = new Date(data.enddate);
            }
            vm.data = data;
        }
        vm.show = !vm.show;
        console.log(data, vm.show);
        return vm.taskOld;
    }}

})();















