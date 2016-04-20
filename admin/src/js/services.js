angular.module("myServiceModule", [])
    .service('getBlogListService', function ($rootScope, $http,$q) {
            var result = {};
            result.getUserInfo = function () {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: $rootScope.$baseUrl + "/admin/blog/findAll",
                    method: 'GET'
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function () {
                        deferred.reject();
                    });
                return deferred.promise;
            };
            return result;
    });
