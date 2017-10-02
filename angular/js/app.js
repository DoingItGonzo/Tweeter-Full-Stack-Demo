angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

    const testUserState = {
        name: 'testUser',
        url: '/testUser',
        component: 'testUserComponent'
    }

    stateProvider.state(testUserState);

    urlRouter.otherwise('/testUser');

}]);