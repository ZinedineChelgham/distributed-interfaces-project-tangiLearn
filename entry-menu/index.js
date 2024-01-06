const GAME_URL_MAPPER = {
    pipe: 'http://localhost:5174/',
    tower: 'http://localhost:5173/',
}

const API = "http://localhost:3000/api/monitoring/"


function checkGameStatus() {
    fetch(`${API}/current-game`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const gameName = data; // Supposons que l'API renvoie un champ 'gameName'
            if (!gameName) return;
            window.location.href = GAME_URL_MAPPER[gameName]; // Rediriger vers l'URL du jeu
        })
        .catch(error => console.error('Error checking game status:', error));
}


setInterval(checkGameStatus, 1000);
