angular.module('tweetApp').controller('thisUserPageTweetsController', ['userService', '$stateParams', function(userService, params){
    console.log(params)
    this.tweets = params.tweets

}])