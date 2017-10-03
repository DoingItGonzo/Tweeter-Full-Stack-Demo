angular.module('tweetApp').component('tweetComponent', {
    templateUrl: 'js/components/tweet/tweetTemplate.html',
    controller: 'tweetController',
    bindings: {
        resolvedTweets: '='
    }
})