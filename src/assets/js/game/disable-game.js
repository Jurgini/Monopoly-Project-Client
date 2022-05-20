"use strict";

loadTokenFromStorage();

function checkGame(){
    fetchFromServer( `/games/${loadFromStorage("game").gameId}`, "GET")
        .then(ongoingGame => {
            if (ongoingGame.ended === true){
                endGame(ongoingGame);
            }
        });

}
function endGame(ongoingGame){
    removeFromStorage("game");
    removeFromStorage("token");
    removeFromStorage("pawns");
    console.log(ongoingGame);
    if (ongoingGame.winner != null){
        saveToStorage("gameWinner", ongoingGame.winner);
    }
    redirect("game-over.html");
}
