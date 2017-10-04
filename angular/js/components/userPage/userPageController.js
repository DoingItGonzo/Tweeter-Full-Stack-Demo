angular.module('tweetApp').controller('userPageController', ['userService', 'tweetService', 'globalService', '$state', '$stateParams', 
function(userService, tweetService, globalService, state, stateParams){
    
    this.getUser = () => {
        userService.getUser(this.username).then((done) => {
            console.log(done)
            this.user = done.data
            return done.data
        })
    }

    this.createTweet = () => {
        this.contentCredentials = {}
        this.contentCredentials.content = this.content
        this.contentCredentials.credentials = {}
        this.contentCredentials.credentials.username = this.username
        this.contentCredentials.credentials.password = this.password
        console.log(this.contentCredentials)
        tweetService.createTweet(this.contentCredentials).then((done) => {
            state.go('userPage.feed', {
                username: this.contentCredentials.credentials.username
            }, {
                reload: true
            })
        })
    }



    this.username = stateParams.username
    if (this.username === globalService.primaryUser.credentials.username)
    {
        this.password = globalService.primaryUser.credentials.password
    }
    console.log(this.password)
    this.user = this.getUser()
    

}])