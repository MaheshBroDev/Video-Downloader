var app = angular.module('mikaApp', []);

app.controller('downloaderController', function($scope, downloadService, $interval){
    $scope.url = "";
    $scope.event_logs = "Nothing to show yet"
    $scope.error_logs = "No errors";

    $scope.download = function() {
        downloadService.doPOST($scope, 'download', {
            'url' : $scope.url
        });
    }
    $scope.stop = function() {
        downloadService.doPOST($scope, 'stop', {});
    }
    setInterval(function() {
        downloadService.updateStatus($scope);
    }, 1000);
});