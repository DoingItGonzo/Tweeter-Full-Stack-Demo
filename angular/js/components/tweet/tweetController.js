angular.module('tweetApp').controller('tweetController', ['tweetService','globalService','$state', 
function (tweetService, globalService, state) {

    this.globalService = globalService

    this.user = globalService.primaryUser

    if (this.sentTweet.repostOf !== undefined) {
        this.tweet = {
            id: this.sentTweet.id,
            reposter: this.sentTweet.author,
            author: this.sentTweet.repostOf.author,
            content: this.sentTweet.repostOf.content,
            posted: this.sentTweet.repostOf.posted
        }
        this.canDelete = this.tweet.reposter.username === this.user.credentials.username ? true : false
        this.repostTweet = true
    }
    else if (this.sentTweet.inReplyTo !== undefined) {
        this.tweet = this.sentTweet
        this.tweet.repliedTo = this.tweet.inReplyTo.author
        this.canDelete = this.tweet.author.username === this.user.credentials.username ? true : false
        this.replyTweet = true
    }
    else {
        this.tweet = this.sentTweet
        this.canDelete = this.tweet.author.username === this.user.credentials.username ? true : false
    }

    
    this.isReplying = false


    this.getTweet = tweetService.getTweet
    
    this.createTweet = () => {
        tweetService.createTweet(this.contentCredentials).then((done) => {
            
        })
    }

    this.deleteTweet = () => {
        tweetService.deleteTweet(this.tweet.id, this.user.credentials).then((done) => {
            state.go('userPage.feed', {
                username: this.user.credentials.username
            }, {
                reload: true
            })
        })
    }

    this.createRepost = () => {
        tweetService.createRepost(this.tweet.id, this.user.credentials).then((done) => {
            state.go('userPage.feed', {
                username: this.user.credentials.username
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
                username: this.user.credentials.username
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
        tweetService.getDirectReplies(this.tweet.id).then((done) => {
            //return done.data
            alert("getting replies")
            state.go('direct_replies',{
                tweetId: this.tweet.id
            })
        })
    }
    this.getDirectReposts = () => {
        return tweetService.getDirectReposts(this.tweet.id).then((done) => {
            //return done.data
            state.go('direct_reposts',{
                tweetId: this.tweet.id
            })
        })
    }

    this.getContext = () => {
        return tweetService.getContext(this.tweetId).then((done) => {
            
        })
    }

    this.getUsersWhoLiked = () => {
        return tweetService.getUsersWhoLiked(this.tweet.id).then((done) => {
            state.go('who_liked',{
                tweetId: this.tweet.id
            })
        })
    }

    this.likeTweet = () => {
        alert(this.user.credentials.username +" liked tweet #"+ this.tweet.id)
        return tweetService.likeTweet(this.tweet.id, this.user.credentials).then((done) => {
            
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