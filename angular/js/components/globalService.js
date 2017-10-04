angular.module('tweetApp').service('globalService', ['userService', '$state', function (userService, state) {
    

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
            credentials: this.primaryUser.credentials
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