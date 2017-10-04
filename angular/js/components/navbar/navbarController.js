angular.module('tweetApp').controller('navbarController', ['globalService', '$state', function(globalService, state) {

    this.globalService = globalService

    this.userSearch

    this.search = () => {
        if (this.userSearch.startsWith("@")) {
            globalService.userService.getUser(this.userSearch.substring(1))
        }
        else if (this.userSearch.startsWith("#")) {
            state.go('tweetsWithTag', {
                label: this.userSearch.substring(1)
            })
        }
    }

}])