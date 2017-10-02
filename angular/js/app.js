angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouter) {
    
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

    
    stateProvider.state(testUserState);
    stateProvider.state(validateState);
    stateProvider.state(hashtagState);  
    stateProvider.state(signInSignUp);
    stateProvider.state(signIn);
    stateProvider.state(signUp);

    urlRouter.otherwise('/signInSignUp')
}]);