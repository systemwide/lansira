


chrome.runtime.onInstalled.addListener(function loadDefaults(){

var defaultTabLists = 
{
     "Work" : [ "http://www.slack.com", "http://www.salesforce.com", "http://www.apple.com" ],

     "School" : [ "https://my.uga.edu/htmlportal/index.php", "https://piazza.com/", "https://www.wolframalpha.com/" ],

     "Research" : [ "https://www.wikipedia.org/", "https://translate.google.com/", "https://github.com/systemwide/" ]
};


	
var storage = chrome.storage.sync;
	
	var defaults = {};
	var def = "defaultKeys";
	
	defaultTabLists["test"] = [ "http://www.rutgers.edu/", "https://www.princeton.edu/" ] ;
	

	defaults[def] = defaultTabLists;
	console.log(defaults);

	storage.set(defaults, function(){ 
		if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
	});
	

	/*var uSets = {};
	var us = "userSets";
	uSets[us] = {"mySet": ["http://www.rutgers.edu/", "https://www.princeton.edu/"]};
	storage.set(uSets);
	console.log(uSets);
	*/
});