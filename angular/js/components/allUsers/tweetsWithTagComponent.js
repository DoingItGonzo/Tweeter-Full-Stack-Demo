angular.module('tweetApp').component('tweetsWithTagComponent', {
    templateUrl: 'js/components/allUsers/tweetsWithTagTemplate.html',
    controller: 'tweetsWithTagController',
    bindings: {
        tweets: '='
    }
})