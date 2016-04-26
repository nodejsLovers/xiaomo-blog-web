angular.module("myServiceModule", [])
    .service('adminLoginService',//后台登录管理
        [
            '$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (userName, password) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/adminUser/login",
                        params: {
                            userName: userName,
                            password: password
                        },
                        method: 'POST'
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
            }])
    .service('getAdminUserService',//获取后台用户列表
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (current) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/adminUser/findAll",
                        params: {
                            start: current <= 0 ? 1 : current
                        },
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
            }])
    .service('getBlogListService',//博客列表
        [
            '$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (current) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/blog/findAll",
                        params: {
                            start: current <= 0 ? 1 : current
                        },
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
            }])
    .service('addBlogService',//添加博客
        ['$rootScope',
            '$http',
            function ($rootScope, $http) {
                var result = {};
                result.operate = function (blog) {
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/blog/add",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            title: blog.title,
                            summary: blog.summary,
                            content: blog.content,
                            nickName: blog.author,
                            blogType: blog.blogType,
                            tagIds: blog.tagIds
                        }
                    })
                        .success(function () {
                            console.log("添加成功！");
                        })
                        .error(function () {
                            alert("添加失败！")
                        })
                };
                return result;
            }])
    .service('userService',//前台用户列表
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (current) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        params: {
                            start: current <= 0 ? 1 : current
                        },
                        url: $rootScope.$baseUrl + "/admin/user/findAll",
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
            }])
    .service('getTagListService',//获取标签列表
        [
            '$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (current) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/tag/findAll",
                        params: {
                            start: current <= 0 ? 1 : current
                        },
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
            }])
    .service('changeLogListService',
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (current) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/changeLog/findAll",
                        params: {
                            start: current <= 0 ? 1 : current
                        },
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
            }])
    .service('linkListService',//友情链接
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (current) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/link/findAll",
                        params: {
                            start: current <= 0 ? 1 : current
                        },
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
            }])
    .service('systemSetService',
        ['$rootScope',
            '$http',
            '$q'
            , function ($rootScope, $http, $q) {
            var result = {};
            result.operate = function () {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    url: "http://localhost:8889" + "/admin/system/getSystem",
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
        }
        ]
    );


