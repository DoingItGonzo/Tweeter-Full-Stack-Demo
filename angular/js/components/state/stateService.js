angular.module('tweetApp').service('stateService', [function () {
    
    this.stateHistory = []
    this.stateHistoryIndex = -1

    this.addToHistory = (stateToAdd, stateParams) => {
        const stateHistoryObj = {}
        stateHistoryObj.name = stateToAdd
        stateHistoryObj.stateParams = stateParams

        this.stateHistoryIndex++
        this.stateHistory[this.stateHistoryIndex] = stateHistoryObj
    }

    

}])