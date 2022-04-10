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
        special: ["chance", "Jail","Go","community chest","Free Parking","Go to Jail"],
        other: {
            railroadValue: "railroad",
            utilityValue: "utility",
            waterUtilityValue: "Water Works",
            electricUtilityValue: "Electric Company",
            taxIncomeValue: "Tax Income",
            luxuryTaxIncomeValue: "Luxury Tax"
        },
    },
    getAPIUrl: function() { return `https://project-i.ti.howest.be/monopoly-${this.groupnumber}/api`;}
};
