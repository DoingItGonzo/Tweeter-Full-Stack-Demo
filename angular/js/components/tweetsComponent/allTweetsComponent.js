angular.module('tweetApp').component('allTweetsComponent', {
    templateUrl: 'js/components/tweetsComponent/allTweetsTemplate.html',
    bindings: {
        tweets: '='
    }
})