angular.module('tweetApp').controller('settingsController', ['userService', '$state', 'globalService', function (userService, state, globalService) {

    this.userService = userService
    this.globalService = globalService

    this.updatedUser = Object.assign({}, this.globalService.primaryUser)

    if (!globalService.loggedIn) state.go('signIn')

    this.updateProfile = () => {
        this.userService.editProfile(this.updatedUser.credentials.username, this.updatedUser)
            .then((done) => {
                this.globalService.primaryUser.profile = this.updatedProfile
            })
    }

    this.deactivateProfile = () => {
        this.userService.deleteUser(this.updatedUser.credentials.username, this.updatedUser.credentials)
            .then((done) => {
                this.globalService.logout()
            })
    }

}])