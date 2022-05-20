<<<<<<< HEAD
'use strict';
loadTokenFromStorage();

function showBankruptButton()
{
    document.querySelector("#bankruptcy button").hidden = false;
    document.querySelector("#bankruptcy button").addEventListener('click', window.confirm("Do you want to give up?"));
}

function goBankrupt()
{
    fetchFromServer(`/games/${loadFromStorage(_config.localStorageGameObject).gameId}/players/${loadFromStorage(_config.localStorageGameObject).playerName}/bankruptcy`, "POST")
        .then(response => {
            redirect("bankruptcy.html");
        });
}

function proposeBankruptcy(e)
{
    // TODO: replace confirm with popup
    e.preventDefault();
    confirm(`You want to give up?`) ? goBankrupt() : "FALSE";
}
=======
'use strict';
loadTokenFromStorage();

function showBankruptButton()
{
    document.querySelector("#bankruptcy button").hidden = false;
    document.querySelector("#bankruptcy button").addEventListener('click', window.confirm("Do you want to give up?"));
}

function goBankrupt()
{
    fetchFromServer(`/games/${loadFromStorage(_config.localStorageGameObject).gameId}/players/${loadFromStorage(_config.localStorageGameObject).playerName}/bankruptcy`, "POST")
        .then(response => {
            redirect("bankruptcy.html");
        });
}

function proposeBankruptcy(e)
{
    // TODO: replace confirm with popup
    e.preventDefault();
    confirm(`You want to give up?`) ? goBankrupt() : "FALSE";
}
>>>>>>> 18c07f1485187ff83c163917366d33ca02110bf8
