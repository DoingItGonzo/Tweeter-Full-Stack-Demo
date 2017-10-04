angular.module('tweetApp').controller('hashtagListController', ['hashtagService','$state', function(hashtagService,state) {

    this.getAllTags = () => {
        hashtagService.getAllTags().then((done) =>{
            console.log(done.data)
            this.tags = done.data;
            return done.data;
        })
    }
    
}])