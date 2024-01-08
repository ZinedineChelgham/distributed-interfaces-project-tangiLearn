const GAME_URL_MAPPER = {
    pipe: 'http://192.168.1.14:5174/',
    tower: 'http://192.168.1.14:5173/',
}

const API = "http://192.168.1.14:3000/api/monitoring"


function checkGameStatus() {
    fetch(`${API}/current-game`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const gameName = data;
            if (!gameName) return;

            if (gameName === 'tower') {
                fetch('http://192.168.1.14:3000/api/tower-game/get-id')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.gameId) {
                            window.location.href = GAME_URL_MAPPER[gameName] + "gamepage?id=" + data.gameId;
                        }
                    })
            } else window.location.href = GAME_URL_MAPPER[gameName];
        })
        .catch(error => console.error('Error checking game status:', error));
}


setInterval(checkGameStatus, 200);
