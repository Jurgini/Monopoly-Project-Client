"use strict";
document.addEventListener("DOMContentLoaded", checkGame);
loadTokenFromStorage();

function checkGame(){
    fetchFromServer(`/games/${loadFromStorage(_config.localStorageGameObject).gameId}`, "GET")
        .then(ongoingGame => {
            if (ongoingGame.ended === true){
                let gameWinner = ongoingGame.winner;
                saveToStorage("gameWinner", gameWinner)
                ongoingGame.players.forEach(player => {
                    if (player.name === gameWinner)
                    {
                        endGame();
                    }
                    else
                    {
                        goBankrupt();
                    }
                })
                endGame();
            }
            setTimeout(checkGame, _config.delay);
        });

}
function endGame(){
    removeFromStorage("game");
    removeFromStorage("token");
    removeFromStorage("pawns");
    redirect("game-over.html");
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
    e.preventDefault();
    displayPopupConfirm("BANKRUPT", "You want to go bankrupt?", "Yes", "No").then(answer => {
        if (answer.action === 'true')
        {
            checkGame();
            goBankrupt()
        }
    });
}