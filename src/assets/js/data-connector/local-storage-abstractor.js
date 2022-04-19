"use strict";
let _token = null;

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

function removeFromStorage(key)
{
    if (localStorage.getItem(key) != null)
    {
        localStorage.removeItem(key);
    }
}

function loadTokenFromStorage()
{
    if (loadFromStorage(_config.localStorageGameObject))
    {
        _token = loadFromStorage(_config.localStorageTokenObject);
    }
    else
    {
        _token = null;
    }
}
