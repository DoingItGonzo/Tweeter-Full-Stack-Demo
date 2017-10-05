angular.module('tweetApp').controller('signUpController', ['userService', 'globalService', 'validateService', function (userService, globalService, validateService) {

    this.userService = userService
    this.globalService = globalService
    this.validateService = validateService

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

    this.createUser = () => {
        if (!this.newUser.profile.email) {
            this.emailLeftBlank = true
            return null
        } else {
            this.emailLeftBlank = false    
        }
        
        if (!this.validateService.getUsernameAvailable(this.newUser.credentials.username).then((done) => {
            return done.data
        })) {
            this.usernameTaken = true
            return null
        }
        this.userService.makeUser(this.newUser).then((done) => {
            if (done) { 
                this.globalService.primaryUser.credentials = this.newUser.credentials
                this.globalService.login(this.newUser.credentials.username)
                this.failedSignUp = false
                return done.data
            } else
                this.failedSignUp = true
        })
    }


}])