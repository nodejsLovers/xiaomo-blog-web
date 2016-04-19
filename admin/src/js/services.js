angular.module("myServiceModule", [])
    .service('getBlogListService', function ($http) {
        var value = {};
        value.test = {
           xiaomo:'xiaomo'
    };

        return value;
    });
