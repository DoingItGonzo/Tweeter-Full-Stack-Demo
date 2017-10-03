angular.module('tweetApp').controller('thisUserPageController', ['userService', '$state', 'globalService', function(userService, state, globalService){
    
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
            state.go("thisUserPage.feed", {             
                tweets: done.data
            })
            return done.data
        })
    }

    this.getTweets = (username) => {
        userService.getTweets(username).then((done) => {
            console.log(done)
            state.go("thisUserPage.tweets", {             
                tweets: done.data
            })
            return done.data
        })
    }

    this.getMentions = (username) => {
        userService.getMentions(username).then((done) => {
            console.log(done)
            state.go("thisUserPage.mentions", {             
                tweets: done.data
            })
            return done.data
        })
    }

    this.getFollowing = (username) => {
        userService.getFollowing(username).then((done) => {
            console.log(done)
            state.go("thisUserPage.following", {             
                users: done.data
            })
        })
    }

    this.getFollowers = (username) => {
        userService.getFollowers(username).then((done) => {
            console.log(done)
            state.go("thisUserPage.followers", {             
                users: done.data
            })
        })
    }


    this.user = globalService.primaryUser
    

}])