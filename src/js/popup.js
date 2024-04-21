function reset() {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, { message: "resetWatched" }, (response) => {
            if (response) {
                console.log("Response from content script:", response);
                // Process the response data here
            }
        });
    });

}



const resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    // Your function logic here
    reset(); // Call your function
};