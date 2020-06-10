app.service('downloadService', function($http){
    this.updateStatus = function($scope) {
        $http({
            method: 'GET',
            url: 'status'
        }).then(function successCallback(response) {
			let json = response.data;
			if (json['status'] == 'error') {
				$scope.error_logs = json['message'];
			} else {
				$scope.event_logs = json['message'];
			}
        }, function errorCallback(response) {
            $scope.error_message = "Le serveur ne repond pas :'(";
        });
    }
	
    this.doPOST = function($scope, url, data) {
        $http({
            method: 'GET',
            url: configLink(url, data)
        }).then(function successCallback(response) {
			let json = response.data;
			if (json['status'] == 'error') {
				$scope.error_logs = json['message'];
			} else {
				$scope.event_logs = json['message'];
			}
        }, function errorCallback(response) {
            $scope.error_message = "Le serveur ne repond pas :'(";
        });
    }
});