angular.module('tweetApp').controller('signInController', ['validateService', 'globalService', function (validateService, globalService) {
    this.globalService = globalService
    this.credentials = {}

    this.getCheckCredentials = () => {
        validateService.getCheckCredentials(this.credentials.username, this.credentials).then((done) => {
            if (done) globalService.login(credentials.username)
            return done.data
        })
    }

}])