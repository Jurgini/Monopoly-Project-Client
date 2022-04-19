"use strict";

loadTokenFromStorage();

function checkGame(){
    fetchFromServer("GET", `/games/${loadFromStorage("game").gameId}`)
        .then(ongoingGame => {
            if (ongoingGame.ended === true){
                endGame(ongoingGame);
            }
        })

}
function endGame(ongoingGame){
    removeFromStorage("game");
    removeFromStorage("token");
    removeFromStorage("pawns");
    redirect("game-over.html");
}