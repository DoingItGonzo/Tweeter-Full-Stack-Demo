angular.module('tweetApp').controller('reactivateController', ['userService', 'globalService', 'validateService', function (userService, globalService, validateService) {

    this.globalService = globalService

    this.reactivatedUser = {}
    this.reactivatedUser.credentials = {}
    this.reactivatedUser.credentials.username
    this.reactivatedUser.credentials.password
    this.reactivatedUser.profile = {}

    this.userAlreadyActive = false
    this.userNotFound = false

    this.reactivate = () => {
        validateService.getUsernameAvailable(this.reactivatedUser.credentials.username).then((done) => {
            if (done.data) {
                this.userNotFound = true
            }
        })
        validateService.getUsernameExists(this.reactivatedUser.credentials.username).then((done) => {
            console.log(done.data)
            if (done.data) {
                this.userAlreadyActive = true
            } else {
                this.userAlreadyActive = false
                this.userNotFound = false
                this.globalService.reactivateAccount(this.reactivatedUser)
            }
        })
    }
    this.returnToLogin = () => {
        this.globalService.reactivatePageSignInReturn()
    }

}])