const goToPageButton = document.getElementById("gotopagebutton");
goToPageButton.addEventListener("click", goToPage); //Links GoTo Button to function
/**
 * This function creates a new tab with the correct tabLink and page number.
 */
function goToPage() {
    var tabId = 0;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        tabID = tab.id;
        var tabLink = tab.url;        

        // Check if tabLink ends with #page= followed by a number
        if (/#page=\d+$/.test(tabLink)) {
            // Remove the #page= followed by a number from the end of the string
            tabLink = tabLink.slice(0, tabLink.lastIndexOf("#page="));
        }
        
        if (tabLink.endsWith('.pdf')) {
            var totalPage = +document.getElementById("pageNumToGo").value + +document.getElementById("pageNum").value;
            chrome.tabs.create({url: tabLink + "#page=" + totalPage});
        }  
    }); 
}

document.addEventListener('DOMContentLoaded', function() {
    var inputField = document.getElementById("pageNum");
    var saveButton = document.getElementById("saveButton");
    //NEED TO ADD ACTUAL SAVING HERE
    //*! Need to Implement How To Get Saved Value Here! THEN AUTOMATICALLY LOAD IT INTO THE INPUT FIELD.
    saveButton.addEventListener('click', function() {
        var inputValue = inputField.value;
        chrome.storage.sync.set({'savedValue': inputValue})
    });

});