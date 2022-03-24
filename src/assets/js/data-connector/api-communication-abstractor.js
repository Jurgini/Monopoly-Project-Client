"use strict";

function fetchFromServer(path, httpVerb, requestBody){
    const options = constructOptions(httpVerb, requestBody);

    return fetch(`${_config.getAPIUrl()}${path}`, options)
        .then((response) => {
            if (!response.ok) {
                generateVisualAPIErrorInConsole();
                throw response;
            }
            return response.json();
        })
        .then((jsonresponsetoparse) => {
            return jsonresponsetoparse;
        }); 
}

function constructOptions(httpVerb, requestBody){
    const options= {};
    options.method = httpVerb;

    options.headers = {};
    options.headers["Content-Type"] = "application/json";

    if(_token !== null) {
        options.headers["Authorization"] = "Bearer " + _token.token;
    }
    // Don't forget to add data to the body when needed
    options.body = JSON.stringify(requestBody);
    return options;
}

function generateVisualAPIErrorInConsole(){
    console.error('%c%s','background-color: red;color: white','! An error occurred while calling the API');
}