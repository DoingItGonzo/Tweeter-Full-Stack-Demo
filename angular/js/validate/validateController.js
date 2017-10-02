angular.module('tweetApp').controller('validateController', ['validateService', function (validateService) {

    this.getValidateTag = () => {
        validateService.getLabelExists(this.label).then((done) => {
            console.log(done.data)
            this.validTag = done.data;
            return done.data;
        })
    }
    this.getAvailableUsername = () => {
        validateService.getUsernameAvailable(this.username).then((done) => {
            console.log(done.data);
            this.available = done.data;
            return done.data;
        })
    }
    this.getExistUsername = () => {
        validateService.getUsernameExists(this.usernameExists).then((done) => {
            console.log(done.data);
            this.exists = done.data;
            return done.data;
        })
    }

    this.getCheckCredentials = () => {
        validateService.getCheckCredentials(this.credentials.username, this.credentials).then((done) => {
            console.log(done.data)
            return done.data
        })
    }
}])