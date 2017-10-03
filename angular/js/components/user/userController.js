angular.module('tweetApp').controller('userController', ['userService', function (userService) {

    this.userService = userService

    this.userList = []

    this.credentialsProfile = {}
    this.credentialsProfile.credentials = {}
    this.credentialsProfile.profile = {}

    this.credentialsProfile.credentials.username
    this.credentialsProfile.credentials.password

    this.credentialsProfile.profile.email
    this.credentialsProfile.profile.firstName
    this.credentialsProfile.profile.lastName
    this.credentialsProfile.profile.phone

    this.userToFollow

    this.getAllUsers = () => {
        this.userService.getAllUsers().then((done) => {
            console.log(done)
            this.userList = done.data
            return done.data
        })
    }

    this.makeUser = () => {
        this.userService.makeUser(this.credentialsProfile).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getUser = () => {
        this.userService.getUser(this.credentialsProfile.credentials.username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.editProfile = () => {
        this.userService.editProfile(this.credentialsProfile.credentials.username, this.credentialsProfile).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.deleteUser = () => {
        this.userService.deleteUser(this.credentialsProfile.credentials.username, this.credentialsProfile.credentials).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.followUser = () => {
        this.userService.followUser(this.userToFollow, this.credentialsProfile.credentials).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.unfollowUser = () => {
        this.userService.unfollowUser(this.userToFollow, this.credentialsProfile.credentials).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getFeed = () => {
        this.userService.getFeed(this.credentialsProfile.credentials.username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getTweets = () => {
        this.userService.getTweets(this.credentialsProfile.credentials.username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getMentions = () => {
        this.userService.getMentions(this.credentialsProfile.credentials.username).then((done) => {
            console.log(done)
            return done.data
        })
    }

    this.getFollowing = () => {
        this.userService.getFollowing(this.credentialsProfile.credentials.username).then((done) => {
            console.log(done)
            return done.data
        })
    }

}])