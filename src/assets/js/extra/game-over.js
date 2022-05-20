<<<<<<< HEAD
'use strict';

document.addEventListener("DOMContentLoaded", init);

function init()
{
    document.querySelector('form #return-menu').addEventListener('click', returnToMenu);
    showWinner();
}

function returnToMenu(e)
{
    e.preventDefault();
    clearGameFromLocalStorage();
    redirect('index.html');
}

function showWinner()
{
    const $victorElement = document.querySelector("#victor");
    $victorElement.innerHTML = loadFromStorage('currentGame').winner;
}
=======
'use strict';

document.addEventListener("DOMContentLoaded", init);

function init()
{
    document.querySelector('form #return-menu').addEventListener('click', returnToMenu);
    showWinner();
}

function returnToMenu(e)
{
    e.preventDefault();
    clearGameFromLocalStorage();
    redirect('index.html');
}

function showWinner()
{
    const $victorElement = document.querySelector("#victor");
    $victorElement.innerHTML = loadFromStorage('currentGame').winner;
}
>>>>>>> 18c07f1485187ff83c163917366d33ca02110bf8
