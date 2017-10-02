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

    stateProvider.state(hashtagState);
    stateProvider.state(testUserState);

    urlRouter.otherwise('/testUser');
}]);