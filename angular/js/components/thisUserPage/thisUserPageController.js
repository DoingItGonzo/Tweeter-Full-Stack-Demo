angular.module('tweetApp').controller('thisUserPageController', ['userService', '$state', function(userService, state){
    
    this.getUser = (username) => {
        userService.getUser(username).then((done) => {
            console.log(done)
            this.user = done.data
            return done.data
        })
    }

    this.getFeed = (username) => {
        userService.getFeed(username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getTweets = (username) => {
        userService.getTweets(username).then((done) => {
            console.log(done)
            state.go(".tweets", {             
                tweets: done.data
            });
            return done.data
        })
    }

    this.getMentions = (username) => {
        userService.getMentions(username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getFollowing = (username) => {
        userService.getFollowing(username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getFollowers = (username) => {
        userService.getFollowers(username).then((done) => {
            console.log(done)
            return done.data
        })
    }


    // For testing only
    this.username = 'jeff'

    this.user = this.getUser(this.username)

    

}])