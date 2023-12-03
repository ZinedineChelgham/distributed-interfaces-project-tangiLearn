// new_game.js
import React, { useState } from 'react';
import GameBoard from '../components/gameboard.js';
import EyeIcon from "../components/eyeIcon";
import styles from './new_game.css';

const NewGame = () => {
    const [selectedValues, setSelectedValues] = useState(Array(12).fill(''));
    const [gameId, setGameId] = useState('');
    const handleInputChange = (index, value) => {
        const newValues = [...selectedValues];
        newValues[index] = value;
        setSelectedValues(newValues);
    };
    const generateGameId = () => {
        const { v4: uuidv4 } = require('uuid');
        return uuidv4();
    };

    const handleStartGame = () => {
        // Vérifiez que tous les champs sont remplis
        if (selectedValues.every(value => value.trim() !== '')) {
            // Si la validation réussit, générez l'ID de partie (à ajuster selon votre logique)
            const generatedGameId = generateGameId();
            setGameId(generatedGameId);

            // Envoyez les données au backend
            sendGameDataToBackend({
                selectedValues: selectedValues,
                gameId: generatedGameId
            }).then(r => console.log(r));

            console.log('Données envoyées avec succès!');
        } else {
            console.log('Veuillez remplir tous les champs.');
        }
    };
    const sendGameDataToBackend = async (data) => {
        try {
            const response = await fetch(`/api/tower-game/start-game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Réponse du backend :', responseData);
            } else {
                console.error('Erreur lors de la requête au backend :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend :', error);
        }
    };

    return (
        <div>
            {/* Section d'inputs au-dessus */}
            <div className={styles.GridContainer}>
                {selectedValues.slice(0, 3).map((value, index) => (
                    <input
                        key={index}
                        type="number"
                        placeholder={`Index ${index}`}
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>

            {/* Section d'inputs à droite et jeu au centre */}
            <div className={`${styles.GridContainer}`}>
                {/* Colonne d'inputs à droite */}
                <div className={`${styles.ColumnContainer}`} right>
                    {selectedValues.slice(3, 6).map((value, index) => (
                        <input
                            key={index + 3}
                            type="number"
                            placeholder={`Index ${index + 3}`}
                            value={value}
                            onChange={(e) => handleInputChange(index + 3, e.target.value)}
                        />
                    ))}
                </div>


                {/* Section d'inputs en bas */}
                <div className={styles.GridContainer}>
                    {selectedValues.slice(6, 9).map((value, index) => (
                        <input
                            key={index + 6}
                            type="number"
                            placeholder={`Index ${index + 6}`}
                            value={value}
                            onChange={(e) => handleInputChange(index + 6, e.target.value)}
                        />
                    ))}
                </div>

                {/* Colonne d'inputs à gauche */}
                <div className={`${styles.ColumnContainer}`} left>
                    {selectedValues.slice(9, 12).map((value, index) => (
                        <input
                            key={index + 9}
                            type="text"
                            placeholder={`Index ${index + 9}`}
                            value={value}
                            onChange={(e) => handleInputChange(index + 9, e.target.value)}
                        />
                    ))}
                </div>
            </div>



            {/* Bouton pour commencer le jeu */}
            <button onClick={handleStartGame}>Commencer le jeu</button>
            {/* Grille de jeu */}
            <GameBoard />
            {/* Autres composants */}
            {/*<EyeIcon direction="left" />
            <EyeIcon direction="right" />
            <EyeIcon direction="top" />
            <EyeIcon direction="bottom" />
            */}
        </div>
    );
}

export default NewGame;
