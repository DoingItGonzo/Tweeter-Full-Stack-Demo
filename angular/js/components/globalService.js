angular.module('tweetApp').service('globalService', ['hashtagService', 'userService', '$state', function (hashtagService, userService, state) {
    
this.hashtagService = hashtagService
this.userService = userService

this.primaryUser = {}
this.primaryUser.credentials = {}
this.primaryUser.profile = {}

this.primaryUser.credentials.username
this.primaryUser.credentials.password

this.primaryUser.profile.email
this.primaryUser.profile.firstName
this.primaryUser.profile.lastName
this.primaryUser.profile.phone

this.login = (username) => {
    userService.getUser(username).then((done) => {
        console.log(done)
        this.primaryUser.profile = done.data.profile
        state.go('userPage', {
            username: this.primaryUser.credentials.username
        })
        return done.data
    })
}
this.logout = () => {
    this.primaryUser = {}
    state.go('signIn')
    return null
}
}])