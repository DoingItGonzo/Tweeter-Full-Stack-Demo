angular.module('tweetApp').controller('tweetController', ['tweetService','globalService','$state', 
function (tweetService, globalService, state) {

    this.user = globalService.primaryUser
    this.isReplying = false

    if (this.sentTweet.repostOf !== undefined) {
        this.tweet = {
            id: this.sentTweet.id,
            reposter: this.sentTweet.author,
            author: this.sentTweet.repostOf.author,
            content: this.sentTweet.repostOf.content,
            posted: this.sentTweet.repostOf.posted
        }
        this.repostTweet = true
    }
    else if (this.sentTweet.inReplyTo !== undefined) {
        this.tweet = this.sentTweet
        this.tweet.repliedTo = this.tweet.inReplyTo.author
        this.replyTweet = true
    }
    else {
        this.tweet = this.sentTweet
    }

    this.getTweet = tweetService.getTweet

    this.createTweet = () => {
        tweetService.createTweet(this.contentCredentials).then((done) => {
            
        })
    }

    this.deleteTweet = () => {
        tweetService.deleteTweet(this.tweetId, this.contentCredentials.credentials).then((done) => {
            
        })
    }

    this.createRepost = () => {
        tweetService.createRepost(this.tweet.id, this.user.credentials).then((done) => {
            state.go('userPage.feed', {
                credentials: this.user.credentials
            }, {
                reload: true
            })
        })
    }

    this.createReply = () => {
        this.isReplying = !this.isReplying
    }

    this.createActualReply = () => {
        this.contentCredentials = {}
        this.contentCredentials.content = this.content
        this.contentCredentials.credentials = this.user.credentials
        console.log(this.contentCredentials)
        tweetService.createReply(this.tweet.id, this.contentCredentials).then((done) => {
            state.go('userPage.feed', {
                credentials: this.user.credentials
            }, {
                    reload: true
            })
        })
    }

    this.getAllTweets = () => {
        return tweetService.getAllTweets().then((done) => {
            
        })
    }

    this.getDirectReplies = () => {
        return tweetService.getDirectReplies(this.tweet.id).then((done) => {
            return done.data
        })
    }
    this.getDirectReposts = () => {
        return tweetService.getDirectReposts(this.tweet.id).then((done) => {
            return done.data
        })
    }

    this.getContext = () => {
        return tweetService.getContext(this.tweetId).then((done) => {
            
        })
    }

    this.getUsersWhoLiked = () => {
        return tweetService.getUsersWhoLiked(this.tweet.id).then((done) => {
            
        })
    }

    this.likeTweet = () => {
        return tweetService.likeTweet(this.tweet.id, this.chinCredentials.credentials).then((done) => {
            
        })
    }

    this.getMentionedUsers = () => {
        return tweetService.getMentionedUsers(this.tweetId).then((done) => {
            
        })
    }

    this.getTagsInTweet = () => {
        return tweetService.getTagsInTweet(this.tweetId).then((done) => {
            
        })
    }

}])