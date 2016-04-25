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
myApp.factory('UserInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
    return {
        request: function (config) {
            config.headers["TOKEN"] = $rootScope.user.token;
            return config;
        },
        responseError: function (response) {
            var data = response.data;
            // 判断错误码，如果是未登录
            if (data["errorCode"] == "500999") {
                // 清空用户本地token存储的信息，如果
                $rootScope.user = {token: ""};
                // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                $rootScope.$emit("userIntercepted", "notLogin", response);
            }
            // 如果是登录超时
            if (data["errorCode"] == "500998") {
                $rootScope.$emit("userIntercepted", "sessionOut", response);
            }
            return $q.reject(response);
        }
    };
}]);