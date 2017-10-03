angular.module('tweetApp').component('tweetComponent', {
    templateUrl: 'js/Template/tweetTemplate.html',
    controller: 'tweetController',
    bindings: {
        resolvedTweets: '='
    }
})