// add click action for the button on the right of the address bar
chrome.browserAction.onClicked.addListener((tab) => { // jshint ignore: line
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // let's see a call back hell
      chrome.tabs.executeScript(null, {file: 'listify.js'}, function() {
          console.log('browser button pressed, lisify panel');
      })
    });
});

