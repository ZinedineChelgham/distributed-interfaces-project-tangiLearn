const BACKEND_URL = "http://localhost:3000";

// Get the IP address and port separately
const ipAddress = BACKEND_URL.substring(0, BACKEND_URL.lastIndexOf(':'));

const GAME_URL_MAPPER = {
    pipe: `${ipAddress}:5174/`,
    tower: `${ipAddress}:5173/`,
}

const API = `${BACKEND_URL}/api`


function checkGameStatus() {
    fetch(`${API}/monitoring/current-game`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const gameName = data;
            if (!gameName) return;

            if (gameName === 'tower') {
                fetch(`${API}/tower-game/get-id`)
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
