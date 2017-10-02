angular.module('tweetApp').service('hashtagService', ['$http',function(http) {

    this.getAllTags = () => {
        return http.get('http://localhost:8888/api/tags')
    }
    this.getTaggedTweets = (label) => {
        return http.get('http://localhost:8888/api/tags/' + label)
    }

}])