'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
const levelsPlayer = ['Facile', 'Normale', 'Difficile'];
const difficult = document.querySelector('#difficult');
const formChoiceLevel = document.querySelector('#choice-level');
const containerDifficult = document.querySelector('.container-difficult');
const containerGameState = document.querySelector('.container-game-state');
const blockPvPlayer = document.querySelector('.pv-player');
const blockPvDragon = document.querySelector('.pv-dragon');
const btnInitiative = document.querySelector('.button-initiative');
const scorePlayerIn = document.querySelector('.initiative-score-player');
const scoreDragonIn = document.querySelector('.initiative-score-dragon');


let pvPlayer = 100;
let pvDragon = 100;
let scoreInitiativePlayer = 0;
let scoreInitiativeDragon = 0;
let dammage = 0;

let currentConfigLevel = null
let levelPlayer = null;

const configLevel = (pv = null, numberDiceFace = null, numberOfThrows = null) => {
    return {
        pv : pv,
        bonus : {
            numberDiceFace: numberDiceFace,
            numberOfThrows: numberOfThrows
        }
    }
};

const getRandomInt = (numberDiceFace) => {
    let min = Math.ceil(1);
    let max = Math.floor(numberDiceFace);
    return Math.floor(Math.random() * (max - min)) + min;
}


const diceRoll = (numberDiceFace, numberOfThrows) => {
    let i = 0;
    let result = 0;
    while(i < numberOfThrows) {
        result += getRandomInt(numberDiceFace);
        i++;
    }
    return result;
}

const configLevels = {
    'facile': {
        player : configLevel(100, 10, 10),
        dragon : configLevel(100, 10, 5),
    },
    'normale': {
        player : configLevel(100, 10, 10),
        dragon : configLevel(100, 10, 10),
    },
    'difficile': {
        player : configLevel(100, 10, 7),
        dragon : configLevel(100, 10, 10),
    },
}



let htmlFormChoice = '';
//Créer les bouton et inséerer dans le formulaire
levelsPlayer.forEach((element, index) => {
    htmlFormChoice += `<button class="button button-level" data-id="${index}">${element}</button>`;
    // let levelButton = document.createElement('button');
    // // Ajouter une class au bouton
    // levelButton.classList.add('level-button');
    // // insérer dans la page, le nom de la value de levelsPlayer au bouton
    // levelButton.innerText = element;
    // // mettre un id au bouton qui est egale a l'index du tableau
    // levelButton.dataset.id = index;


     // formChoiceLevel.appendChild(levelButton);
})

formChoiceLevel.innerHTML = htmlFormChoice;

// Récuperer les boutons
const levelButtons = document.querySelectorAll('.button-level');

//Récuperer la value l'event des bouton (facile, moyen ou difficile)
levelButtons.forEach((element, index) => {
    //ajouter un evenement "click" sur la variable element
    element.addEventListener('click', () => {
        // le bouton selectionner correspond a l'index du tableau levelsPlayer
        levelPlayer = levelsPlayer[index];

        // difficulte = h2 #dificulte
        // ajout de text dans h2
        // le text ajouter est le niveau choisi
        difficult.innerText = levelPlayer;
        currentConfigLevel = configLevels[levelPlayer.toLowerCase()];

        containerDifficult.style.display = 'none';
        containerGameState.style.display = 'initial';
        pvPlayer += diceRoll(currentConfigLevel.player.bonus.numberDiceFace, currentConfigLevel.player.bonus.numberOfThrows);
        pvDragon += diceRoll(currentConfigLevel.dragon.bonus.numberDiceFace, currentConfigLevel.dragon.bonus.numberOfThrows);
        blockPvPlayer.innerText = `${pvPlayer} PV`;
        blockPvDragon.innerText = `${pvDragon} PV`;
    })
});

    btnInitiative.addEventListener('click', () => {
        scoreInitiativePlayer = diceRoll(6, 10);
        scoreInitiativeDragon = diceRoll(6, 10);

        scorePlayerIn.innerText = `${scoreInitiativePlayer} Points`;
        scoreDragonIn.innerText = `${scoreInitiativeDragon} Points`;

        setTimeout(() => {
            dammage = diceRoll(6, 3);

            if (scoreInitiativePlayer > scoreInitiativeDragon) {
                pvDragon -= dammage;
                blockPvDragon.innerText = pvDragon
            } else {
                pvPlayer -= dammage
                blockPvPlayer.innerText = pvPlayer
            }
        }, 2000);
    });


/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/




/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
