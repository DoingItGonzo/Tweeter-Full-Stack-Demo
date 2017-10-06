angular.module('tweetApp', ['ui.router', 'ngCookies']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

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
        url: '/user/{username}',
        component: 'userPageComponent'
    }

    const userPageTweetsState = {
        name: 'userPage.tweets',
        url: '/tweets',
        component: 'tweetListComponent',
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
        component: 'tweetListComponent',
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
        component: 'tweetListComponent',
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
        component: 'userListComponent',
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
        component: 'userListComponent',
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
        url: '/hashtag/{label}',
        component: 'tweetListComponent',
        resolve: {
            tweets: ['hashtagService', '$stateParams', function (hashtagService, stateParams) {
                return hashtagService.getTaggedTweets(stateParams.label).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const allUsersState = {
        name: 'allUsers',
        url: '/users',
        component: 'userListComponent',
        resolve: {
            users: ['userService', function (userService) {
                return userService.getAllUsers().then((done) => {
                    return done.data
                })
            }]
        }
    }

    const hashtagState = {
        name: 'allHashtags',
        url: '/hashtags',
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
        url: '/tweets',
        component: 'tweetListComponent',
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
        url: '/replies/{tweetId}',
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
        url: '/reposts/{tweetId}',
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
        url: '/liked/{tweetId}',
        component: 'userListComponent',
        resolve: {
            users: ['tweetService', '$stateParams', function (tweetService, stateParams) {
                return tweetService.getUsersWhoLiked(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const userNotFoundState = {
        name: 'userNotFoundPage',
        url: '/userNotFound',
        component: 'userNotFoundComponent'
    }

    const hashtagNotFoundState = {
        name: 'hashtagNotFoundPage',
        url: '/hashtagNotFound',
        component: 'hashtagNotFoundComponent'
    }

    stateProvider.state(reactivateState)
    stateProvider.state(allUsersState)
    stateProvider.state(settingState)
    stateProvider.state(hashtagState)
    stateProvider.state(signIn)
    stateProvider.state(signUp)
    stateProvider.state(userPageState)
    stateProvider.state(userPageTweetsState)
    stateProvider.state(userPageFeedState)
    stateProvider.state(userPageMentionsState)
    stateProvider.state(userPageFollowersState)
    stateProvider.state(userPageFollowingState)
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
}]).run(['$rootScope', '$location', 'globalService', '$cookies',
    function ($rootScope, $location, globalService, $cookies) {
        //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
        //bind in induvidual controllers.

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });

        this.username = $cookies.get('username')
        this.password = $cookies.get('password')

        if (this.username !== undefined && this.password !== undefined) {
            globalService.primaryUser.credentials.username = this.username
            globalService.primaryUser.credentials.password = this.password
            globalService.login(this.username)
        }


    }]).directive('ngConfirmClick', [
        function () {
            return {
                link: function (scope, element, attr) {
                    // Puts the message in the alert
                    var msg = attr.ngConfirmClick || "Are you sure?"
                    // Set what the html binding for the function will be
                    var clickAction = attr.confirmedClick
                    // Binds the clickAction to the button if the OK button is clicked
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }])
