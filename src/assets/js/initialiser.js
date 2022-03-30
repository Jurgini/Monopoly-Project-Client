"use strict";
const _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    testConnection();
    initLobby()
}


function testConnection(){
    fetchFromServer('/tiles','GET').then(tiles => console.log(tiles)).catch(errorHandler);
}
