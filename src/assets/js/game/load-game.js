'use strict';

let _playerPositionID = null;
let _tempPlayerPositionID = null;
const _playerName = loadFromStorage('playerName');

document.addEventListener('DOMContentLoaded', init);
loadTokenFromStorage();

function init() {
    getGameDetails();
    loadCards();
    const $rollDiceButton = document.querySelector('#dice-box input[type="submit"]');
    $rollDiceButton.addEventListener('click', rollDice);
}

function getGameDetails() {
    fetchFromServer(`/games/${loadFromStorage('game').gameId}`, 'GET')
        .then(onGoingGame => {
            /* RENDERING GAME INFORMATION */
            const players = onGoingGame.players;
            console.log(onGoingGame);
            renderCards(onGoingGame);
            renderCurrentPlayer(onGoingGame);
            renderGameInfo(onGoingGame);
            renderDiceButton();
            renderPlayersInfo(players);
        });
}

/* -=[ALL ABOUT GENERAL GAME STUFF]=- */

/* -=[ALL ABOUT GAME ACTIONS - NOT VISIBLE]=- */
function rollDice(e) {
    e.preventDefault();
    e.target.classList.add("hidden"); // todo find better solution for hiding and showing
    // Game functionality (API)
    fetchFromServer(`/games/${loadFromStorage('game').gameId}/players/${loadFromStorage('game').playerName}/dice`, 'POST')
        .then(turn => showDices(turn))
}

/* -=[ALL ABOUT GAME ACTIONS - VISIBLE]=- */

function showDices(turnInfo) {
    const $container = document.querySelector('#dice-box div');
    const lastDiceRoll = turnInfo.lastDiceRoll;
    lastDiceRoll.forEach(roll => {
        showDice(roll, $container);
    });
}

function showDice(roll, $container) {
    $container.insertAdjacentHTML('beforeend', `<img src="assets/media/dices/${roll}.png" alt="${roll}" title="${roll}">`);
}

/* -=[ALL ABOUT PLAYER INFORMATION]=- */
function renderCurrentPlayer(onGoingGame) {
    const $turnText = document.querySelector('div#current-container p');
    $turnText.textContent = `${onGoingGame.currentPlayer}'s TURN`;
}

function renderDiceButton() {
    const $diceBox = document.querySelector('div#dice-box');
    $diceBox.querySelector('p').textContent = "ROLL THE DICE";
}

function renderGameInfo(onGoingGame) {
    const $gameInfo = document.querySelector('div#game-info');
    const $availableHouses = $gameInfo.querySelector('#available-houses');
    $availableHouses.textContent = `dorms: ${onGoingGame.availableHouses}`;
    const $availableHotels = $gameInfo.querySelector('#available-hotels');
    $availableHotels.textContent = `complexes: ${onGoingGame.availableHotels}`;
}

function renderPlayersInfo(playersInOnGoingGame) {
    playersInOnGoingGame.forEach(player => {
        const $container = document.querySelector('div#players-container');
        const playerPawns = loadFromStorage('pawns');
        let playerPawn;
        playerPawns.forEach(distribution => {
            if (distribution.player === player.name) {
                playerPawn = distribution.pawn;
            }
        });

        renderPlayerInfo(player, playerPawn, $container);
    });
}

function renderPlayerInfo(playerInOnGoingGame, playerPawn, $container) {
    const $template = document.querySelector('template#player-info-template').content.firstElementChild.cloneNode(true);
    const $pawn = $template.querySelector('img');
    // TODO: If this is the turn taking player add class: player-taking-turn
    $pawn.setAttribute('src', `images/pawns/${playerPawn.id}.png`);
    $pawn.setAttribute('alt', playerPawn.displayName);
    $pawn.setAttribute('title', playerPawn.displayName);
    $template.querySelector('.player-balance').textContent = `${playerInOnGoingGame.name}: €${playerInOnGoingGame.money}`;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

/* -=[ALL ABOUT CARDS]=- */

/* NOT WORKING YET [START] */
function renderCards(onGoingGame) {
    let currentTileName = null;
    console.log(onGoingGame);
    onGoingGame.players.forEach(player => {
        const playerName = player.name;
        if (player.name === playerName) {
            currentTileName = player.currentTile;
        }
    });
    // loadFromStorage('tiles').forEach(tile =>
    // {
    //     if (tile.name === currentTileName)
    //     {
    //         _tempPlayerPositionID = tile.position;
    //         _playerPositionID = tile.position;
    //         /* --> getCardById(tile.position); */
    //     }
    // });
}

function loadCards() {
    const $container = document.querySelector('#next-positions-container');
    fetchFromServer('/tiles', 'GET').then(tiles => {
        displayCards(tiles, $container);
    }).catch();
}

/* NOT WORKING YET [END] */

/* - RENDERING ALL THE DIFFERENT CARDS - */

function displayCards(tiles, $container) {
    console.log(tiles);
    tiles.forEach(tile => {
        displayCard(tile, $container);
    });
}

function displayCard(tile, $container) {
    const tileType = tile.type;
    if (_config.tileTypes.normal.includes(tileType)) {
        displayNormalCard(tile, $container);
    } else if (_config.tileTypes.special.includes(tileType)) {
        displaySpecialCard(tile, $container);
    } else if (Object.values(_config.tileTypes.other).includes(tileType)) {
        if (tileType === _config.tileTypes.other.railroadValue) {
            displayRailroadCard(tile, $container);
        } else if (tileType === _config.tileTypes.other.utilityValue) {
            displayUtilityCard(tile, $container);
        } else if (tileType === _config.tileTypes.other.taxIncomeValue || tileType === _config.tileTypes.other.luxuryTaxIncomeValue) {
            displayIncomeTaxCard(tile, $container);
        }
    }
}

function displayNormalCard(tile, $container) {
    const $template = getTemplate('normal-card');
    addTileColor($template, tile);
    $template.querySelector('h2.title').textContent = tile.name;
    $template.querySelector('.rent span').textContent = `€${tile.rent}`;
    $template.querySelector('.property .price-one').textContent = `€${tile.rentWithOneHouse}`;
    $template.querySelector('.property .price-two').textContent = `€${tile.rentWithTwoHouses}`;
    $template.querySelector('.property .price-three').textContent = `€${tile.rentWithThreeHouses}`;
    $template.querySelector('.property .price-four').textContent = `€${tile.rentWithFourHouses}`;
    $template.querySelector('.property .price-complex').textContent = `€${tile.rentWithHotel}`;
    $template.querySelector('.card-extra .price span').textContent = `€${tile.housePrice}`;
    $template.querySelector('.card-extra .mortgage span').textContent = `€${tile.mortgage}`;
    $template.querySelector('.card-extra .card-price').textContent = `€${tile.cost}`;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displaySpecialCard(tile, $container) {
    const $template = getTemplate('special-card');
    const tileType = tile.type;
    const tileTypeClass = tileType.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileType.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    $template.querySelector('.icon').insertAdjacentHTML('beforeend', ` <img src="assets/media/card-addons/${tileTypeClass}.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displayUtilityCard(tile, $container) {
    const $template = getTemplate('utility-card');
    const tileName = tile.name;
    const cardTitle = tileName.toUpperCase();
    const tileTypeClass = cardTitle.toLowerCase().replaceAll(' ', '-');
    $template.classList.add(tileTypeClass);
    $template.querySelector('.icon').insertAdjacentHTML('beforeend', ` <img src="assets/media/card-addons/${tileTypeClass}.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);
    $template.querySelector('.title').textContent = cardTitle;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);

}

function displayRailroadCard(tile, $container) {
    const $template = getTemplate('railroad-card');
    const tileName = tile.name;
    const tileTypeClass = tileName.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileName.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    $template.querySelector('.rent span').textContent = `€${tile.rent}`;
    $template.querySelector('.icon').insertAdjacentHTML('beforeend', ` <img src="assets/media/card-addons/railroad.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);
    $template.querySelector('.card-extra .mortgage span').textContent = `€${tile.mortgage}`;
    $template.querySelector('.card-extra .card-price').textContent = `€${tile.cost}`;

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displayIncomeTaxCard(tile, $container) {
    const $template = getTemplate('tax-income-card');
    const tileType = tile.type;
    const tileTypeClass = tileType.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileType.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    if (tileType === _config.tileTypes.other.taxIncomeValue) {
        $template.querySelector('.card-extra .tax').textContent = "You hold a dorm party, you pay €200 for the preparations";
    } else if (tileType === _config.tileTypes.other.luxuryTaxIncomeValue) {
        $template.querySelector('.card-extra .tax').textContent = "You're feeling good, you keep a tour general!";
    }

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displayPopupConfirm(title, text, accept, deny) {
    const $template = getTemplate('normal-confirmpopup');
    $template.querySelector('h2').textContent = title;
    $template.querySelector('.popup-text').textContent = text;
    $template.querySelector('.button1').textContent = accept;
    $template.querySelector('.button2').textContent = deny;
}

function displayPopupAlertNormalCard(title, text, confirm) {
    const $template = getTemplate('normal-alertpopup');
    $template.querySelector('h2').textContent = title
    $template.querySelector('.popup-text').textContent = text
    $template.querySelector('.accept').textContent = confirm
}

function displayPopupSpecialCard(tile) {

}

function getTemplate(tileType) {
    return document.querySelector(`template#${tileType}`).content.firstElementChild.cloneNode(true);
}

function addTileColor($template, tile) {
    let tileColor = tile.color;
    if (tileColor !== undefined) {
        $template.querySelector('.title').classList.add(`${tileColor}`);
    }
}
