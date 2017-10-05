angular.module('tweetApp').component('hashtagComponent', {
    templateUrl: 'js/components/hashtag/hashtagTemplate.html',
    controller: 'hashtagController',
    bindings:{
        hashtag : '='
    }
})