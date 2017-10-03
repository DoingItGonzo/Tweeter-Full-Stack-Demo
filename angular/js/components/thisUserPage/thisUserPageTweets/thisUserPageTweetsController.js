angular.module('tweetApp').controller('thisUserPageTweetsController', ['$stateParams', function(params){
    console.log(params)
    this.tweets = params.tweets

}])