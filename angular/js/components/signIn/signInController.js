angular.module('tweetApp').controller('signInController', ['validateService', 'globalService', function (validateService, globalService) {
    this.globalService = globalService

    this.credentials = {}
    this.credentials.username
    this.credentials.password

    this.userLogin = () => {
        validateService.getCheckCredentials(this.credentials.username, this.credentials).then((done) => {
            if (done.data) { 
                this.globalService.primaryUser.credentials = this.credentials
                console.log(this.credentials)
                globalService.login(this.credentials.username)
                return done.data
            }
        })
    }

}])