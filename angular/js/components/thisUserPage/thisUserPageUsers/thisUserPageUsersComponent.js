angular.module('tweetApp').component('thisUserPageUsersComponent', {
    templateUrl: 'js/components/thisUserPage/thisUserPageUsers/thisUserPageUsersTemplate.html',
    controller: 'thisUserPageUsersController',
    bindings: {
        users: '='
    }
})