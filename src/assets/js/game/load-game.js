'use strict';

document.addEventListener('DOMContentLoaded', init);
loadTokenFromStorage();

function init() {
    getGameDetails();
}

function renderOwnedProperties(onGoingGame) {
    console.log(onGoingGame);
    onGoingGame.players.forEach((player) => {
        console.log(player.name + " " + player.currentTile);
        player.properties.forEach((property) => {
            const $ownedProperty = document.querySelector(`#player-card-${player.name} .${property.property.toLowerCase().replaceAll(' ', '-')}`);
            $ownedProperty.classList.toggle('not-bought');
            $ownedProperty.setAttribute('title', `${property.property}: houses ${property.houseCount}, hotels ${property.hotelCount}, mortgage: ${property.mortgage}`);
        });
    });
}

function getGameDetails() {
    fetchFromServer(`/games/${loadFromStorage('game').gameId}`, 'GET')
        .then(onGoingGame => {
            /* RENDERING GAME INFORMATION */
            const players = onGoingGame.players;
            renderCurrentPlayer(onGoingGame);
            renderGameInfo(onGoingGame);
            renderPlayersInfo(players);
            renderOwnedProperties(onGoingGame);
            renderTiles(onGoingGame);
        });
}

/* -=[ALL ABOUT PLAYER INFORMATION]=- */
function renderCurrentPlayer(onGoingGame) {
    const $turnText = document.querySelector('div#current-container p');
    $turnText.textContent = `${onGoingGame.currentPlayer}'s TURN`;
}


function renderGameInfo(onGoingGame) {
    const $gameInfo = document.querySelector('div#game-info');
    const $availableHouses = $gameInfo.querySelector('#available-houses');
    $availableHouses.textContent = `dorms: ${onGoingGame.availableHouses}`;
    const $availableHotels = $gameInfo.querySelector('#available-hotels');
    $availableHotels.textContent = `complexes: ${onGoingGame.availableHotels}`;
}

function renderPlayersInfo(playersInOnGoingGame) {

    const $container = document.querySelector('div#players-container');
    $container.innerHTML = document.querySelector('template#player-info-template').outerHTML;

    playersInOnGoingGame.forEach(player => {
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

    $template.setAttribute('id', `player-card-${playerInOnGoingGame.name}`);

    $pawn.setAttribute('src', `images/pawns/${playerPawn.id}.png`);
    $pawn.setAttribute('alt', playerPawn.displayName);
    $pawn.setAttribute('title', playerPawn.displayName);
    $template.querySelector('.player-balance').textContent = `${playerInOnGoingGame.name}: €${playerInOnGoingGame.money}`;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

/* -=[ALL ABOUT CARDS]=- */

function renderTiles(onGoingGame) {
    const currentTile = onGoingGame.players.find(player => player.name === onGoingGame.currentPlayer).currentTile;
    renderTilesAhead(currentTile);
}

function renderTilesAhead(currentTile) {
    const $containerTilesAhead = document.querySelector("#next-positions-container");

    fetchFromServer(`/tiles/${currentTile}`, 'GET').then(async (tile) => {
        let currentTileNumber;
        currentTileNumber = tile.position;
        for (let i = 0; i <= 12; i++) {
            await fetchFromServer(`/tiles/${(currentTileNumber + i) % 40}`, 'GET').then(async (tile) => {
                displayCard(tile, $containerTilesAhead, document.querySelector(`#tile-spot-${i}`));
            });
        }
    });
}


async function displayCard(tile, $container, $insertContainer) {
    const tileType = tile.type;
    let $template;
    if (_config.tileTypes.normal.includes(tileType)) {
        $template = displayNormalCard(tile, $container);
    } else if (_config.tileTypes.special.includes(tileType)) {
        $template = displaySpecialCard(tile, $container);
    } else {
        switch (tileType) {
            case "railroad":
                $template = displayRailroadCard(tile, $container);
                break;
            case "utility":
                $template = displayUtilityCard(tile, $container);
                break;
            case "Water Works":
                $template = displayUtilityCard(tile, $container);
                break;
            case "Electric Company":
                $template = displayUtilityCard(tile, $container);
                break;
            case "Tax Income":
                $template = displayIncomeTaxCard(tile, $container);
                break;
            case "Luxury Tax":
                $template = displayIncomeTaxCard(tile, $container);
                break;
            default:
                break;
        }
    }

    $insertContainer.innerHTML = $template.outerHTML;
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
    return $template;
}

function displaySpecialCard(tile, $container) {
    const $template = getTemplate('special-card');
    const tileType = tile.type;
    const tileTypeClass = tileType.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileType.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    $template.querySelector('.icon').insertAdjacentHTML('beforeend', ` <img src="assets/media/card-addons/${tileTypeClass}.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);

    return $template;
}

function displayUtilityCard(tile, $container) {
    const $template = getTemplate('utility-card');
    const tileName = tile.name;
    const cardTitle = tileName.toUpperCase();
    const tileTypeClass = cardTitle.toLowerCase().replaceAll(' ', '-');
    $template.classList.add(tileTypeClass);
    $template.querySelector('.icon').insertAdjacentHTML('beforeend', ` <img src="assets/media/card-addons/${tileTypeClass}.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);
    $template.querySelector('.title').textContent = cardTitle;
    return $template;

}

function displayRailroadCard(tile, $container) {
    const $template = getTemplate('railroad-card');
    const tileName = tile.type;
    const tileTypeClass = tileName.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileName.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    $template.querySelector('.rent span').textContent = `€${tile.rent}`;
    $template.querySelector('.icon').insertAdjacentHTML('beforeend', ` <img src="assets/media/card-addons/railroad.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);
    $template.querySelector('.card-extra .mortgage span').textContent = `€${tile.mortgage}`;
    $template.querySelector('.card-extra .card-price').textContent = `€${tile.cost}`;

    return $template;
}

function displayIncomeTaxCard(tile, $container) {
    const $template = getTemplate('tax-income-card');
    const tileType = tile.type;
    const tileTypeClass = tileType.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileType.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    switch (tileType) {
        case "Tax Income":
            $template.querySelector('.card-extra .tax').textContent = "You hold a dorm party, you pay €200 for the preparations";
            break;
        case "Luxury Tax":
            $template.querySelector('.card-extra .tax').textContent = "You're feeling good, you keep a tour general!";
            break;
        default:
            break;
    }

    return $template;
}

function getTemplate(tileType) {
    return document.querySelector(`template#${tileType}`).content.firstElementChild.cloneNode(true);
}

function addTileColor($template, tile) {
    const tileColor = tile.color;
    if (tileColor !== undefined) {
        $template.querySelector('.title').classList.add(`${tileColor}`);
    }
}
