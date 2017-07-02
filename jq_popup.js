var tabLists = 
{
     "Work" : [ "http://www.slack.com", "http://www.salesforce.com", "http://www.apple.com" ],

     "School" : [ "https://my.uga.edu/htmlportal/index.php", "https://piazza.com/", "https://www.wolframalpha.com/" ],

     "Research" : [ "https://www.wikipedia.org/", "https://translate.google.com/", "https://github.com/systemwide/" ]
};


$(document).ready(function(){

	$.each(tabLists, function( k, v ){
		var element = $('<input type="button"/>');
		var checkbox = $('<input type="checkbox"/>');
		$(element).attr({"type":"button", "class": "tabSetButton", "id": k, "value": k });
		$(checkbox).attr({"class": "deleteCheckBox", "id": k, "value": k});
		$("#tabSetButtons").append(element);
		$("#deleteSet").append(checkbox);
		//alert(element);
	});

	$("#edit").hide();

	$("#expandCollapse").click(function(){
		$("#edit").slideToggle(500);
	});

	$(".tabSetButton").on("click", tabMaker);

	

}); //end document.ready


function tabMaker() {
     var buttonName = this.value;
     var urls = tabLists[buttonName];

// iterate through a list whose name is derived from 
// the button clicked (the value attribute of the button)
// and which corresponds to one the url lists below:
     urls.forEach(url => chrome.tabs.create({url}))
};//tabMaker
