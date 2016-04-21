var myApp = angular.module('myApp', ['ui.router', 'myControllerModule', 'myServiceModule', 'myDirectiveModule', 'myFilterModule']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
myApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$baseUrl = "http://api.xiaomo.info:8080";
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'main@index': {
                    templateUrl: 'tpls/login.html'
                }
            }
        })
        .state('main', {
            url: '/{menu',
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: 'tpls/blog/blogList.html'
                },
                'menu@main': {
                    templateUrl: 'tpls/menu.html'
                },
                'content@main': {
                    templateUrl: 'tpls/blog/content.html',
                    controller:"BlogListController"
                }
            }
        })
        .state('addBlog', {
            url: '/addBlog',
            templateUrl: 'tpls/blog/addBlog.html',
            controller:'BlogListController'
        })
        .state('blogDetail', {
            url: '/blogDetail/:blogId', //注意这里在路由中传参数的方式
            templateUrl: 'tpls/blog/blogDetail.html'
        })
});
