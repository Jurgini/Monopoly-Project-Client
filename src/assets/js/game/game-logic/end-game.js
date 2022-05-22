"use strict";
document.addEventListener("DOMContentLoaded", checkGame);
loadTokenFromStorage();

function checkGame() {
    fetchFromServer(`/games/${loadFromStorage(_config.localStorageGameObject).gameId}`, "GET")
        .then(onGoingGame => {
            if (onGoingGame.ended === false) {

                let bankruptPlayer = onGoingGame.players.filter(player => player.bankrupt === true);
                console.log(bankruptPlayer);
                onGoingGame.players.forEach(player => {
                    if (player.name === bankruptPlayer.name) {
                        console.log("go to bankrupot");
                        goBankrupt();

                    }
                });

                setTimeout(checkGame, _config.delay);

            }

            else {

                saveToStorage("gameWinner", onGoingGame.winner);
                let bankruptPlayer = onGoingGame.players.filter(player => player.bankrupt === true);
                console.log(bankruptPlayer);
                onGoingGame.players.forEach(player => {
                    if (player.name === bankruptPlayer.name) {
                        console.log("go to bankrupot");
                        goBankrupt();
                    }
                });

                console.log("go to endgame");
                endGame();
            }
        });

}

function endGame() {
    clearGameFromLocalStorage();
    redirect("game-over.html");
}
