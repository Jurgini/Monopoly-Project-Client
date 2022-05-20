'use strict';

document.addEventListener("DOMContentLoaded", init);

function init()
{
    document.querySelector('form #return-menu').addEventListener('click', returnToMenu);
}

function returnToMenu(e)
{
    e.preventDefault();
    clearGameFromLocalStorage();
    redirect('index.html');
}
