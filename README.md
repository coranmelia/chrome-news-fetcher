# News Fetcher Chrome Extension
###### Author: Cora Wang 
###### Last Update Date: Dec. 2019

This Chrome Extension allows users to select a string from a webpage DOM and search news about it. The extension was built with React.Js. 

[update: News API has recently changed their policy and the developer plan only allows fetching within the localhost :( Follow the instruction under `Usage` section to run the extension on your local server!]

## Introduction

##### Part 1: Overview
The purpose of this application is to help users fetch news that they are interested in. Without such an application, users have to copy the keyword and send it to google search, and then select the "News" tab in order to get the news.
For example, let's say I want to search about Stuart Weitzman's recent news and see if the company has been purchased by some other companies (because they are constantly on sale). If I simply search the keyword on google, I will be puzzled by the google shopping ads. 

The application aims to create a shortcut for News search. It could be interesting as I labelled the source of the news, so for example, a republican user may identify the source of the news and only read those that he/she is interested in. 
 
The target audience of my application is people who ONLY want to search News and do not want to be confused by other types of information (e.g. shopping ads). 

##### Part 2: How users will interact with this application
Interaction type:
*Chrome Extension (Interact through Chrome browser)

Use case (make sure the extension is install & build first, see below for instructions):
* Select a string from the webpage DOM and right click to select "Search Articles about `keyword`
* Click on the app Icon on top of the browser and open the pop up window, then use the search bar to search `keyword`

Outcome:
* User is able to find articles about the keyword. A maximum of 4 pages (20 pieces of latest News in total) 
    will be displayed. Clicking on an article will take user to a new tab to read this article. 
* User is not able to find articles about the keyword, the application will notify user by "Sorry, we are not able to find an article that matches your search. Try another search!"

##### Part 3: Library used
- Used React framework to build the chrome extension
    * I used react to build the chrome extension because I want to learn more about react and building 
    a chrome tool using this framework allows me to have a deeper understanding of the structure of this framework
    * I used Page Injection strategy to insert the extension as a sidebar (used Iframe)
    * This tool is the skeleton of my chrome extension
- Used Chrome messaging API to communicate between the background page and the content page
    * I have to use this because the messaging API allows me to fetch the message (i.e. the keyword I selected from the webpage DOM) and pass it to the page that I injected.
    * I called the API from background.js and set a listener in content.js to receive the message
    * This tool add to my website by allowing me to interact with the website DOM
- Used Axios to call the News API and fetch recent news
    * I used this tool because it is a convenient way of calling API from other sites.
    * I used this tool by giving it the API address and passing APIkey and search keyword to it,
    and let it return news articles to me. 

##### Part 4: Changes made to original design

 I originally wanted to build an image fetcher which allows users to screenshot an image and search it on google image, but google image API only allows URL input which means that I have to find a server, upload the image, and then fetch the URL, and pass it to google image. This process is not feasible for the given amount of
 time and is not likely to be free of charge. Therefore, I finally decided to build this application as a news fetcher as News API is friendly and it also has big use cases.
 
##### Part 5: Challenges
  
 During the brainstorming period, I thought about building an application that fetches tweets using the Twitter API. However, through investigation, I found that twitter API is restricted by the [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and I was not able to utilize their API solely with React, a pure frontend framework. Because of CORS, Twitter API would requires my application to have a server. I found that working with CORS is really difficult so I ended up found other ways out. 

## Usage
To examine code, clone repo or download Zip from:

```
git clone https://github.com/coranmelia/chrome-news-fetcher.git
```

Run
```
yarn install
```

And build the extension via:
```
yarn build
```

## Deploy

![Demo](./public/demo/demo.gif)

To watch the completed demo, refer to: https://youtu.be/4uSSRukigkA 

To see the product in action, add the extension at chrome://extensions page, and click `LOAD UNPACKED` to add the build folder.

##### References
Google Chrome API: https://developer.chrome.com/apps/api_index 

Learn about React + Chrome Extension: (several youtube videos and articles, only listed the main one)
https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39 
