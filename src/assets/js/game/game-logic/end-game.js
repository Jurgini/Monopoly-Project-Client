"use strict";
document.addEventListener("DOMContentLoaded", checkGame);
loadTokenFromStorage();

function checkGame() {
    fetchFromServer(`/games/${loadFromStorage(_config.localStorageGameObject).gameId}`, "GET")
        .then(onGoingGame => {
            if (onGoingGame.ended === false)
            {
                setTimeout(checkGame, _config.delay);
            }
            else
            {
                endGame();
            }
        });

}
function endGame(){
    clearGameFromLocalStorage();
    redirect("game-over.html");
}
