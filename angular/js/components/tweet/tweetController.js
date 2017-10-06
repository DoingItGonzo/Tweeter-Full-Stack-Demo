angular.module('tweetApp').controller('tweetController', ['tweetService', 'globalService', '$state', 'validateService',
    function (tweetService, globalService, state, validateService) {

        this.globalService = globalService

        this.user = globalService.primaryUser

        let canGoToContext = true

        if (this.sentTweet.repostOf !== undefined) {
            if (this.sentTweet.repostOf === null) {
                this.tweet = {
                    id: this.sentTweet.id,
                    reposter: this.sentTweet.author,
                    author: {
                        username: 'deleted Tweet'
                    },
                    content: 'deleted Tweet',
                    posted: 'deleted Tweet'
                }
            }
            else {
                this.tweet = {
                    id: this.sentTweet.id,
                    reposter: this.sentTweet.author,
                    author: this.sentTweet.repostOf.author,
                    content: this.sentTweet.repostOf.content,
                    posted: this.sentTweet.repostOf.posted
                }
            }
            this.canDelete = globalService.loggedIn && this.tweet.reposter.username === this.user.credentials.username ? true : false
            this.repostTweet = true
        }
        else if (this.sentTweet.inReplyTo !== undefined) {
            this.tweet = this.sentTweet
            this.tweet.repliedTo = this.tweet.inReplyTo === null ? { username: 'deleted Tweet' } : this.tweet.inReplyTo.author
            this.canDelete = globalService.loggedIn && this.tweet.author.username === this.user.credentials.username ? true : false
            this.replyTweet = true
        }
        else {
            this.tweet = this.sentTweet
            this.canDelete = globalService.loggedIn && this.tweet.author.username === this.user.credentials.username ? true : false
        }

        this.isReplying = false

        this.deleteTweet = () => {
            canGoToContext = false
            tweetService.deleteTweet(this.tweet.id, this.user.credentials).then((done) => {
                state.go('userPage.feed', {
                    username: this.user.credentials.username
                }, {
                        reload: true
                    })
            })
        }

        this.createRepost = () => {
            canGoToContext = false
            tweetService.createRepost(this.tweet.id, this.user.credentials).then((done) => {
                state.go('userPage.feed', {
                    username: this.user.credentials.username
                }, {
                        reload: true
                    })
            })
        }

        this.createReply = () => {
            canGoToContext = false
            this.isReplying = !this.isReplying
        }

        this.createActualReply = () => {
            canGoToContext = false;
            this.contentCredentials = {}
            this.contentCredentials.content = this.content
            this.contentCredentials.credentials = this.user.credentials
            if (this.content !== undefined && this.content !== '') {
                tweetService.createReply(this.tweet.id, this.contentCredentials).then((done) => {
                    state.go('userPage.feed', {
                        username: this.user.credentials.username
                    }, {
                            reload: true
                        })
                })
            }
        }

        this.getDirectReplies = () => {
            tweetService.getDirectReplies(this.tweet.id).then((done) => {
                alert("getting replies")
                state.go('direct_replies', {
                    tweetId: this.tweet.id
                })
            })
        }
        this.getDirectReposts = () => {
            return tweetService.getDirectReposts(this.tweet.id).then((done) => {
                state.go('direct_reposts', {
                    tweetId: this.tweet.id
                })
            })
        }

        this.getContext = () => {
            if (canGoToContext) {
                state.go('context', {
                    id: this.tweet.id
                })
            }
            canGoToContext = true
        }

        this.getUsersWhoLiked = () => {
            return tweetService.getUsersWhoLiked(this.tweet.id).then((done) => {
                state.go('who_liked', {
                    tweetId: this.tweet.id
                })
            })
        }

        this.likeTweet = () => {
            canGoToContext = false
            return tweetService.likeTweet(this.tweet.id, this.user.credentials).then((done) => { })
        }

        this.goToUser = (username) => {
            canGoToContext = false
            validateService.getUsernameExists(username).then((done) => {
                if (done.data) {
                    state.go('userPage', {
                        username: username
                    })
                }
                else {
                    state.go('userNotFoundPage')
                }
            })
        }

    }])