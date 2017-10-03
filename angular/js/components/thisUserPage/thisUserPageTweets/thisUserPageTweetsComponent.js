angular.module('tweetApp').component('thisUserPageTweetsComponent', {
    templateUrl: 'js/components/thisUserPage/thisUserPageTweets/thisUserPageTweetsTemplate.html',
    controller: 'thisUserPageTweetsController',
    bindings: {
        tweets: '='
    }
})