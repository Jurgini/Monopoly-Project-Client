"use strict";

function saveToStorage(key, value) {
    if (localStorage) {
        return localStorage.setItem(key,JSON.stringify(value));
    }
    return false;
}

function loadFromStorage(key) {
    if (localStorage) {
        return JSON.parse(localStorage.getItem(key));
    }
    return false;
}

function loadTokenFromStorage()
{
    if (loadFromStorage(_config.localStorageGameObject) !== false)
    {
        return loadFromStorage(_config.localStorageGameObject).token;
    }
    else
    {
        return null;
    }
}
