angular.module('tweetApp').controller('settingsController', ['userService', '$state', 'globalService', function(userService, state, globalService) {

    this.userService = userService
    this.globalService = globalService

    this.updatedUser = {}
    this.updatedUser.credentials = this.globalService.primaryUser.credentials
    this.updatedUser.profile = {}
    this.updatedUser.profile.email
    this.updatedUser.profile.firstName
    this.updatedUser.profile.lastName
    this.updatedUser.profile.phone

    if (!globalService.loggedIn) state.go('signIn')

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