<<<<<<< HEAD
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
=======
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
>>>>>>> 18c07f1485187ff83c163917366d33ca02110bf8
