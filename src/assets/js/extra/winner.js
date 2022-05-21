"use strict";

document.addEventListener("DOMContentLoaded", showVictor);

function showVictor(){
    let victor;

        if (loadFromStorage("gameWinner") != null){
            victor = loadFromStorage("gameWinner");
        }
        else { victor = "N/A";
        }

    document.querySelector("h3#victor").textContent = victor;
    removeFromStorage("gameWinner");
}
