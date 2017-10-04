angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

    const hashtagState = {
        name: 'hashtags',
        url: '/tags',
        component: 'hashtagComponent'
    }
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
        url: '/context',
        component: 'contextComponent'
    }

    const userPageState = {
        name: 'userPage',
        url: '/userPage',
        component: 'userPageComponent',
        params: {
            credentials: null
        }
    }

    const userPageTweetsState = {
        name: 'userPage.tweets',
        url: '/tweets',
        component: 'tweetsComponent',
        resolve: {
            tweets: ['userService', '$stateParams', function (userService, stateParams) {
                return userService.getTweets(stateParams.credentials.username).then((done) => {
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
                return userService.getFeed(stateParams.credentials.username).then((done) => {
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
                return userService.getMentions(stateParams.credentials.username).then((done) => {
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
                return userService.getFollowers(stateParams.credentials.username).then((done) => {
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
                return userService.getFollowing(stateParams.credentials.username).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const tweetsWithTagState = {
        name: 'tweetsWithTag',
        url: '/tweetsWithTag',
        component: 'tweetsWithTagComponent',
        params: {
            label: null
        },
        resolve: {
            tweets: ['hashtagService', '$stateParams', function(hashtagService, stateParams){
                return hashtagService.getTaggedTweets(stateParams.label).then((done) => {
                    return done.data
                })
              }]
        }
    }

    const allUsersState = {
        name: 'allUsers',
        url: '/allUsers',
        component: 'usersComponent',
        resolve: {
            users: ['userService', function(userService){
                return userService.getAllUsers().then((done) => {
                    return done.data
                })
              }]
        }
    }

    const hashtagStateFinal = {
        name: 'allHashtagState',
        url: '/allHashtags',
        component: 'hashtagListComponent',
        resolve: {
            hashtags: ['hashtagService', function(hashtagService){
                return hashtagService.getAllTags().then((done) => {
                    return done.data
                })
            }]
        }
    }

    const allTweetState = {
        name: 'allTweets',
        url: '/allTweets',
        component: 'tweetsComponent',
        resolve: {
            tweets: ['tweetService', function(tweetService){
                return tweetService.getAllTweets().then((done) => {
                    return done.data
                })
            }]
        }
    }

    const directRepliesState = {
        name:   'direct_replies',
        url:    '/direct_replies',
        component:  'tweetListComponent',
        params: {
            tweetId: null
        },
        resolve:{
            tweets: ['tweetService', '$stateParams',function(tweetService, stateParams){
                return tweetService.getDirectReplies(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const directRepostsState = {
        name:   'direct_reposts',
        url:    '/direct_reposts',
        component:  'tweetListComponent',
        params: {
            tweetId: null
        },
        resolve: {
            tweets: ['tweetService', '$stateParams',function(tweetService, stateParams){
                return tweetService.getDirectReposts(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    const usersWhoLikedState = {
        name:   'who_liked',
        url:    '/who_liked',
        component:  'usersComponent',
        params: {
            tweetId: null
        },
        resolve: {
            users: ['tweetService', '$stateParams', function(tweetService, stateParams){
                return tweetService.getUsersWhoLiked(stateParams.tweetId).then((done) => {
                    return done.data
                })
            }]
        }
    }

    stateProvider.state(allUsersState)
    stateProvider.state(testUserState)
    stateProvider.state(settingState)
    stateProvider.state(validateState)
    stateProvider.state(hashtagState)
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


    urlRouter.otherwise('/signInSignUp')
}]).filter('createAnchors', ['sce', function (sce) {
        return function (str) {
            return sce.trustAsHtml(str.
                replace('#(\\S)/+','<a ui-sref="$1">$1</a>').
                replace('@(\\S)/+','<a ui-sref="$1">$1</a>')
            )
        }
    }])
