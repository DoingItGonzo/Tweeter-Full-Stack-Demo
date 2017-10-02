angular.module('tweetApp').controller('tweetController', ['tweetService', function(tweetService){
    
        this.tweetId = "" 

        this.tweets = []

        this.users = []

        this.tags = []

        this.contentCredentials = {
            content:"",
            credentials:{
                username:"",
                password:""
            }
        }

        this.contentCredentials.credentials.username = "cleft"
        this.contentCredentials.credentials.password = "string"   
        
        this.chinCredentials = {
            content:"XD",
            credentials:{
                username:"crimsonchin",
                password:"string"
            }
        }
    
        this.getTweet = tweetService.getTweet

        this.createTweet = ()=> {
            tweetService.createTweet(this.contentCredentials).then((done) => {
                return tweetService.getAllTweets()
                }).then((finishedProduct) => {
                    this.tweets = finishedProduct.data
                    this.contentCredentials.content = ""
                    this.users = []
                    this.tags = []

            })
        }

        this.deleteTweet = () => {
            tweetService.deleteTweet(this.tweetId,this.contentCredentials.credentials).then((done) => {
                return tweetService.getAllTweets()
            }).then((finishedProduct) => {
                this.tweets = finishedProduct.data
                this.users = []
                this.tags = []
            })
        }

        //this.createRepost = tweetService.createRepost
        this.createRepost = () => {
            this.contentCredentials.content = ""
            tweetService.createRepost(this.tweetId,this.chinCredentials.credentials).then((done) => {
                return tweetService.getAllTweets()
            }).then((finishedProduct) => {
                this.tweets = finishedProduct.data
                this.users = []
                this.tags = []
            })
        }

        //this.createReply = tweetService.createReply
        this.createReply = () => {
            tweetService.createReply(this.tweetId,this.chinCredentials).then((done) => {
                return tweetService.getAllTweets()
            }).then((finishedProduct) => {
                this.tweets = finishedProduct.data
                this.users = []
                this.tags = []
            })
        }

        //this.getAllTweets = tweetService.getAllTweets
        this.getAllTweets = () => {
            return tweetService.getAllTweets().then((done) => {
                this.tweets = done.data
                this.users = []
                this.tags = []
            })
        }

        //this.getDirectReplies = tweetService.getDirectReplies
        this.getDirectReplies = () => {
            return tweetService.getDirectReplies(this.tweetId).then((done) => {
                this.tweets = done.data
                this.users = []
                this.tags = []
            })
        }
        //this.getDirectReposts = tweetService.getDirectReposts
        this.getDirectReposts = () => {
            return tweetService.getDirectReposts(this.tweetId).then((done) => {
                this.tweets = done.data
                this.users = []
                this.tags = []
            })
        }
        //this.getContext = tweetService.getContext
        this.getContext = () => {
            return tweetService.getContext(this.tweetId).then((done) => {
                this.tweets = done.data.before.concat(done.data.target).concat(done.data.after)
                this.users = []
                this.tags = []
            })
        }

        this.getUsersWhoLiked = () => {
            return tweetService.getUsersWhoLiked(this.tweetId).then((done) => {
                this.tweets = []
                this.users = done.data
                this.tags = []
            })
        }

        this.likeTweet = () => {
            return tweetService.likeTweet(this.tweetId,this.chinCredentials.credentials).then((done) => {
                this.tweets = []
                this.users = []
                this.tags = []
            })
        }

        this.getMentionedUsers  = () => {
            return tweetService.getMentionedUsers(this.tweetId).then((done) => {
                this.tweets = []
                this.users = done.data
                this.tags = []
            })
        }

        this.getTagsInTweet = () => {
            return tweetService.getTagsInTweet(this.tweetId).then((done) => {
                this.tweets = []
                this.users = []
                this.tags = done.data
            })
        }

   }])