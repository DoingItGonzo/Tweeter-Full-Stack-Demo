angular.module('tweetApp').controller('signUpController', ['userService', 'globalService', 'validateService', function (userService, globalService, validateService) {

    this.userService = userService
    this.globalService = globalService
    this.validateService = validateService

    if (this.globalService.loggedIn) state.go('userPage', {
        username: this.globalService.primaryUser.credentials.username
    })

    this.newUser = {}
    this.newUser.credentials = {}
    this.newUser.profile = {}

    this.newUser.credentials.username
    this.newUser.credentials.password

    this.newUser.profile.email
    this.newUser.profile.firstName
    this.newUser.profile.lastName
    this.newUser.profile.phone

    this.usernameTaken = false
    this.emailLeftBlank = false
    this.accountCreationFailed = false

    this.createUser = () => {
        if (!this.newUser.profile.email) {
            this.emailLeftBlank = true
        } else {
            this.emailLeftBlank = false
        }
        this.validateService.getUsernameAvailable(this.newUser.credentials.username).then((done) => {
            if (!done.data) {
                this.usernameTaken = true
            } else {
                this.usernameTaken = false
            }
        })
        this.userService.makeUser(this.newUser).then((done) => {
            if (done) {
                this.globalService.primaryUser.credentials = this.newUser.credentials
                this.globalService.login(this.newUser.credentials.username)
                this.accountCreationFailed = false
            } else
                this.accountCreationFailed = true
        })
    }


}])