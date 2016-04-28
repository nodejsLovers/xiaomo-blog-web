/**
 * 把今天最好的表现当作明天最新的起点．．～
 * いま 最高の表現 として 明日最新の始発．．～
 * Today the best performance  as tomorrow newest starter!
 * Created by IntelliJ IDEA.
 *
 * @author: xiaomo
 * @github: https://github.com/qq83387856
 * @email: hupengbest@163.com
 * @QQ_NO: 83387856
 * @Date: 2016/4/2515:58
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/
myApp.factory('myInterceptor', function ($q) {
    var interceptor = {
        'request': function (config) {
            // 成功的请求方法
            return config; // 或者 $q.when(config);
        },
        'response': function (response) {
            // 响应成功
            return response; // 或者 $q.when(config);
        },
        'requestError': function (rejection) {
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
            return response; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        },
        'responseError': function (rejection) {
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
            return rejection; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        }
    };
    return interceptor;
});