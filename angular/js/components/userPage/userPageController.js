angular.module('tweetApp').controller('userPageController', ['userService', 'tweetService', 'globalService', '$state', '$stateParams', '$rootScope', '$location', 
function(userService, tweetService, globalService, state, stateParams, rootScope, location){

    this.getUser = () => {
        userService.getUser(this.username).then((done) => {
            this.user = done.data
            return done.data
        })
    }

    this.createTweet = () => {
        this.contentCredentials = {}
        this.contentCredentials.content = this.content
        this.contentCredentials.credentials = {}
        this.contentCredentials.credentials.username = this.username
        this.contentCredentials.credentials.password = this.password
        tweetService.createTweet(this.contentCredentials).then((done) => {
            state.go('userPage.feed', {
                username: this.contentCredentials.credentials.username
            }, {
                reload: true
            })
            this.activateButton(this.buttonClasses.feedButtonClass)
        })
    }

    this.getFollowing = () => {
        userService.getFollowing(globalService.primaryUser.credentials.username).then((done) => {
            this.isFollowing = false
            for (let key in done.data)
            {
                if (done.data.hasOwnProperty(key))
                {
                    if (done.data[key].username === this.username)
                    {
                        this.isFollowing = true
                    }
                }
            }
            return done.data
        })
    }

    this.followUser = () => {
        userService.followUser(this.username, globalService.primaryUser.credentials).then((done) => {
            this.isFollowing = true
            return done.data
        })
    }

    this.unfollowUser = () => {
        userService.unfollowUser(this.username, globalService.primaryUser.credentials).then((done) => {
            this.isFollowing = false
            return done.data
        })
    }

    this.buttonClasses = {
        followersButtonClass: 'btn btn-block',
        followingButtonClass: 'btn btn-block',
        mentionsButtonClass: 'btn btn-block',
        tweetsButtonClass: 'btn btn-block',
        feedButtonClass: 'btn btn-block'
    }

    this.activateButton = (buttonPressed) => {
        for (let key in this.buttonClasses)
        {
            if (this.buttonClasses.hasOwnProperty(key))
            {
                if (key === buttonPressed)
                {
                    this.buttonClasses[key] = 'btn active btn-block buttonUserPageLeft'
                }
                else
                {
                    this.buttonClasses[key] = 'btn btn-block'
                }
            }
        }
        
    }



    this.username = stateParams.username
    this.isPrimaryUser = false
    this.canDoFollow = false
    if (globalService.loggedIn === true)
    {
        if (this.username === globalService.primaryUser.credentials.username)
        {
            this.password = globalService.primaryUser.credentials.password
        }
        else
        {
            this.getFollowing()
            this.canDoFollow = true

        }
    }
    
    this.user = this.getUser()

    rootScope.$watch(function () { return location.path() }, (newLocation, oldLocation) => {
        console.log(newLocation)
        if (newLocation.includes('feed'))
        {
            this.activateButton('feedButtonClass')
        }
        else if (newLocation.includes('tweets'))
        {
            this.activateButton('tweetsButtonClass')
        }
        else if (newLocation.includes('mentions'))
        {
            this.activateButton('mentionsButtonClass')
        }
        else if (newLocation.includes('following'))
        {
            this.activateButton('followingButtonClass')
        }
        else if (newLocation.includes('followers'))
        {
            this.activateButton('followersButtonClass')
        }
        else
        {
            for (let key in this.buttonClasses)
            {
                if (this.buttonClasses.hasOwnProperty(key))
                {
                    this.buttonClasses[key] = 'btn btn-block'
                }
            }
        }
    })

     
    

}])