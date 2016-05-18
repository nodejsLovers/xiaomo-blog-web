/**
 * Created by Administrator on 2016/5/18.
 */
angular.module('filter', [])
    .filter('transformGenderFilter', function () {//转换男女显示
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