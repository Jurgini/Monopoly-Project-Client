"use strict";

const _PAWNS = [{
    "id": "beer-mug",
    "displayName": "Beer mug"
}, {
    "id": "alarm-clock",
    "displayName": "Alarm clock"
}, {
    "id": "pencil",
    "displayName": "Pencil"
}, {
    "id": "microscope",
    "displayName": "Microscope"
}, {
    "id": "backpack",
    "displayName": "Backpack"
}, {
    "id": "bicycle",
    "displayName": "Bicycle"
}, {
    "id": "locomotive",
    "displayName": "Locomotive"
}, {
    "id": "graduation-cap",
    "displayName": "Graduation cap"
}, {
    "id": "laptop",
    "displayName": "Laptop"
}, {
    "id": "triangular-ruler",
    "displayName": "Triangular ruler"
}];
let _pawnsCopy;
document.addEventListener("DOMContentLoaded", init);

function init() {
    loadTokenFromStorage();
    showPawns();
    document.querySelectorAll("figure").forEach(figure => {
        figure.addEventListener("click", choosePawn);
    });

}

function showPawns() {
    const $TEMPLATE = document.querySelector("template").content.firstElementChild.cloneNode(true);
    for (let i = 0; i < _PAWNS.length; i++) {

        $TEMPLATE.dataset.id = i.toString();

        $TEMPLATE.querySelector("img").src = `images/pawns/${_PAWNS[i].id}.png`;
        $TEMPLATE.querySelector("img").title = _PAWNS[i].displayName;
        $TEMPLATE.querySelector("img").alt = _PAWNS[i].displayName;

        document.querySelector("#container").insertAdjacentHTML('afterbegin', $TEMPLATE.outerHTML);
    }
}

function choosePawn(e) {
    _pawnsCopy = Object.assign([], _PAWNS);

    document.querySelectorAll(".chosen").forEach(o => {
        o.classList.remove("chosen");
    });
    e.target.closest("figure").classList.add("chosen");

    document.querySelector("input[type='submit']").hidden = false;
    savePawn(e.target.closest("figure"));
}

function distributePawnsToOtherPlayers(currentPawnDistribution, gameInfoServer, thisUserName) {
    for (const key in gameInfoServer.players) {

        if (gameInfoServer.players[key].name !== thisUserName) {

            const pawnPlacement = {
                "player": gameInfoServer.players[key].name,
                "pawn": giveAvailablePawn()
            };
            currentPawnDistribution.push(pawnPlacement);
        }
    }
    saveToStorage('pawns', currentPawnDistribution);
}

function savePawn(target) {
    const GAME_ID = loadFromStorage(_config.localStorageGameObject).gameId;
    let gameInfoServer;
    fetchFromServer(`/games/${GAME_ID}`, "GET").then(response => {
        gameInfoServer = response;

        const USERNAME = loadFromStorage(_config.localStorageGameObject).playerName;
        const pawnDistribution = [{
            "player": USERNAME,
            "pawn": _pawnsCopy[target.dataset.id]
        }];

        _pawnsCopy.splice(parseInt(target.dataset.id), 1);

        distributePawnsToOtherPlayers(pawnDistribution, gameInfoServer, USERNAME);
    });

}

function giveAvailablePawn() {
    const pawn = _pawnsCopy[0];
    _pawnsCopy.splice(0, 1);
    return pawn;
}
