angular.module('tweetApp').service('globalService', ['hashtagService', 'userService', '$state', '$cookies', 
function (hashtagService, userService, state, cookies) {
    
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
        cookies.put('username', this.primaryUser.credentials.username)
        cookies.put('password', this.primaryUser.credentials.password)
        this.primaryUser.profile = done.data.profile
        state.go('userPage', {
            username: this.primaryUser.credentials.username
        })
        return done.data
    })
}
this.logout = () => {
    this.primaryUser = {}
    cookies.remove('username')
    cookies.remove('password')
    state.go('signInSignUp')
    return null
}
}])