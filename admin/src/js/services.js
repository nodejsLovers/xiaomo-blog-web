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
                    console.log(authLevel);
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
                            authLevel: authLevel
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("添加管理员账户" + userName + "成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("添加" + userName + "失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('updateAdminService',//修改管理员账户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (userName, authLevel) {
                    console.log(authLevel);
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/adminUser/update",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            operator: 'xiaomo',
                            userName: userName,
                            authLevel: authLevel
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改管理员用户" + userName + "成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改管理员用户" + userName + "失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('changePasswordAdminService',//修改后台管理员密码
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (userName, password) {
                    console.log(password);
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/adminUser/changePassword",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            userName: userName,
                            password: password
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改管理员用户" + userName + "密码：成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改失败！")
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
                            console.log("删除管理员帐号" + adminId + "成功！");
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
                            console.log("查找管理员用户成功！");
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
                            id: blogId
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
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (blog) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/blog/add",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            title: blog.title,
                            nickName: blog.author,
                            summary: blog.summary,
                            content: blog.content,
                            tagIds: blog.tagIds
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("添加博客成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("添加博客失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('updateBlogService',//更新博客
        [
            '$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (title, summary, content, author, tagIds) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/blog/update",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            title: title,
                            summary: summary,
                            content: content,
                            nickName: author,
                            tagIds: tagIds
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改博客成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改博客失败！")
                        })
                    return deferred.promise;
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
                            console.log("删除博客成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除博客失败！")
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
    .service('addUserService',//添加用户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (email, nickName, phone, address, gender) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/user/addUser",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            email: email,
                            nickName: nickName,
                            phone: phone,
                            address: address,
                            gender: gender
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("添加用户成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("添加用户失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('findUserService',//查找指定用户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (id) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/user/findById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: id
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("查找用户成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("查找用户失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('updateUserService',//更新用户
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (email, nickName, phone, address, gender) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/user/update",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            email: email,
                            nickName: nickName,
                            phone: phone,
                            address: address,
                            gender: gender
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改用户成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改用户失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('changeUserPasswordService',//修改用户密码
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (email, nickName, password) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/user/changePassword",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            email: email,
                            nickName: nickName,
                            password: password
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改用户密码成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改用户密码失败！")
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
                            console.log("删除用户成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除用户失败！")
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
    .service('deleteTagService',//删除标签
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
                            console.log("删除标签成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除标签失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('addTagService',//添加标签
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (name) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/tag/add",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            name: name
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("添加标签成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("添加标签失败！")
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
    .service('addChangeLogService',//添加标签
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (name, onlineTime) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/changeLog/add",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            name: name,
                            onlineTime: onlineTime
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("添加标签成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("添加标签失败！")
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
                            console.log("删除更新日志成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除更新日志失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('findChangeLogService',//查找更新日志
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
                        url: $rootScope.$baseUrl + "/admin/changeLog/findById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: changeLogId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("查找更新日志成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("查找更新日志失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('updateChangeLogService',//查找更新日志
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (name, onlineTime) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/changeLog/update",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            name: name,
                            onlineTime: onlineTime
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改更新日志成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改更新日志失败！")
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
    .service('findLinkService',//友情链接
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (linkId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        url: $rootScope.$baseUrl + "/admin/link/findById",
                        params: {
                            id: linkId
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
    .service('addLinkService',//增加友情连接
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (name, url) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/link/add",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            name: name,
                            url: url
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("增加友情链接成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("增加友情链接失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
    .service('updateLinkService',//修改友情连接
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (name, url) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/link/update",
                        method: 'POST',
                        dataType: 'json',
                        params: {
                            name: name,
                            url: url
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("修改友情链接成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("修改友情链接失败！")
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
                            console.log("删除友情链接成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除友情链接失败！")
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
    )
    .service('findWebSetService',
        ['$rootScope',
            '$http',
            '$q'
            , function ($rootScope, $http, $q) {
            var result = {};
            result.operate = function () {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    url: $rootScope.$baseUrl + "/admin/webSet/findAll",
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
    ).service('updateWebSetService',
    ['$rootScope',
        '$http',
        '$q'
        , function ($rootScope, $http, $q) {
        var result = {};
        result.operate = function (webSet) {
            var deferred = $q.defer();
            $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                url: $rootScope.$baseUrl + "/admin/webSet/update",
                params: {
                    id: webSet.id,
                    siteName: webSet.siteName,
                    icon: webSet.icon,
                    fromYear: webSet.fromYear,
                    toYear: webSet.toYear,
                    beianNumber: webSet.beianNumber,
                    beianUrl: webSet.beianUrl
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
    }
    ]
);
