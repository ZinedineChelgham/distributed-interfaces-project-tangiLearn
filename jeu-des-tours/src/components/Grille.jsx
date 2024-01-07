import React, {useEffect, useState} from "react";
import Gameboard from "./gameboard.jsx";
import "./Grille.css";
import {ImageElementBis} from "./ImageElementBis.js";


const Grille = ({StateGame, Values}) => {
    const [checkboxesChecked, setCheckboxesChecked] = useState({
        top: false,
        bottom: false,
        left: false,
        right: false
    });
    const handleCheckboxChange = (position) => {
        const updatedCheckboxes = {
            ...checkboxesChecked,
        }
        setCheckboxesChecked(updatedCheckboxes);
        console.log("État des cases à cocher:", updatedCheckboxes);
        console.log("Valeurs des cases à cocher:", Object.values(updatedCheckboxes));
        if (Object.values(updatedCheckboxes).every(value => value)) {
            console.log("Toutes les cases sont cochées, envoi de la requête...");
            fetch('http://localhost:3000/api/monitoring/need-help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({needHelp: true})
            })
                .then(response => {
                    console.log("Réponse reçue:", response);
                    return response.json();
                })
                .then(data => console.log("Données reçues:", data))
                .catch(error => console.error('Erreur:', error));
        } else {
            console.log("Toutes les cases ne sont pas cochées.");
        }
    };
    useEffect(() => {
        const checkboxbottom = document.getElementById('checkboxbottom');
        const checkboxtop = document.getElementById('checkboxtop');
        const checkboxleft = document.getElementById('checkboxleft');
        const checkboxright = document.getElementById('checkboxright');
        const imgtop = new ImageElementBis('', '', '4vw', '10vh', 0, 1, './assets/pipe.png', `img-top`);
        const imgbottom = new ImageElementBis('', '', '4vw', '10vh', 0, 1, './assets/pipe.png', `img-bottom`);
        const imgleft = new ImageElementBis('', '', '4vw', '10vh', 0, 1, './assets/pipe.png', `img-left`);
        const imgright = new ImageElementBis('', '', '4vw', '10vh', 0, 1, './assets/pipe.png', `img-right`);
        imgtop.canMove(false, true);
        imgtop.domElem.get(0).style.opacity = "0";
        imgtop.addTo(checkboxtop);
        imgtop.onTouchCreation(() => {
            checkboxesChecked.top = true;
            console.log("tag créé");
          handleCheckboxChange('top')
            document.getElementById('inputtop').checked = true;
        });
        imgbottom.canMove(false, true);
        imgbottom.domElem.get(0).style.opacity = "0";
        imgbottom.addTo(checkboxbottom);
        imgbottom.onTouchCreation(() => {
            checkboxesChecked.bottom = true;
            console.log("tag créé");
            handleCheckboxChange('bottom')
            document.getElementById('inputbottom').checked = true;
        });
        imgleft.canMove(false, true);
        imgleft.domElem.get(0).style.opacity = "0";
        imgleft.addTo(checkboxleft);
        imgleft.onTouchCreation(() => {
            checkboxesChecked.left = true;
            console.log("tag créé");
            handleCheckboxChange('left')
            document.getElementById('inputleft').checked = true;
        });
        imgright.canMove(false, true);
        imgright.domElem.get(0).style.opacity = "0";
        imgright.addTo(checkboxright);
        imgright.onTouchCreation(() => {
            checkboxesChecked.right = true;
            console.log("tag créé");
            handleCheckboxChange('right')
            document.getElementById('inputright').checked = true;
        });
    }, []);
    // console.log("stateGame de la grille  : " + StateGame);
    return (

        <div id="jeu">
            <div id="checkboxtop">
            <input type="checkbox" id="inputtop"  className="checkbox" onChange={() => handleCheckboxChange('top')}/>
            </div>
            <div className="conteneur-numeros haut rotate-180">
                <div className="numero" id="case2">
                    {Values && Values[2]}
                </div>
                <div className="numero" id="case1">
                    {Values && Values[1]}
                </div>
                <div className="numero" id="case0">
                    {Values && Values[0]}
                </div>
            </div>
            <div id="checkboxleft">
            <input type="checkbox" id="inputleft" className="checkbox"
                   />
            </div>
            <div className="conteneur-lateral">
                <div className="conteneur-numeros gauche rotate-90">
                    <div className="numero" id="case11">
                        {Values && Values[11]}
                    </div>
                    <div className="numero" id="case10">
                        {Values && Values[10]}
                    </div>
                    <div className="numero" id="case9">
                        {Values && Values[9]}
                    </div>
                </div>
                <Gameboard stateGame={StateGame}/>
                <div className="conteneur-numeros droite rotate-moins-90">
                    <div className="numero" id="case5">
                        {Values && Values[5]}
                    </div>
                    <div className="numero" id="case4">
                        {Values && Values[4]}
                    </div>
                    <div className="numero" id="case3">
                        {Values && Values[3]}
                    </div>
                </div>
            </div>
            <div id="checkboxbottom">
            <input type="checkbox"  id="inputbottom" className="checkbox"
                   onChange={() => handleCheckboxChange('bottom')}/>
            </div>

            <div className="conteneur-numeros bas ">
                <div className="numero" id="case8">
                    {Values && Values[8]}
                </div>
                <div className="numero" id="case7">
                    {Values && Values[7]}
                </div>
                <div className="numero" id="case6">
                    {Values && Values[6]}
                </div>
            </div>
            <div id="checkboxright">
            <input type="checkbox"  id="inputright" className="checkbox"
                   onChange={() => handleCheckboxChange('right')}
                   />
            </div>
        </div>
    );
};

export default Grille;
