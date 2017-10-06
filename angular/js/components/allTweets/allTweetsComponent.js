angular.module('tweetApp').component('allTweetsComponent', {
    templateUrl: 'js/components/allTweets/allTweetsTemplate.html',
    bindings: {
        tweets: '='
    }
})