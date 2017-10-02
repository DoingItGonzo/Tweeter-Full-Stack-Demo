angular.module('tweetApp').service('validateService', ['$http',function(http) {

    this.getLabelExists = (label) => {
        return http.get('http://localhost:8888/api/validate/tag/exists/' + label)
    }
    this.getUsernameAvailable = (username) => {
        return http.get('http://localhost:8888/api/validate/username/available/@' + username)
    }
    this.getUsernameExists = (username) => {
        return http.get('http://localhost:8888/api/validate/username/exists/@' + username)
    }
}])