angular.module('tweetApp').controller('settingsController', ['userService', 'globalService', function(userService, globalService) {

    this.userService = userService
    this.globalService = globalService

    this.updatedUser = Object.assign({}, this.globalService.primaryUser)

    this.updateProfile = () => {
        console.log(this.updatedUser.credentials.username)
        console.log(this.updatedUser.credentials.password)
        this.userService.editProfile(this.updatedUser.credentials.username, this.updatedUser)
            .then((done) => {
                this.globalService.primaryUser.profile = this.updatedProfile
                return done.data
            })
    }

    this.deactivateProfile = () => {
        this.userService.deleteUser(this.updatedUser.credentials.username, this.updatedUser.credentials)
            .then((done) => {
                this.globalService.primaryUser = {}
                return done.data
        })
    }

}])