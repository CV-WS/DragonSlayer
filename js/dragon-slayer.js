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
const player = document.querySelector('#player');
const dragon = document.querySelector('#dragon');
const btnAttack = document.querySelector('.button-attack');
const containerRound = document.querySelector('.container-round');
const imageRound = document.querySelector('#image-round');
const roundMessage = document.querySelector('.round-message');
const buttonNext = document.querySelector('.button-next');
const finish = document.querySelector('.container-end-game');
const imageWinner = document.querySelector('.image-winner');
const messageWinner = document.querySelector('.message-winner');
const numberRound = document.querySelector('.number-round');


let pvPlayer = 100;
let pvDragon = 100;
let scoreInitiativePlayer = 0;
let scoreInitiativeDragon = 0;
let damage = 0;
let curentRound = 0;

let currentConfigLevel = null
let levelPlayer = null;

let isInitiative = true;

const messageRound = (value) => {
    return {
        dragon: `Le dragon prend l'initiative, vous attaque et vous inflige ${value} points de dommage !`,
        player: `Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ${value} points de dommage !`
    }
}

const messageWin = () => {
    return {
        dragon: `Vous avez perdu le combat, le dragon vous a carbonisé !`,
        player: `Vous avez gagné ! Le lézard a été découper !`
    }
}

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
    htmlFormChoice += `<button class="button button-level scalable button-parchemin" data-id="${index}">${element}</button>`;
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

        if (isInitiative) {
            curentRound++;
            scoreInitiativePlayer = diceRoll(6, 10);
            scoreInitiativeDragon = diceRoll(6, 10);
            btnInitiative.classList.remove('scalable');
            btnInitiative.disabled = true;
            btnInitiative.style.cursor = 'not-allowed';

            scorePlayerIn.innerText = `${scoreInitiativePlayer} Points`;
            scoreDragonIn.innerText = `${scoreInitiativeDragon} Points`;
            damage = diceRoll(6, 3);

            if (scoreInitiativePlayer > scoreInitiativeDragon) {
                player.style.transform = 'scale(1.3)';
                btnAttack.classList.add('scalable');
                btnAttack.disabled = false;
            } else {
                numberRound.innerText = `Tour n°${curentRound}`
                imageRound.src = 'images/dragon-winner.png'
                dragon.style.transform = 'scale(1.3)';
                containerGameState.style.display = 'none';
                containerRound.style.display = 'initial';
                roundMessage.innerText = messageRound(damage).dragon;
                pvPlayer -= damage
                if (pvPlayer <= 0) {
                    containerRound.style.display = 'none';
                    finish.style.display = 'initial';
                    imageWinner.src = 'images/dragon-winner.png';
                    messageWinner.innerText = messageWin().dragon;
                }
                blockPvPlayer.innerText = pvPlayer
            }
        }



        isInitiative = false;
    });

btnAttack.addEventListener('click', () => {
    if (!btnAttack.disabled) {
        numberRound.innerText = `Tour n°${curentRound}`
    containerGameState.style.display = 'none';
    containerRound.style.display = 'initial';
        imageRound.src = 'images/knight-winner.png'
        roundMessage.innerText = messageRound(damage).player;
        pvDragon -= damage;
        if (pvDragon <= 0) {
            containerRound.style.display = 'none';
            finish.style.display = 'initial';
            imageWinner.src = 'images/knight-winner.png'
            messageWinner.innerText = messageWin().player;
        }
        blockPvDragon.innerText = pvDragon

    }
})

buttonNext.addEventListener('click', () => {
    containerRound.style.display = 'none';
    containerGameState.style.display = 'initial';
    btnInitiative.classList.add('scalable');
    btnInitiative.disabled = false;
    btnInitiative.style.cursor = 'pointer';
    btnAttack.disabled = true;
    isInitiative = true;
})




/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/




/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
