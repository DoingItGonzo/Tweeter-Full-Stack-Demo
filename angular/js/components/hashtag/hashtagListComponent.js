angular.module('tweetApp').component('hashtagListComponent', {
    templateUrl: 'js/components/hashtag/hashtagListTemplate.html',
    controller: 'hashtagListController',
    bindings: {
        hashtags: '='
    }

})