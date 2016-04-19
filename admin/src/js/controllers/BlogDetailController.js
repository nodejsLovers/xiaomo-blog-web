/**
 * Created by Administrator on 2016/4/19.
 */
/**
 * 这里是书籍详情模块
 * @type {angular.IModule}
 */
var bookDetailModule = angular.module("BlogDetailModule", []);
bookDetailModule.controller('BlogDetailController', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
    //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
});
