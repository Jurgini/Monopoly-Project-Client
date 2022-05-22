"use strict";

const _config = {
    groupnumber: '18',
    gameprefix: 'group18',
    localStorageGameObject: "game",
    localStorageTokenObject: "token",
    errorHandlerSelector: '.errormessages p',
    monopolyUrl: `https://project-i.ti.howest.be/monopoly-18/`,
    delay: 1500,
    tileTypes: {
        normal: ["street"],
        special: ["chance", "Jail","Go","community chest","Free Parking","Go to Jail"],
        other: ["railroad", "utility", "Water Works", "Electric Company", "Tax Income", "Luxury Tax"],
    },
    getAPIUrl: function() { return `https://project-i.ti.howest.be/monopoly-${this.groupnumber}/api`;}
    //getAPIUrl: function() { return `localhost://8080`;}
};
