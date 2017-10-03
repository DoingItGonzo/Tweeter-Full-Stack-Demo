angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

    const hashtagState = {
        name: 'hashtags',
        url: '/tags',
        component: 'hashtagComponent'
    }
    const hashtagStateFinal = {
        name: 'hashtagsFinal',
        url: '/tagsfinal',
        component: 'hashtagListComponent'
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

    const thisUserPageState = {
        name: 'thisUserPage',
        url: '/thisUserPage',
        component: 'thisUserPageComponent'
    }

    const thisUserPageTweetsState = {
        name: 'thisUserPage.tweets',
        url: '/tweets',
        component: 'thisUserPageTweetsComponent',
        params: {
            tweets: null,
        },
    }

    const thisUserPageFeedState = {
        name: 'thisUserPage.feed',
        url: '/feed',
        component: 'thisUserPageTweetsComponent',
        params: {
            tweets: null,
        },
    }

    const thisUserPageMentionsState = {
        name: 'thisUserPage.mentions',
        url: '/mentions',
        component: 'thisUserPageTweetsComponent',
        params: {
            tweets: null,
        },
    }

    const thisUserPageFollowersState = {
        name: 'thisUserPage.followers',
        url: '/followers',
        component: 'thisUserPageUsersComponent',
        params: {
            users: null,
        },
    }

    const thisUserPageFollowingState = {
        name: 'thisUserPage.following',
        url: '/following',
        component: 'thisUserPageUsersComponent',
        params: {
            users: null,
        },
    }

    stateProvider.state(testUserState)
    stateProvider.state(settingState)
    stateProvider.state(validateState)
    stateProvider.state(hashtagState)
    stateProvider.state(hashtagStateFinal)
    stateProvider.state(signInSignUp)
    stateProvider.state(signIn)
    stateProvider.state(signUp)
    stateProvider.state(tweetListState)
    stateProvider.state(thisUserPageState)
    stateProvider.state(thisUserPageTweetsState)
    stateProvider.state(thisUserPageFeedState)
    stateProvider.state(thisUserPageMentionsState)
    stateProvider.state(thisUserPageFollowersState)
    stateProvider.state(thisUserPageFollowingState)
    stateProvider.state(userListState)
    stateProvider.state(contextState)


    urlRouter.otherwise('/signInSignUp')
}]).filter('createAnchors', ['sce', function (sce) {
        return function (str) {
            return sce.trustAsHtml(str.
                replace('#(\\S)/+','<a ui-sref="$1">$1</a>').
                replace('@(\\S)/+','<a ui-sref="$1">$1</a>')
            )
        }
    }])
