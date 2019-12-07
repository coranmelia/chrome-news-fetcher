/*global chrome*/
/* src/content.js */

import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";
import "./Pager.css";
import Search from './Components/Search';
import axios from "axios";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: '',
            page: 0,
            prevBtn: false,
            nextBtn: true,
            headlines: [],
            len:0,
            initial: true,
        };
        this.handleMessage = this.handleMessage.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.searchTerm = this.searchTerm.bind(this);
    }


    componentDidMount() {
        chrome.runtime.onMessage.addListener(this.handleMessage);
    }

    // access from DOM keyword search
    handleMessage(msg) {
        // Handle received messages
        if(msg.type === "getMenuHeadlines") {
            let query = "";
            chrome.storage.local.get(['key'], function(result) {
                // console.log('Value currently is ' + result.key);
                query = result.key;

                    axios.get('https://newsapi.org/v2/everything',{
                        params: {
                            q: query,
                            language: 'en',
                            apiKey: 'ec55e06e175f4fa3b43bb560930f4b1a',
                        }
                    }).then(function(result) {
                        // select top 20 news
                        console.log(result.data);
                        this.setState({
                            initial: false,
                            headlines: result.data.articles.slice(0,20)
                        });
                        // console.log(this.state.headlines.length);
                        const i = Math.ceil((this.state.headlines.length / 5));
                        this.setState({
                            len: i,
                        });
                    }.bind(this)).catch(error => {
                        console.log('Error in obtaining headlines', error);
                    });
                }.bind(this));
        }
    }

    // access from search bar
    searchTerm(query){
            // console.log("search query get: " + query);

            axios.get('https://newsapi.org/v2/everything',{
                params: {
                    q: query,
                    language: 'en',
                    apiKey: 'ec55e06e175f4fa3b43bb560930f4b1a',
                }
            }).then(function(result) {
                // select top 20 news
                this.setState({
                    initial: false,
                    headlines: result.data.articles.slice(0,20)
                });
                // console.log(this.state.headlines.length);
                const i = Math.ceil((this.state.headlines.length / 5));
                this.setState({
                    len: i,
                });
            }.bind(this)).catch(error => {
                console.log('Error in obtaining headlines', error);
            });
    };

    // remove listener after message is handled
    componentWillMount() {
        chrome.runtime.onMessage.removeListener(this.handleMessage);
    }

    // function to handle next button
    handleNext(){
        // get current page
        let i = this.state.page;
        const last = this.state.len;
        // if current page < last page - 1, page++, next: true, prev: true
        // if current page is last page - 1, page++, next: false, prev: true
        // if current page is last page, next: false, prev: true
        if (last === 0){
            this.setState({
                nextBtn: false,
                prevBtn: false
            })
        }else if(i < last - 2) {
            this.setState({
                page: (i + 1),
                nextBtn: true,
                prevBtn: true
            })
        } else if (i === last - 2) {
            this.setState({
                page: (i + 1),
                nextBtn: false,
                prevBtn: true
            })
        } else{
            this.setState({
                nextBtn: false,
                prevBtn: true
            })
        }
    }

    // function to handle previous button
    handlePrev(){
        //get current page
        let i = this.state.page;
        const last = this.state.len;
        // if current is page 0, set prev: false, next:true
        // if current is page 1, prev:false, next:true, set page = page--
        // if current > page 1, set prev, next:true, prev:true, set page = page--
        if (last === 0){
            this.setState({
                nextBtn: false,
                prevBtn: false
            })
        }else if(i === 0) {
            this.setState({
                nextBtn: true,
                prevBtn: false,
            });
        }else if (i === 1){
            this.setState({
                page: i-1,
                nextBtn: true,
                prevBtn: false,
            });
        } else{
            this.setState({
                page: i-1,
                nextBtn: true,
                prevBtn: true,
            });
        }
    }

    render() {
        function handleClickX(e) {
            e.preventDefault();
            console.log('The link was clicked.');
            let element = document.getElementById('my-extension-root');
            // TO-DO change to add class
            element.style.display = 'none';
            // element.style.transitionDuration = "all 1s";
        }

        const i = this.state.page;

        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                        return (
                           <div className={'news'}>

                               <div className="close outer" onClick={handleClickX}>
                                   <div className="inner">
                                       <label>Close</label>
                                   </div>
                               </div>

                               <Search searchTerm={ this.searchTerm }/>

                               <h1>Top Articles For You</h1>
                               {
                                   (this.state.headlines.length === 0 && this.state.initial === false)?
                                       <div>
                                           <h1 className='err'> Sorry, we cannot find an article that matches your search. Try other keywords!</h1>
                                       </div>
                                       :this.state.headlines.slice(i*5, (i+1)*5).map(headline => (
                                       <div className="links">
                                           <img src={ headline.urlToImage } alt={ headline.source.name }/>
                                           <h4 className="link" onClick={() => { window.open(headline.url)}}>
                                                { headline.title }
                                           </h4>
                                           <div style={{clear: 'both'}}></div>
                                           <p>{ headline.source.name }</p>
                                           <div className="break"></div>
                                       </div>
                                       ))
                               }
                               <div className="prev" align="right">
                                   <a className=
                                          {
                                              this.state.prevBtn === true
                                                  ? "active btn"
                                                  : "disabled btn"
                                          }
                                      onClick={ this.handlePrev }>
                                       Prev
                                   </a>
                               </div>
                               <div className="next" align="right">
                                   <a className=
                                          {
                                              this.state.nextBtn === true
                                                  ? "active btn"
                                                  : "disabled btn"
                                          }
                                      onClick={ this.handleNext }>
                                       Next
                                   </a>
                               </div>
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.type === "getMenuHeadlines") {
          chrome.storage.local.set({key: request.message}, function() {
              console.log('Value is set to ' + request.message);
          });
          open();
      } else if( request.type === "getBrowserHeadlines") {
           chrome.storage.local.set({key: request.message}, function() {
               console.log('Value is set to ' + request.message);
           });
           toggle();
       }
       sendResponse(request.message);
   }
);

function open(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }
}

function toggle(){
    if(app.style.display === "none"){
        app.style.display = "block";
    } else{
      app.style.display = "none";
    }
}


document.body.appendChild(app);
ReactDOM.render(<Main />, app);
