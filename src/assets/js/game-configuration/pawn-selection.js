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
    _pawnsCopy = Object.assign([],_PAWNS);

    document.querySelectorAll(".chosen").forEach(o => {
        o.classList.remove("chosen");
    });
    e.target.closest("figure").classList.add("chosen");

    document.querySelector("input[type='submit']").hidden = false;
    savePawn(e.target.closest("figure"));
}

function savePawn(target) {
    const GAME_ID = loadFromStorage("game").gameId;
    const GAME_INFO_SERVER = fetchFromServer(`/games/${GAME_ID}`,"GET");
    const USERNAME = loadFromStorage("game").playerName;
    let pawnDistribution = [{
        "player": USERNAME,
        "pawn": _pawnsCopy[target.dataset.id]
    }];

    _pawnsCopy.splice(parseInt(target.dataset.id),1);

    for (let key in GAME_INFO_SERVER.players) {
        if (GAME_INFO_SERVER.players[key].name !== USERNAME) {

            let pawnPlacement = {
                "player": GAME_INFO_SERVER.players[key].name,
                "pawn": giveAvailablePawn()
            };
            pawnDistribution.push(pawnPlacement);
        }
    }

    saveToStorage('pawns', pawnDistribution);
}

function giveAvailablePawn() {
    let pawn = _pawnsCopy[0];
    _pawnsCopy.splice(0,1);
    return pawn;
}
