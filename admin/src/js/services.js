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
    .service('addAdminService',//添加管理员账户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (userName, password, authLevel) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/adminUser/add",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            operator: 'xiaomo',
                            userName: userName,
                            password: password,
                            authLevel: authLevel.id
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("添加成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("添加失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('deleteAdminService',//删除管理员账户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (adminId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/adminUser/deleteById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: adminId,
                            operator: 'xiaomo'
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('findAdminUserService',//根据id查找管理员账户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (adminId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/adminUser/findById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: adminId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("查找成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("查找失败！")
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
    .service('findBlogService',//博客记录
        [
            '$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (blogId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/blog/findById",
                        params: {
                            id:blogId
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
    .service('deleteBlogService',//删除博客
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (blogId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/blog/deleteBlogById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: blogId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('userListService',//前台用户列表
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
    .service('deleteUserService',//删除用户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (userId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/user/deleteById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: userId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
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
    .service('deleteTagService',//删除友情连接
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (tagId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/tag/delete",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: tagId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
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
    .service('deleteChangeLogService',//删除更新日志
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (changeLogId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/changeLog/deleteById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: changeLogId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
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
    .service('deleteLinkService',//删除友情连接
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (linkId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/link/delete",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: linkId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('basicInfoService',
        ['$rootScope',
            '$http',
            '$q'
            , function ($rootScope, $http, $q) {
            var result = {};
            result.operate = function () {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    url: $rootScope.$baseUrl + "/admin/system/getSystem",
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


