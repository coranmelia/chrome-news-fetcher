chrome.contextMenus.create({
    id: 'HeadlineFetcher',
    title: "Search Articles about '%s'",
    contexts: ['selection']
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    const x = info.selectionText;
    chrome.tabs.query({active: true, currentWindow: true}, tab => {
        chrome.tabs.sendMessage(tab[0].id,
            {type: 'getMenuHeadlines', message: x},
            function (response){
            });
    });
});

chrome.browserAction.onClicked.addListener((info, tab) => {
    const x = '';
    chrome.tabs.query({active: true, currentWindow: true}, tab => {
        chrome.tabs.sendMessage(tab[0].id,
            {type: 'getBrowserHeadlines', message: x},
            function (response) {
            });
    });
});

