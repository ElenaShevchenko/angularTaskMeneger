'use strict';

/* Services */

(function (){
    'use strict';

    angular
        .module('taskApp')
        .service('TaskService', TaskService);

    //////////////////////////////
    function TaskService() {
        this.task = [
            {
                "name": "to do something very important",
                "priority": "1",
                "enddate": "27/03/2016",
                "completed": true
            },
            {
                "name": "to do something 1",
                "priority": "2",
                "enddate": "10/04/2016",
                "completed": false
            },
            {
                "name": "to do something else",
                "priority": "3",
                "enddate": "21/03/2016",
                "completed": true
            },
            {
                "name": "to do something less important",
                "priority": "2",
                "enddate": "12/05/2016",
                "completed": true
            },
            {
                "name": "to do something 2",
                "priority": "1",
                "enddate": "16/06/2016",
                "completed": true
            },
            {
                "name": "to do something 3",
                "priority": "3",
                "enddate": "01/06/2016",
                "completed": false
            },
            {
                "name": "to do something 4",
                "priority": "2",
                "enddate": "21/09/2016",
                "completed": true
            },
            {
                "name": "to do something 5",
                "priority": "3",
                "enddate": "27/12/2016",
                "completed": false
            }
        ];
        this.getItems = function () {
            return this.task;
        };

        this.updateTask = function (task){
            for(var i = 0; i < this.task.length; i++){
                if(this.task[i].id == task.id){
                    this.task[i] = task;
                    return;
                }
            }
        }
    }
})();
