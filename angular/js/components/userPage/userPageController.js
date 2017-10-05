angular.module('tweetApp').controller('userPageController', ['userService', 'tweetService', 'globalService', '$state', '$stateParams', 
function(userService, tweetService, globalService, state, stateParams){
    
    this.getUser = () => {
        userService.getUser(this.username).then((done) => {
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
        tweetService.createTweet(this.contentCredentials).then((done) => {
            state.go('userPage.feed', {
                username: this.contentCredentials.credentials.username
            }, {
                reload: true
            })
        })
    }

    this.getFollowing = () => {
        userService.getFollowing(globalService.primaryUser.credentials.username).then((done) => {
            this.isFollowing = false
            for (let key in done.data)
            {
                if (done.data.hasOwnProperty(key))
                {
                    if (done.data[key].username === this.username)
                    {
                        this.isFollowing = true
                    }
                }
            }
            return done.data
        })
    }

    this.followUser = () => {
        userService.followUser(this.username, globalService.primaryUser.credentials).then((done) => {
            this.isFollowing = true
            return done.data
        })
    }

    this.unfollowUser = () => {
        userService.unfollowUser(this.username, globalService.primaryUser.credentials).then((done) => {
            this.isFollowing = false
            return done.data
        })
    }



    this.username = stateParams.username
    this.isPrimaryUser = false
    if (globalService.loggedIn === true && this.username === globalService.primaryUser.credentials.username)
    {
        this.password = globalService.primaryUser.credentials.password
        this.getFollowing()
        this.isPrimaryUser == true
    }
    this.user = this.getUser()

     
    

}])