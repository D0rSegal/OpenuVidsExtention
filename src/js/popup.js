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
function getCourseInfo() {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, { message: "getInfo" }, (response) => {
            if (response) {
                let text = response.response.he_description + " - " + response.response.course_number
                document.getElementById("courseInfo").innerText = text;
            }
        });
    });
}


const resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    reset();
};

getCourseInfo();