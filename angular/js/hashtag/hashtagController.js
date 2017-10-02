angular.module('tweetApp').controller('hashtagController', ['hashtagService', function(hashtagService) {


    this.getAllTags = () => {
        hashtagService.getAllTags().then((done) =>{
            console.log(done.data)
            this.tags = done.data;
            return done.data;
        })
    }
    this.getOneTag = () => {
        hashtagService.getTaggedTweets(this.label).then((done) =>{
            this.tag = done.data;
            console.log(done.data);
            return done.data;
        })
    }
    
}])