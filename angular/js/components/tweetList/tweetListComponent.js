angular.module('tweetApp').component('tweetListComponent', {
    templateUrl: 'js/components/tweetList/tweetListTemplate.html',
    bindings: {
        tweets: '='
    }
})