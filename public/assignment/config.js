/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/user/register.view.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.html"
            })
            .when("/admin", {
                templateUrl: "views/user/admin.view.html"
            })

    }

})();