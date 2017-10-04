angular.module('tweetApp').component('tweetsWithTagComponent', {
    templateUrl: 'js/components/tweetList/tweetsWithTagTemplate.html',
    controller: 'tweetsWithTagController',
    bindings: {
        tweets: '='
    }
})