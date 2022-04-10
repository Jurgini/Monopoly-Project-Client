'use strict';
document.addEventListener('DOMContentLoaded', init);
loadTokenFromStorage();

function init() {
    getGameDetails();
    loadCards();
}

function getGameDetails() {
    fetchFromServer(`/games/${loadFromStorage('game').gameId}`, 'GET')
        .then(onGoingGame => {
            console.log(onGoingGame);
        });
}


function loadCards() {
    const $container = document.querySelector('#next-positions-container');
    fetchFromServer('/tiles', 'GET').then(tiles => displayCards(tiles, $container)).catch();
}

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
        $template.querySelector('.card-extra .tax').textContent = "You hold a kot party, you pay €200 for the preparations";
    } else if (tileType === _config.tileTypes.other.luxuryTaxIncomeValue) {
        $template.querySelector('.card-extra .tax').textContent = "You're feeling good, you keep a tour general!";
    }

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
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


/* COPY PASTA */
/*
function getCardById(id) {
    const toShow = createToShow(id, id - 2, id + 3);
    for (const cardId of toShow) {
        if (cardId === id) {
            showCards(loadFromStorage("tiles")[cardId], true);
        } else {
            showCards(loadFromStorage("tiles")[cardId], false);
        }
    }
    checkPlayerPosition();
    checkIfBought();
    checkIfMortgaged();
}

function createToShow(id, firstId, lastId) {
    const toShow = [];
    if (id === 0) {
        toShow.push(38, 39, 0, 1, 2);
    } else if (id === 1) {
        toShow.push(39, 0, 1, 2, 3);
    } else if (id === 38) {
        toShow.push(36, 37, 38, 39, 0);
    } else if (id === 39) {
        toShow.push(37, 38, 39, 0, 1);
    } else {
        for (let i = firstId; i < lastId; i++) {
            toShow.push(i);
        }
    }
    return toShow;
}

function showCards(cardInfo, middle) {
    switch (cardInfo.type) {
        case "street":
            renderNormalCard(cardInfo, middle);
            break;
        case "utility":
            renderUtilityCard(cardInfo, middle);
            break;
        case "railroad":
            renderRailroad(cardInfo, middle);
            break;
        default:
            renderSpecialCard(cardInfo, middle);
            return;
    }
}

*/