angular.module('tweetApp').controller('contextController', ['tweetService', function (tweetService) {

    this.tweetId = ""

    this.contextTarget = []
    this.beforeContext = []
    this.afterContext = []

    this.getTweet = tweetService.getTweet

    this.getContext = () => {
        console.log("getting context " +this.tweetId)
        return tweetService.getContext(this.tweetId).then((done) => {
            this.tweets = done.data.before.concat(done.data.target).concat(done.data.after)
            this.users = []
            this.tags = []
            this.contextTarget = [done.data.target]
            this.beforeContext = done.data.before
            this.afterContext = done.data.after
            
        })
    }
}])