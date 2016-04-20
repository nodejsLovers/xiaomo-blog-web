angular.module("myFilterModule", [])
    .filter('contentFilter', function () {
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
}); 