// Extension ID: iaemagfbdcgccmploimfnfmaekelhmfb


chrome.runtime.onInstalled.addListener(function loadDefaults(){

	var defaultTabLists = 
	{
		"DefaultWork" : [ "http://www.slack.com", "http://www.salesforce.com", "http://www.github.com" ],

		"DefaultSchool" : [ "https://www.khanacademy.org/", "https://piazza.com/", "https://www.wolframalpha.com/" ],

		"DefaultResearch" : [ "https://www.wikipedia.org/", "https://translate.google.com/", "https://www.thefreelibrary.com/" ]
	};


	
	var storage = chrome.storage.sync;
	
	//clear();

	var defaults = {};
	var def = "defaultKeys";
	
	defaults[def] = defaultTabLists;
//	console.log(defaults);

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

function clear(){
   chrome.storage.sync.clear(function(data){
      console.log("cleared!");
      });
 }