json_objs={ 
	"result": [
		{ "id": 1,
		"title": "Violent Mummy Training", "budget": 20123, del:false,
		}, 
		{"id": 21,
		"title": "My Little Pirate DS", "budget": 41266, del:false,
		}, 
		{"id": 37,
		"title": "Regal Bazooka Dystopia", "budget": 21214, del:false,
		}, 
		{"id": 44,
		"title": "Intellectual Train Pro", "budget": 66243, del:false,
		}, 
		{"id": 50,
			"title": "John Romero's Bass Maniac", "budget": 22999, del:false,
		}, 
		{"id": 12,
		"title": "Wrath of the Weight Loss - The Dark Project", del:false,
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
	    $scope.objs = [];
	    angular.forEach(oldList, function(obj) {
	    	if (obj.del) { obj["delete"] = 1 }
	    	else { $scope.objs.push(obj); }
	    });

	    $.ajax({
		    type: "POST",
		    url: "/api/project/delete/",
		    data: JSON.stringify(oldList),
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data){console.log(data.result)},
		    failure: function(err) {
		        alert(err);
		    }
		});
	};
 };