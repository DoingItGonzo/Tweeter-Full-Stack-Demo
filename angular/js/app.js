angular.module('tweetApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouter) {
    
    const tweetState = {
        name: 'TWEETS',
        url: '/tweets',
        component: 'tweetComponent'
      }

      stateProvider.state(tweetState)

      urlRouter.otherwise('/tweets')
    
}]);