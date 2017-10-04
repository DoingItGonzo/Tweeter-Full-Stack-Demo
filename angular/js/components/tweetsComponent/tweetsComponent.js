angular.module('tweetApp').component('tweetsComponent', {
    templateUrl: 'js/components/tweetsComponent/tweetsTemplate.html',
    bindings: {
        tweets: '='
    }
})