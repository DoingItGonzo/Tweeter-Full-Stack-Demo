angular.module('tweetApp').component('allUsersComponent', {
    templateUrl: 'js/components/usersComponent/allUsersTemplate.html',
    bindings: {
        users: '='
    }
})