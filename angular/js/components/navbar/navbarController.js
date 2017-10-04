angular.module('tweetApp').controller('navbarController', ['globalService', '$state', function (globalService, state) {

    this.globalService = globalService

    this.userSearch

    this.searchedUser = {}
    this.searchedUser.credentials = {}
    this.searchedUser.profile = {}

    this.searchedUser.credentials.username
    this.searchedUser.credentials.password

    this.searchedUser.profile.email
    this.searchedUser.profile.firstName
    this.searchedUser.profile.lastName
    this.searchedUser.profile.phone

    this.search = () => {
        if (this.userSearch.startsWith("@")) {
            globalService.userService.getUser(this.userSearch.substring(1)).then((done) => {
                console.log(done)
                this.searchedUser = done.data
                state.go('userPage', {
                    credentials: {
                        username: this.searchedUser.username,
                        password: undefined
                    }
                })
            })
        }
        else if (this.userSearch.startsWith("#")) {
            console.log(this.userSearch)
            state.go('tweetsWithTag', {
                label: this.userSearch.substring(1)
            })
        }
    }
    this.homePage = () => {
        globalService.userService.getUser(globalService.primaryUser.credentials.username).then((done) => {
            console.log(done)
            this.searchedUser = done.data
            state.go('userPage', {
                credentials: {
                    username: this.searchedUser.username,
                    password: undefined
                }
            })
        })
    }

}])