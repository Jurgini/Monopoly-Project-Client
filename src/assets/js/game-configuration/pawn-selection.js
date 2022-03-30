"use strict";

const pawns = [{
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
    const $template = document.querySelector("template").content.firstElementChild.cloneNode(true);
    for (let i = 0; i < pawns.length; i++) {

        $template.dataset.id = i.toString();

        $template.querySelector("img").src = `images/pawns/${pawns[i].id}.png`;
        $template.querySelector("img").title = pawns[i].displayName;
        $template.querySelector("img").alt = pawns[i].displayName;

        document.querySelector("#container").insertAdjacentHTML('afterbegin', $template.outerHTML);
    }
}

function choosePawn(e) {
    pawnsCopy = Object.assign([],pawns);

    document.querySelectorAll(".chosen").forEach(o => {
        o.classList.remove("chosen");
    });
    e.target.closest("figure").classList.add("chosen");

    savePawn(e.target.closest("figure"));
}

function savePawn(target) {
    let voorbeeld = {
        "numberOfPlayers": 6,
        "players": [
            {
                "name": "fix",
                "currentTile": "Go",
                "jailed": false,
                "money": 1500,
                "bankrupt": false,
                "getOutOfJailFreeCards": 0,
                "taxSystem": "ESTIMATE",
                "properties": [],
                "debt": 0
            },
            {
                "name": "pim",
                "currentTile": "Go",
                "jailed": false,
                "money": 1500,
                "bankrupt": false,
                "getOutOfJailFreeCards": 0,
                "taxSystem": "ESTIMATE",
                "properties": [],
                "debt": 0
            },
            {
                "name": "nick",
                "currentTile": "Go",
                "jailed": false,
                "money": 1500,
                "bankrupt": false,
                "getOutOfJailFreeCards": 0,
                "taxSystem": "ESTIMATE",
                "properties": [],
                "debt": 0
            },
            {
                "name": "joachim",
                "currentTile": "Go",
                "jailed": false,
                "money": 1500,
                "bankrupt": false,
                "getOutOfJailFreeCards": 0,
                "taxSystem": "ESTIMATE",
                "properties": [],
                "debt": 0
            },
            {
                "name": "tuur",
                "currentTile": "Go",
                "jailed": false,
                "money": 1500,
                "bankrupt": false,
                "getOutOfJailFreeCards": 0,
                "taxSystem": "ESTIMATE",
                "properties": [],
                "debt": 0
            },
            {
                "name": "jo",
                "currentTile": "Go",
                "jailed": false,
                "money": 1500,
                "bankrupt": false,
                "getOutOfJailFreeCards": 0,
                "taxSystem": "ESTIMATE",
                "properties": [],
                "debt": 0
            }
        ],
        "started": true,
        "directSale": null,
        "availableHouses": 32,
        "auctions": [],
        "turns": [],
        "lastDiceRoll": null,
        "canRoll": true,
        "ended": false,
        "currentPlayer": "fix",
        "winner": null
    };

    const username = "joachim" //loadFromStorage("username");

    let pawnDistribution = [{
        "player": username,
        "pawn": pawnsCopy[target.dataset.id]
    }];

    pawnsCopy.splice(parseInt(target.dataset.id),1);

    for (let key in voorbeeld.players) {
        if (voorbeeld.players[key].name !== username) {

            let pawnPlacement = {
                "player": voorbeeld.players[key].name,
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
