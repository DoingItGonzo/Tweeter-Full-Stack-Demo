angular.module('tweetApp').component('userListComponent', {
    templateUrl: 'js/components/userList/userListTemplate.html',
    bindings: {
        users: '='
    }
})