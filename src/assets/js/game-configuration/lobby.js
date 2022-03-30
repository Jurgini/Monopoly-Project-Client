function initLobby()
{
    let lobbyId = 'group18_288';

    displayLobbyId(lobbyId);
}

function displayLobbyId(lobbyId)
{
    fetchFromServer(`/games?prefix=${lobbyId}`,'GET').then(response => {
      document.querySelector("span#gameid").innerHTML=response[0].id;
    })

}

