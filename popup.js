var tabLists = 
{
     "Work" : [ "http://www.slack.com", "http://www.salesforce.com", "http://www.apple.com" ],

     "School" : [ "https://my.uga.edu/htmlportal/index.php", "https://piazza.com/", "https://www.wolframalpha.com/" ],

     "Research" : [ "https://www.wikipedia.org/", "https://translate.google.com/", "https://github.com/systemwide/" ]
};


document.addEventListener('DOMContentLoaded', buildList);

function buildList() {
     var list = document.getElementsByClassName("button");

     for(var i = 0; i < list.length;i++)
     {
          list[i].addEventListener("click", tabMaker);
     }
};//buildList


function tabMaker() {
     var buttonName = this.value;
     var urls = tabLists[buttonName];

// iterate through a list whose name is derived from 
// the button clicked (the value attribute of the button)
// and which corresponds to one the url lists below:
     urls.forEach(url => chrome.tabs.create({url}))
};//tabMaker