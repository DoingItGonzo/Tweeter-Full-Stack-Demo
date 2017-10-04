angular.module('tweetApp').controller('userPageController', ['userService', 'tweetService', '$state', '$stateParams', 
function(userService, tweetService, state, stateParams){
    
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
                credentials: this.contentCredentials.credentials
            }, {
                reload: true
            })
        })
    }



    this.username = stateParams.credentials.username
    this.password = stateParams.credentials.password
    this.user = this.getUser()
    

}])