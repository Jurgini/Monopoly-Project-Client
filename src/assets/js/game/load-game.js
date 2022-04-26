'use strict';

document.addEventListener('DOMContentLoaded', init);
loadTokenFromStorage();

function init() {
    getGameDetails();
    loadCards();
}

function renderOwnedProperties(onGoingGame) {
    onGoingGame.players.forEach((player)=>{
        player.properties.forEach((property)=>{
            document.querySelector(`#player-card-${player.name} .${property.property.toLowerCase().replaceAll(' ', '-')}`).classList.toggle('not-bought');
        });
    });
}

function getGameDetails() {
    fetchFromServer(`/games/${loadFromStorage('game').gameId}`, 'GET')
        .then(onGoingGame => {
            /* RENDERING GAME INFORMATION */
            const players = onGoingGame.players;
            renderCards(onGoingGame);
            renderCurrentPlayer(onGoingGame);
            renderGameInfo(onGoingGame);
            renderPlayersInfo(players);
            renderOwnedProperties(onGoingGame);
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

    $template.setAttribute('id',`player-card-${playerInOnGoingGame.name}`);

    $pawn.setAttribute('src', `images/pawns/${playerPawn.id}.png`);
    $pawn.setAttribute('alt', playerPawn.displayName);
    $pawn.setAttribute('title', playerPawn.displayName);
    $template.querySelector('.player-balance').textContent = `${playerInOnGoingGame.name}: €${playerInOnGoingGame.money}`;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

/* -=[ALL ABOUT CARDS]=- */

function renderCards(onGoingGame) {
    onGoingGame.players.forEach(player => {
        if (onGoingGame.currentPlayer === player.name) {
            const currentTile = player.currentTile;
            fetchFromServer('/tiles', 'GET').then(tiles => tileNameToNumber(tiles, currentTile)).catch();
        }
    });
}

function tileNameToNumber(tiles, currentTile) {
    tiles.forEach(tile => {
        if (tile.name === currentTile) {
            console.log(tile.position);
            const currentTileNumber = tile.position;
            tilesToShow(currentTileNumber);
        }
    });
}

function tilesToShow(currentTileNumber) {
    const toShowTiles = [currentTileNumber, currentTileNumber + 1, currentTileNumber + 2, currentTileNumber + 3, currentTileNumber + 4, currentTileNumber + 5];
    loadCards(toShowTiles);
}

function loadCards(toShowTiles) {
    const $container = document.querySelector('#next-positions-container');
    fetchFromServer('/tiles', 'GET').then(tiles => displayCards(tiles, toShowTiles, $container)).catch();
}

/* - RENDERING ALL THE DIFFERENT CARDS - */

function displayCards(tiles, toShowTiles, $container) {
    console.log(tiles);
    tiles.forEach(tile => {
        toShowTiles.forEach(toShowTile => { //loop through the cards needed to display [array]
            if (toShowTile === tile.position) {
                displayCard(tile, $container);
            }
        });
    });
}

function displayCard(tile, $container) {
    const tileType = tile.type;
    if (_config.tileTypes.normal.includes(tileType))
    {
        displayNormalCard(tile, $container);
    }
    else if (_config.tileTypes.special.includes(tileType))
    {
        displaySpecialCard(tile, $container);
    }
    else
    {
        switch(tileType)
        {
            case "railroad":
                displayRailroadCard(tile, $container);
                break;
            case "utility":
                displayUtilityCard(tile, $container);
                break;
            case "Water Works":
                displayUtilityCard(tile, $container);
                break;
            case "Electric Company":
                displayUtilityCard(tile, $container);
                break;
            case "Tax Income":
                displayIncomeTaxCard(tile, $container);
                break;
            case "Luxury Tax":
                displayIncomeTaxCard(tile, $container);
                break;
            default:
                break;
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
    const tileName = tile.type;
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
    switch (tileType)
    {
        case "Tax Income":
            $template.querySelector('.card-extra .tax').textContent = "You hold a dorm party, you pay €200 for the preparations";
            break;
        case "Luxury Tax":
            $template.querySelector('.card-extra .tax').textContent = "You're feeling good, you keep a tour general!";
            break;
        default:
            break;
    }

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
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
