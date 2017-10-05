angular.module('tweetApp').service('globalService', ['hashtagService', 'userService', '$state', '$cookies', 
function (hashtagService, userService, state, cookies) {
    
this.hashtagService = hashtagService
this.userService = userService

this.loggedIn = false

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
        this.loggedIn = true
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
    this.loggedIn = false
    state.go('signIn')
    return null
}
this.reactivateAccount = (reactivatedUser) => {
    userService.makeUser(reactivatedUser).then((done) => {
        console.log(done.data)
        this.primaryUser.credentials = reactivatedUser.credentials
        this.primaryUser.profile = done.data.profile
        state.go('userPage', {
            username: this.primaryUser.credentials.username
        })
    })
}
this.reactivatePageSignInReturn = () => {
    state.go('signIn')
}
}])