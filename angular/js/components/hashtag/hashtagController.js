angular.module('tweetApp').controller('hashtagController', ['hashtagService','$state', function(hashtagService,state) {

    console.log(this.hashtag)

    this.getAllTags = () => {
        hashtagService.getAllTags().then((done) =>{
            console.log(done.data)
            this.tags = done.data;
            return done.data;
        })
    }
    this.getOneTag = (tagLabel) => {
        hashtagService.getTaggedTweets(tagLabel).then((done) =>{
            this.tag = done.data;
            console.log(done.data);
            state.go('taggedtweets',{
                tweets: done.data
            })
            return done.data;
        })
    }
    
}])