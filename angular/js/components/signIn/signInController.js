angular.module('tweetApp').controller('signInController', ['validateService', 'globalService', '$state', function (validateService, globalService, state) {
    this.globalService = globalService

    this.credentials = {}
    this.credentials.username
    this.credentials.password

    this.failedSignIn = false

    this.userLogin = () => {
        validateService.getCheckCredentials(this.credentials.username, this.credentials).then((done) => {
            if (done.data) {
                this.globalService.primaryUser.credentials = this.credentials
                globalService.login(this.credentials.username)
                this.failedSignIn = false
            } else
                this.failedSignIn = true
        })
    }
    this.signUpPage = () => {
        state.go('signUp')
    }
    this.reactivateAccountPage = () => {
        state.go('reactivate')
    }

}])