"use strict";

const PAWNS = [{
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
let pawnsCopy;
document.addEventListener("DOMContentLoaded", init);

function init() {
    showPawns();
    document.querySelectorAll("figure").forEach(figure => {
        figure.addEventListener("click", choosePawn);
    });

}

function showPawns() {
    const $TEMPLATE = document.querySelector("template").content.firstElementChild.cloneNode(true);
    for (let i = 0; i < PAWNS.length; i++) {

        $TEMPLATE.dataset.id = i.toString();

        $TEMPLATE.querySelector("img").src = `images/pawns/${PAWNS[i].id}.png`;
        $TEMPLATE.querySelector("img").title = PAWNS[i].displayName;
        $TEMPLATE.querySelector("img").alt = PAWNS[i].displayName;

        document.querySelector("#container").insertAdjacentHTML('afterbegin', $TEMPLATE.outerHTML);
    }
}

function choosePawn(e) {
    pawnsCopy = Object.assign([],PAWNS);

    document.querySelectorAll(".chosen").forEach(o => {
        o.classList.remove("chosen");
    });
    e.target.closest("figure").classList.add("chosen");

    document.querySelector("input[type='submit']").hidden = false;
    savePawn(e.target.closest("figure"));
}

function savePawn(target) {
    const GAME_ID = loadFromStorage("game").gameId;
    let gameInfoServer = fetchFromServer(`/games/${GAME_ID}`,"GET");
    const USERNAME = loadFromStorage("game").playerName;
    let pawnDistribution = [{
        "player": USERNAME,
        "pawn": pawnsCopy[target.dataset.id]
    }];

    pawnsCopy.splice(parseInt(target.dataset.id),1);

    for (let key in gameInfoServer.players) {
        if (gameInfoServer.players[key].name !== USERNAME) {

            let pawnPlacement = {
                "player": gameInfoServer.players[key].name,
                "pawn": giveAvailablePawn(pawnsCopy)
            };
            pawnDistribution.push(pawnPlacement);
        }
    }

    saveToStorage('pawns', pawnDistribution);
}

function giveAvailablePawn() {
    let pawn = pawnsCopy[0];
    pawnsCopy.splice(0,1);
    return pawn;
}
