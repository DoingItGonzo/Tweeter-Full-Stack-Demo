angular.module('tweetApp').controller('tweetsWithTagController', ['$stateParams', function( params){
    console.log(params)
    this.tweets = params.tweets

}])