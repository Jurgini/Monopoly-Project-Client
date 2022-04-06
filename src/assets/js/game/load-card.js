'use strict';
document.addEventListener('DOMContentLoaded',init);

function init()
{
    loadCards();
}
function loadCards()
{
    const $container = document.querySelector('body');
    fetchFromServer('/tiles','GET').then(tiles => displayCards(tiles, $container)).catch(errorHandler);
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
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    let tileColor = tile.color;
    if (tileColor !== undefined)
    {
        $template.querySelector('.title').classList.add(`${tileColor.toLowerCase()}`);
    }
    $template.querySelector('.title h2').textContent = tile.name;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}
