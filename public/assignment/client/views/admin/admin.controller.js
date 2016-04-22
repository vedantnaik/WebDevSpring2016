/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,$location,UserService){

        var vm = this;

        vm.reverse = false;
        vm.predicate = 'username';
        vm.selectedFormIndex = null;
        vm.disable = true;
        vm.newuser = {};

        vm.sort = sort;
        vm.remove = remove;
        vm.update = update;
        vm.add    = add;
        vm.selectUser = selectUser;

        init();

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (res) {
                        vm.users = res.data;
                    },
                    function (err) {
                        vm.error = "could not load all users";
                    });
        }

        function sort(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }

        function add(user){
            var userToCreate = user;
            if(userToCreate.emails) {
                //userToCreate.emails = splitByCommaAndTrim(userToCreate.emails);
                //console.log(userToCreate.emails);
                userToCreate.emails = [userToCreate.emails];
            } else {
                vm.message = "Please enter an email id to register!";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .then(function(res){
                    if(res.data) {
                        vm.message = "We're sorry, another user has already taken this username! " +
                            "Please try registering with another username.";
                        return;
                    } else {
                        UserService
                            .createUser(userToCreate)
                            .then(
                                function ( resp ){
                                    // new user created
                                    UserService
                                        .findAllUsers()
                                        .then(
                                            function (res) {
                                                vm.users = res.data;
                                                vm.newuser = {};
                                            },
                                            function (err) {
                                                vm.error = "could not load all users";
                                            });
                                },
                                function ( err ) {
                                    // error creating new user
                                    alert("Unable to create new user. Try Again!");
                                });
                    }
                });

        }

        function remove(userId){
            UserService.deleteUserById(userId)
                .then(function(response){

                    UserService
                        .findAllUsers()
                        .then(
                            function (res) {
                                vm.users = res.data;
                            },
                            function (err) {
                                vm.error = "could not load all users";
                            });

                }, function(err){
                    vm.error = err;
                });

        }

        function update(user){


            UserService.updateUser(user._id,user)
                .then(function(response){

                    UserService
                        .findAllUsers()
                        .then(
                            function (res) {
                                vm.users = res.data;
                                vm.newuser = {};
                                vm.selectedUserIndex = null;
                                vm.disable = true;

                            },
                            function (err) {
                                vm.error = "could not load all users";
                            });
                }, function(err){
                    vm.error = err;
                });

        }

        function selectUser(user,index){
            vm.selectedUserIndex = index;
            vm.newuser = user;
            vm.disable = false;
        }


    }
})();