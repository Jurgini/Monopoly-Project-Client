'use strict';

function displayError(errorMessage) {
    const $errorContainer = document.querySelector('div.errormessages');
    $errorContainer.removeAttribute('hidden');
    setTimeout(() => {$errorContainer.setAttribute('hidden', true)}, 3000)
    const $errorParagraph = $errorContainer.querySelector('p')
    $errorParagraph.innerHTML = "";
    $errorParagraph.insertAdjacentHTML('beforeend', errorMessage);
}
