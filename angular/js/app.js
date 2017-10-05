angular.module('tweetApp', ['ui.router', 'ngCookies']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

    const testUserState = {
        name: 'testUser',
        url: '/testUser',
        component: 'testUserComponent'
    }
    const validateState = {
        name: 'validate',
        url: '/validate',
        component: 'validateComponent'
    }
    const signInSignUp = {
        name: 'signInSignUp',
        url: '/signInSignUp',
        component: 'signInSignUpComponent'
    }
    const signIn = {
        name: 'signIn',
        url: '/signIn',
        component: 'signInComponent'
    }
    const signUp = {
        name: 'signUp',
        url: '/signUp',
        component: 'signUpComponent'
    }
    const reactivateState = {
        name: 'reactivate',
        url: '/reactivate',
        component: 'reactivateComponent'
    }
    const settingState = {
        name: 'settings',
        url: '/settings',
        component: 'settingsComponent'
    }
    const tweetState = {
        name: 'tweets',
        url: '/tweets',
        component: 'tweetComponent'
    }

    const tweetListState = {
        name: 'tweetList',
        url: '/tweetList',
        component: 'tweetListComponent'
    }
    const userListState = {
        name: 'userList',
        url: '/userList',
        component: 'userListComponent'
    }
    const contextState = {
        name: 'context',
        url: '/context/{id}',
        component: 'contextComponent',
        resolve: {
            tweets: ['tweetService', '$stateParams', function (tweetService, stateParams) {
                return tweetService.getContext(stateParams.id).then((done) => {
                    return done.data.before.concat(done.data.target).concat(done.data.after)
                })
            }]
        }
    }

    const userPageState = {
        name: 'userPage',
        url: '/userPage/{username}',
        component: 'userPageComponent'
    }

    const userPageTweetsState = {
        name: 'userPage.tweets',
        url: '/tweets',
        component: 'tweetsComponent',
        resolve: {
            tweets: ['userService', '$stateParams', function (userService, stateParams) {
                return userService.getTweets(stateParams.username).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const userPageFeedState = {
        name: 'userPage.feed',
        url: '/feed',
        component: 'tweetsComponent',
        resolve: {
            tweets: ['userService', '$stateParams', function (userService, stateParams) {
                return userService.getFeed(stateParams.username).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const userPageMentionsState = {
        name: 'userPage.mentions',
        url: '/mentions',
        component: 'tweetsComponent',
        resolve: {
            tweets: ['userService', '$stateParams', function (userService, stateParams) {
                return userService.getMentions(stateParams.username).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const userPageFollowersState = {
        name: 'userPage.followers',
        url: '/followers',
        component: 'usersComponent',
        resolve: {
            users: ['userService', '$stateParams', function (userService, stateParams) {
                return userService.getFollowers(stateParams.username).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const userPageFollowingState = {
        name: 'userPage.following',
        url: '/following',
        component: 'usersComponent',
        resolve: {
            users: ['userService', '$stateParams', function (userService, stateParams) {
                return userService.getFollowing(stateParams.username).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const tweetsWithTagState = {
        name: 'tweetsWithTag',
        url: '/tweetsWithTag/{label}',
        component: 'tweetsWithTagComponent',
        resolve: {
            tweets: ['hashtagService', '$stateParams', function (hashtagService, stateParams) {
                console.log(stateParams.label)
                return hashtagService.getTaggedTweets(stateParams.label).then((done) => {
                    console.log(done.data)
                    return done.data
                })
            }]
        }
    }

    const allUsersState = {
        name: 'allUsers',
        url: '/allUsers',
        component: 'allUsersComponent',
        resolve: {
            users: ['userService', function (userService) {
                return userService.getAllUsers().then((done) => {
                    return done.data
                })
            }]
        }
    }

    const hashtagStateFinal = {
        name: 'allHashtags',
        url: '/allHashtags',
        component: 'hashtagListComponent',
        resolve: {
            hashtags: ['hashtagService', function (hashtagService) {
                return hashtagService.getAllTags().then((done) => {
                    return done.data
                })
            }]
        }
    }

    const allTweetState = {
        name: 'allTweets',
        url: '/allTweets',
        component: 'allTweetsComponent',
        resolve: {
            tweets: ['tweetService', function (tweetService) {
                return tweetService.getAllTweets().then((done) => {
                    return done.data
                })
            }]
        }
    }

    const directRepliesState = {
        name: 'direct_replies',
        url: '/direct_replies{tweetId}',
        component: 'tweetListComponent',
        resolve: {
            tweets: ['tweetService', '$stateParams', function (tweetService, stateParams) {
                return tweetService.getDirectReplies(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const directRepostsState = {
        name: 'direct_reposts',
        url: '/direct_reposts/{tweetId}',
        component: 'tweetListComponent',
        resolve: {
            tweets: ['tweetService', '$stateParams', function (tweetService, stateParams) {
                return tweetService.getDirectReposts(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const usersWhoLikedState = {
        name: 'who_liked',
        url: '/who_liked/{tweetId}',
        component: 'usersComponent',
        resolve: {
            users: ['tweetService', '$stateParams', function (tweetService, stateParams) {
                return tweetService.getUsersWhoLiked(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const userNotFoundState = {
        name:   'userNotFoundPage',
        url:    '/userNotFound',
        component:  'userNotFoundComponent'
    }

    const hashtagNotFoundState = {
        name:   'hashtagNotFoundPage',
        url:    '/hashtagNotFound',
        component:  'hashtagNotFoundComponent'
    }

    stateProvider.state(reactivateState)
    stateProvider.state(allUsersState)
    stateProvider.state(testUserState)
    stateProvider.state(settingState)
    stateProvider.state(validateState)
    stateProvider.state(hashtagStateFinal)
    stateProvider.state(signInSignUp)
    stateProvider.state(signIn)
    stateProvider.state(signUp)
    stateProvider.state(tweetListState)
    stateProvider.state(userPageState)
    stateProvider.state(userPageTweetsState)
    stateProvider.state(userPageFeedState)
    stateProvider.state(userPageMentionsState)
    stateProvider.state(userPageFollowersState)
    stateProvider.state(userPageFollowingState)
    stateProvider.state(userListState)
    stateProvider.state(contextState)
    stateProvider.state(tweetsWithTagState)
    stateProvider.state(allTweetState)
    stateProvider.state(directRepliesState)
    stateProvider.state(directRepostsState)
    stateProvider.state(usersWhoLikedState)
    stateProvider.state(userNotFoundState)
    stateProvider.state(hashtagNotFoundState)


    urlRouter.otherwise('/signIn')
}]).directive('dir', ['$compile', '$parse', function ($compile, $parse) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.$watch(attr.content, function () {
                element.html($parse(attr.content)(scope));
                $compile(element.contents())(scope);
            }, true);
        }
    }
}]).filter('createAnchors', ['$sce', function (sce) {
    return function (str) {
        const regexTag = /#(\S)+/g
        const regexUser = /@(\S)+/g
        const stringArray = str.split(' ')
        let m

        while ((m = regexTag.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regexTag.lastIndex) {
                regexTag.lastIndex++
            }

            // The result can be accessed through the `m`-variable.
            for (let i = 0; i < stringArray.length; i++) {
                if (stringArray[i] === m[0]) {
                    stringArray[i] = String(stringArray[i]).replace(m[0], '<a ui-sref="tweetsWithTag({label: \'' + m[0].substring(1) + '\'})">' + m[0] + '</a>')
                }
            }
            //newString = str.replace(m[0], '<input type="button" value="' + m[0] + '" ng-click="$ctrl.goToTag(\'' + m[0].substring(1) + '\')"></input>')
        }

        while ((m = regexUser.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regexUser.lastIndex) {
                regexUser.lastIndex++
            }

            // The result can be accessed through the `m`-variable.
            for (let i = 0; i < stringArray.length; i++) {
                if (stringArray[i] === m[0]) {
                    stringArray[i] = String(stringArray[i]).replace(m[0], '<a ui-sref="userPage({ username: \'' + m[0].substring(1) + '\'})" ui-sref-opts="{reload: true}">' + m[0] + '</a>')
                }
            }
            //newString = str.replace(m[0], '<input type="button" value="' + m[0] + '" ng-click="$ctrl.goToTag(\'' + m[0].substring(1) + '\')"></input>')
        }


        const newString = stringArray.join(' ')
        return sce.trustAsHtml(newString)
    }
}]).run(['$rootScope', '$location', '$window', 'stateService', '$stateParams', '$state', 'globalService', '$cookies',
function ($rootScope, $location, $window, stateService, $stateParams, state, globalService, $cookies) {
    //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
    //bind in induvidual controllers.

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.actualLocation = $location.path();
    });


    $rootScope.$watch(function () { return $location.path() }, function (newLocation, oldLocation) {

        

        //true only for onPopState
        if ($rootScope.actualLocation === newLocation) {
            // Pressed an arrow
            if (stateService.stateHistoryIndex - 1 >= 0 && stateService.stateHistory[stateService.stateHistoryIndex - 1].name === newLocation)
            {
                //Press back arrow
                stateService.stateHistoryIndex--
                
            }
            else if (stateService.stateHistoryIndex + 1 < stateService.stateHistory.length && stateService.stateHistory[stateService.stateHistoryIndex + 1].name === newLocation)
            {
                //Press forward arrow
                stateService.stateHistoryIndex++
            }
            console.log(stateService.stateHistory)
            console.log(stateService.stateHistoryIndex)

            const stateHistoryObj = stateService.stateHistory[stateService.stateHistoryIndex]
            const stateGoName = stateHistoryObj.name.substring(1).replace(/\//g, '.')
            const stateGoParams = stateHistoryObj.stateParams

            state.go(stateGoName, stateGoParams, {reload:true})

        } else {
            // Pressed a link
            stateService.addToHistory(newLocation, Object.assign({}, $stateParams))
        }

    })

    this.username = $cookies.get('username')
    this.password = $cookies.get('password')

    if (this.username !== undefined && this.password !== undefined)
    {
        globalService.primaryUser.credentials.username = this.username
        globalService.primaryUser.credentials.password = this.password
        globalService.login(this.username)
    }


}])
