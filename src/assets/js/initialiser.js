"use strict";
const _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    testConnection();
}


function testConnection(){
    fetchFromServer('/tiles','GET').then(tiles => console.log(tiles)).catch(errorHandler);
}
