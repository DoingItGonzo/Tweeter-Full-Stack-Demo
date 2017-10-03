angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

    const hashtagState = {
        name: 'hashtags',
        url: '/tags',
        component: 'hashtagComponent'
    }
    const hashtagStateFinal = {
        name: 'hashtagsFinal',
        url: '/tagsfinal',
        component:'hashtagListComponent'
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
        component: 'settingComponent'
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

    stateProvider.state(testUserState)
    stateProvider.state(settingState)
    stateProvider.state(validateState)
    stateProvider.state(hashtagState) 
    stateProvider.state(hashtagStateFinal) 
    stateProvider.state(signInSignUp)
    stateProvider.state(signIn)
    stateProvider.state(signUp)
    stateProvider.state(tweetState)
    stateProvider.state(tweetListState)
    stateProvider.state(userListState)


    urlRouter.otherwise('/tweetList')
}])