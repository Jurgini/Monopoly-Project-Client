'use strict';
document.addEventListener('DOMContentLoaded',init);

function init()
{
    loadCards();
}
function loadCards()
{
    const $container = document.querySelector('body');
    fetchFromServer('/tiles','GET').then(tiles => displayCards(tiles, $container)).catch();
}

function displayCards(tiles, $container)
{
    console.log(tiles);
    tiles.forEach(tile => {
        displayCard(tile, $container);
    });
}

function displayCard(tile, $container)
{
    const tileType = tile.type;
    if (_config.tileTypes.normal.includes(tileType))
    {
        displayNormalCard(tile, $container);
    }
    else if (_config.tileTypes.special.includes(tileType))
    {
        displaySpecialCard(tile, $container);
    }
    else if (_config.tileTypes.other.includes(tileType))
    {
        if (tileType === "railroad")
        {
            displayRailroadCard(tile, $container);
        }
        else if(tileType === "utility")
        {
            displayUtilityCard(tile, $container);
        }
    }


}

function displayNormalCard(tile, $container)
{
    const $template = document.querySelector('template#normal-card').content.firstElementChild.cloneNode(true);
    addTileColor($template, tile);
    $template.querySelector('h2.title').textContent = tile.name;
    $template.querySelector('.rent').textContent = `RENT: €${tile.rent}`;
    $template.querySelector('.property .price-one').textContent = `€${tile.rentWithOneHouse}`;
    $template.querySelector('.property .price-two').textContent = `€${tile.rentWithTwoHouses}`;
    $template.querySelector('.property .price-three').textContent = `€${tile.rentWithThreeHouses}`;
    $template.querySelector('.property .price-four').textContent = `€${tile.rentWithFourHouses}`;
    $template.querySelector('.property .price-complex').textContent = `€${tile.rentWithHotel}`;
    $template.querySelector('.card-extra .mortgage').textContent = `Mortgage value €${tile.mortgage}`;
    $template.querySelector('.card-extra .mortgage').textContent = `Mortgage value €${tile.mortgage}`;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displaySpecialCard(tile, $container)
{
    const $template = document.querySelector('template#special-card').content.firstElementChild.cloneNode(true);
    const tileType = tile.type;
    const tileTypeClass = tileType.toLowerCase().replaceAll(' ', '-');
    const cardTitle = tileType.toUpperCase();
    $template.classList.add(tileTypeClass);
    $template.querySelector('.title').textContent = cardTitle;
    $template.querySelector('.icon').insertAdjacentHTML('beforeend',` <img src="assets/media/card-addons/${tileTypeClass}.png" alt='${tileTypeClass}' title='${tileTypeClass}'>`);

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displayUtilityCard(tile, $container)
{
    const $template = document.querySelector('template#utility-card').content.firstElementChild.cloneNode(true);

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function displayRailroadCard(tile, $container)
{
    const $template = document.querySelector('template#railroad-card').content.firstElementChild.cloneNode(true);

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}

function addTileColor($template, tile)
{
    let tileColor = tile.color;
    if (tileColor !== undefined)
    {
        $template.querySelector('.title').classList.add(`${tileColor}`);
    }
}
