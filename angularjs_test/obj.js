json_objs={ 
    "result": [
        { "id": 1,
        "title": "Violent Mummy Training", "budget": 20123
        }, 
        {"id": 21,
        "title": "My Little Pirate DS", "budget": 41266
        }, 
        {"id": 37,
        "title": "Regal Bazooka Dystopia", "budget": 21214
        }, 
        {"id": 44,
        "title": "Intellectual Train Pro", "budget": 66243
        }, 
        {"id": 50,
            "title": "John Romero's Bass Maniac", "budget": 22999
        }, 
        {"id": 12,
        "title": "Wrath of the Weight Loss - The Dark Project",
        "budget": 20000}
    ]
}


function ObjCtrl($scope, $http) {
    $scope.objs = json_objs.result;

    angular.forEach($scope.objs, function(obj) {
        $scope.sum += obj.budget;
    });

    $scope.sum = function() {
        var sum = 0;
        angular.forEach($scope.objs, function(obj) {
          sum += obj.budget;
        });
        return sum;
      };

    $scope.check = function() {
        angular.forEach($scope.objs, function(obj) {
            obj.del = $scope.chechAll ? true : false;
        });
    };

    $scope.delete_selected = function() {
        var oldList = $scope.objs;
        var deletedList = []
        $scope.objs = [];
        angular.forEach(oldList, function(obj) {
            if (obj.del) { 
                deletedList.push(obj)
                obj["delete"] = 1
            }
            else { $scope.objs.push(obj); }
        });

        $http({
            method: "POST",
            url: "/api/project/delete/",
            data: JSON.stringify(oldList),
            contentType: "application/json; charset=utf-8",
        }).
        success(function(data, status, headers, config) {
            if (data.result) {
                console.log(data.result);
            } else {
                $scope.objs = $scope.objs.concat(deletedList)
                alert(data.message)
            }
        }).
        error(function(data, status, headers, config) {
            alert(data)
        });
    };
 };