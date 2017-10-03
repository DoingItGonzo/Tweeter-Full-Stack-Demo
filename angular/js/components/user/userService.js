angular.module('tweetApp').service('userService', ['$http', function (http) {

    this.getAllUsers = () => {
        return http.get('http://localhost:8888/api/users')
    }

    this.makeUser = (credentialsProfile) => {
        return http.post('http://localhost:8888/api/users', credentialsProfile)
    }

    this.getUser = (username) => {
        return http.get('http://localhost:8888/api/users/@' + username)
    }

    this.editProfile = (username, credentialsProfile) => {
        return http.patch('http://localhost:8888/api/users/@' + username, credentialsProfile)
    }

    this.deleteUser = (username, credentials) => {
        console.log(credentials)
        return http({
            url: 'http://localhost:8888/api/users/@' + username,
            method: 'DELETE',
            data: {
                username: credentials.username,
                password: credentials.password
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })
    }

    this.followUser = (userToFollow, credentials) => {
        return http.post('http://localhost:8888/api/users/@' + userToFollow + '/follow', credentials)
    }

    this.unfollowUser = (userToFollow, credentials) => {
        return http.post('http://localhost:8888/api/users/@' + userToFollow + '/unfollow', credentials)
    }

    this.getFeed = (username) => {
        return http.get('http://localhost:8888/api/users/@' + username + '/feed')
    }

    this.getTweets = (username) => {
        return http.get('http://localhost:8888/api/users/@' + username + '/tweets')
    }

    this.getMentions = (username) => {
        return http.get('http://localhost:8888/api/users/@' + username + '/mentions')
    }

    this.getFollowers = (username) => {
        return http.get('http://localhost:8888/api/users/@' + username + '/followers')
    }

    this.getFollowing = (username) => {
        return http.get('http://localhost:8888/api/users/@' + username + '/following')
    }

}])