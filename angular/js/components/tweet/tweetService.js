angular.module('tweetApp').service('tweetService', ["$http", function (http) {

    this.getTweet = (id) => {

        let url = "http://localhost:8888/api/tweets/" + id + "/"

        return http.get(url)
    }

    this.createTweet = (contentCredentials) => {

        return http.post("http://localhost:8888/api/tweets/", contentCredentials)

    }

    this.deleteTweet = (id, credentials) => {

        let url = "http://localhost:8888/api/tweets/" + id + "/"

        //return http.delete(url,contentCredentials)
        return http({
            url: url,
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

    this.createRepost = (id, credentials) => {

        let url = "http://localhost:8888/api/tweets/" + id + "/repost/"

        return http.post(url, credentials)

    }

    this.createReply = (id, contentCredentials) => {

        let url = "http://localhost:8888/api/tweets/" + id + "/reply/"

        return http.post(url, contentCredentials)
    }

    //the following all return lists of tweets

    this.getAllTweets = () => {
        return http.get("http://localhost:8888/api/tweets/")
    }

    this.getDirectReposts = (id) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/reposts/"
        return http.get(url)
    }

    this.getDirectReplies = (id) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/replies/"
        return http.get(url)
    }

    this.getContext = (id) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/context/"
        return http.get(url)
    }

    //the following return neither tweets or lists of tweets

    this.getUsersWhoLiked = (id) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/likes/"
        return http.get(url)
    }

    this.likeTweet = (id, credentials) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/like/"
        return http.post(url, credentials)
    }

    this.getMentionedUsers = (id) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/mentions/"
        return http.get(url)
    }

    this.getTagsInTweet = (id) => {
        let url = "http://localhost:8888/api/tweets/" + id + "/tags/"
        return http.get(url)
    }

}])