



var storage = chrome.storage.sync;

var tabLists = {};

window.onload = function (){
	
	
	//user sets -> userSets

	storage.get(null, function (data) { 
		console.log(data);
		if(data.userSets){
			tabLists = data.userSets;
			console.log("using user defined tab sets");
		}else{
			tabLists = data.defaultKeys;
			console.log("using default tab sets");
		}
		
	});
	
$(document).ready(function main(){

/*********************************** NEW FUNCTION NEEDS WORK
//check to see if there exists an object in chrome.storage which contains user sets
//else use default sets
	chrome.storage.sync.get("defaults", function assign(result){
		var tabLists = result;
		console.log(result);
	});
	if(tabLists.length() === 0){
	alert("empty!!");
	tabLists = defaultTabLists;
	};
// ***********************************/

// ********************************  DONT FUCK WITH THIS CODE BELOW
	$.each(tabLists, function creatTabListButtons( k, v ){
		var element = $('<input type="button"/>');

		var checkbox = $('<input type="checkbox"/>');
		$(element).attr({"type":"button", "class": "tabSetButton", "id": k, "value": k });
		$(checkbox).attr({"class": "deleteCheckBox", "id": k, "value": k});
		var label = $("<label>").text(k);
		var br = $("<br>");
		

		
		$("#tabSetButtons").append(element);
		console.log("Adding tab " + k);
		$("#deleteSet").append(checkbox);
		$("#deleteSet").append(label);
		$("#deleteSet").append(br);
		
	});

	$("#edit").hide();

	$("#expandCollapse").click(function(){
		$("#edit").slideToggle(500);
	});

	$(".tabSetButton").on("click", tabMaker);

	$("#setAdder").on("click", createNewSet);

// ****************************** End fully functiona section

function createHelper(value, callback){
	var name = $("#newSetName").val();
	console.log("Name: ", name);
	var obj = {};
	var list = [];
	var uSets = value;
	if(uSets){

	
/* the following block of code calls chrome.tabs.query, an asynchronous function to get values from all open tabs in the
active window. It then creates an array named "list" which is an array of strings of the URLS for each tab in active window.
It then takes the "name" variable, the name of the new user defined set and creates an object such that {name: list}
It adds that new object to the userSets object with the variable name "uSets" as uSets.userSets.name
Finally, it sends the updated object containing sets to to the callback function, which in this case is called within the
createNewSet function
*/
	chrome.tabs.query({
		currentWindow: true

		},	function(tabs)	{
			// iterate over tabs object, get each url and push it to list[]
				tabs.forEach(tab => list.push(tab.url));
				console.log("List contents ==>", list);
			// update userSets object with new key value pair, {name : list[]}
				uSets.userSets[name] = list;
				console.log("Value of uSets ==>", uSets);
			// invoke the fuction's callback sending the updated userSet object to the final step	
				callback(uSets);

		});//end chrome.tabs.query
	
	}//end if(uSets)


} // end createNewSet


function createNewSet(){
	// initialize object
	var passedData = {};
	//retrieve existing userSets
	chrome.storage.sync.get("userSets", function(data) {
		console.log("User Sets Gotten ==> ", data);
		if(!data.userSets){
			var us = "userSets";
			data[us] = {};

		}
		
	// assign updated userSets (from createHelper) to passedData, then send passedData along to newSetStorage
	// *** QUESTION: Do even need to initialize and assign passedData ?
		passedData = createHelper(data, function(val) {
			newSetStorage(val);
		} );
		
	});	
}//end createNewSet


// final step in creating a new user defined tab set
function newSetStorage(updatedUserSet){
	// if the passed data is not null or undefined, store it back in 	
	if(updatedUserSet){
		console.log("newSetStorage received this object ==> ", updatedUserSet);
		chrome.storage.sync.set(updatedUserSet, function(){
			if (chrome.runtime.error) {
    		console.log("Runtime error.");
    		}
			chrome.storage.sync.get(null, function(data){
				console.log("New contents of storage area after functions ==> ", data);
			});
		});
	}//end if
}//end newSetStorage


function tabMaker() {
     var buttonName = this.value;
     console.log(buttonName);
     var urls = tabLists[buttonName];
     console.log(tabLists); // returns undefined...why?   

// iterate through a list whose name is derived from 
// the button clicked (the value attribute of the button)
// and which corresponds to one the url lists below:
     urls.forEach(url => chrome.tabs.create({url}));
};//tabMaker
}); //end document.ready
};//onload

