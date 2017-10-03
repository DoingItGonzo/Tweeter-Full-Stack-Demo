angular.module('tweetApp').controller('thisUserPageUsersController', ['$stateParams', function( params){
    console.log(params)
    this.users = params.users

}])