"use strict";
document.addEventListener("DOMContentLoaded",init);

function init() {
    document.querySelectorAll("figure").forEach(figure => {
        figure.addEventListener("click",choosePawn);
    });


}

function choosePawn(e) {
    document.querySelectorAll(".chosen").forEach(o =>{
        o.classList.remove("chosen");
    });
    e.target.closest("figure").classList.add("chosen");
}
