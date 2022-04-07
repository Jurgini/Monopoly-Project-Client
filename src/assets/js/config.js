"use strict";

const _config = {
    groupnumber: '00',
    gameprefix: 'group18',
    localStorageGameObject: "game",
    localStorageTokenObject: "token",
    errorHandlerSelector: '.errormessages p',
    monopolyUrl: `https://project-i.ti.howest.be/monopoly-18/`,
    delay: 1500,
    tileTypes: {
        normal: ["street"],
        special: ["chance", "Jail","Go","community chest","Tax Income","Free Parking","Go to Jail", "Luxury Tax"],
        other: ["railroad","utility"],
    },
    getAPIUrl: function() { return `https://project-i.ti.howest.be/monopoly-${this.groupnumber}/api`;}
};
