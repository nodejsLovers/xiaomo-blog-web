angular.module("myServiceModule", [])
    .service('getBlogListService', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
        var result = {};
        result.getUserInfo = function (current) {
            var deferred = $q.defer();
            $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
    }]).service('addBlogService', function ($rootScope, $http) {
    var result = {};
    result.addBlog = function (blog) {
        $http({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

});
