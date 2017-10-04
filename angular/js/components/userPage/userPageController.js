angular.module('tweetApp').controller('userPageController', ['userService', '$state', '$stateParams', function(userService, state, stateParams){
    
    this.getUser = () => {
        userService.getUser(this.username).then((done) => {
            console.log(done)
            this.user = done.data
            return done.data
        })
    }





    this.username = stateParams.credentials.username
    this.password = stateParams.credentials.password
    this.user = this.getUser()
    

}])