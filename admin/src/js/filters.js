angular.module("myFilterModule", [])
    .filter('contentFilter', function () {//截取字符串
        return function (content) {
            if (content.length > 20) {
                content = content.substring(0, 20) + "...";
            }
            return content;
        };
    }).filter('IdFilter', function () {
    return function (currentId, pointId) {
        return currentId !== pointId;
    };
}).filter('transformGenderFilter', function () {//转换男女显示
        return function (content) {
            if (content == 1) {
                return "男";
            } else if (content == 2) {
                return '女';
            } else {
                return '保密';
            }

        }
    })
    .filter('transformStatusFilter', function () {//转换帐号显示状态
        return function (content) {
            if (content == 1) {
                return "正常";
            } else if (content == 2) {
                return '异常';
            } else {
                return '默认';
            }
        }
    }).filter('transformAdminLevelFilter', function () {//转换后台帐号显示状态
    return function (content) {
        if (content == 1) {
            return "超级管理员";
        } else if (content == 2) {
            return '普通管理员';
        } else {
            return '默认观察者';
        }
    }
}).filter('tagIdsFilter', function () {
    return function (tagIds) {
        
    }
});