<<<<<<< HEAD
angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouter) {
    
    const hashtagState = {
        name: 'hashtags',
        url: '/tags',
        component: 'hashtagComponent'
    }

    stateProvider.state(hashtagState);

    urlRouter.otherwise('/tags');
    
=======
angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function (stateProvider, urlRouter) {

    const testUserState = {
        name: 'testUser',
        url: '/testUser',
        component: 'testUserComponent'
    }

    stateProvider.state(testUserState);

    urlRouter.otherwise('/testUser');

>>>>>>> master
}]);