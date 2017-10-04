angular.module('tweetApp').controller('signUpController', ['userService', 'globalService', function (userService, globalService) {

    this.userService = userService
    this.globalService = globalService

    this.newUser = {}
    this.newUser.credentials = {}
    this.newUser.profile = {}

    this.newUser.credentials.username
    this.newUser.credentials.password

    this.newUser.profile.email
    this.newUser.profile.firstName
    this.newUser.profile.lastName
    this.newUser.profile.phone

    this.createUser = () => {
        this.userService.makeUser(this.newUser).then((done) => {
            if (done) { 
                this.globalService.primaryUser.credentials = this.newUser.credentials
                this.globalService.login(this.newUser.credentials.username)
                return done.data
            }       
        })
    }


}])