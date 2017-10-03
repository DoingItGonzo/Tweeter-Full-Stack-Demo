angular.module('tweetApp').controller('tweetListController', ['tweetService', function (tweetService) {

    this.getAllTweets = () => {
        return tweetService.getAllTweets().then((done) => {
            this.tweets = done.data
            return done.data
        })
    }

}])