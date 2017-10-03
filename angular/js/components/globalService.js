angular.module('tweetApp').service('globalService', ['userService', function (userService) {
    

this.primaryUser = {}
this.primaryUser.credentials = {}
this.primaryUser.profile = {}

this.primaryUser.credentials.username
this.primaryUser.credentials.password

this.primaryUser.profile.email
this.primaryUser.profile.firstName
this.primaryUser.profile.lastName
this.primaryUser.profile.phone

const login = (username) => {
    userService.getUser(username).then((done) => {
        console.log(done)
        this.primaryUser.credentials = done.data.credentials
        this.primaryUser.profile = done.data.profile
        return done.data
    })
}
}])