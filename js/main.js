var user = {
    score: 0,
    choice: 0
};

var comp = {
    score: 0,
    choice: 0
};

var button = {
    userRock: document.getElementById('userRock'),
    userPaper: document.getElementById('userPaper'),
    userScissors: document.getElementById('userScissors'),
    userChoice: document.getElementById('userChoice'),
    compChoice: document.getElementById('compChoice'),
    victStatus: document.getElementById('victStatus')
};

var text = {
    userScore: document.getElementById('userScore'),
    compScore: document.getElementById('compScore'),
    nbMancheMax: document.getElementById('nbManche'),
    nbEgalite: document.getElementById('nbEgalites')
}

var partie = {
    manche: 0,
    nbMancheMax: 10
}

var gagnant;
var egalite = 0;

button.userRock.addEventListener("click", appuiSurPierre);
button.userPaper.addEventListener("click", appuiSurFeuille);
button.userScissors.addEventListener("click", appuiSurCiseaux);


text.nbMancheMax.textContent=partie.manche+'/'+partie.nbMancheMax;
document.getElementById('endDialog').style.visibility= 'hidden';

function randomComp() {
    return Math.floor(3*Math.random());
}

function changementImg() { // Change l'image
    if (user.choice == 0) { // Utilisateur
        button.userChoice.setAttribute('src', 'medias/rock.png'); // Pierre
    } else if (user.choice == 1) {
        button.userChoice.setAttribute('src', 'medias/paper.png'); // Feuille
    } else {
        button.userChoice.setAttribute('src', 'medias/scissors.png'); // Ciseaux
    }

    if (comp.choice == 0) { // Ordinateur
        button.compChoice.setAttribute('src', 'medias/rock.png'); // Pierre
    } else if (comp.choice == 1) {
        button.compChoice.setAttribute('src', 'medias/paper.png'); // Feuille
    } else {
        button.compChoice.setAttribute('src', 'medias/scissors.png'); // Ciseaux
    }

    if (gagnant == 'U') {
        button.victStatus.setAttribute('src', 'medias/check.png'); // Victoire
    } else if (gagnant == 'O') {
        button.victStatus.setAttribute('src', 'medias/uncheck.png'); // Défaite
    } else {
        button.victStatus.setAttribute('src', 'medias/equal.png'); // Égalité
    }

}

function verifManche() { // vérifie si la partie est finie, et affiche une boîte si oui
    if (partie.manche+1 > partie.nbMancheMax) {
        document.getElementById('choice').style.display= 'none';
        document.getElementById('endDialog').style.visibility= 'visible';
        if (user.score > comp.score) {
            document.getElementById('endTxt').textContent='Gagné!';
        } else if (user.score < comp.score) {
            document.getElementById('endTxt').textContent='Perdu!'   
        } else {
            document.getElementById('endTxt').textContent='Égalité!'
        }
    }

}

function majScoreManche() { // met à jour le score et les manches à l'écran
    partie.manche++;
    if (gagnant == 'O') {
        comp.score++;
    } else if (gagnant == 'U') {
        user.score++;
    } else {
        egalite++;
    }
    text.userScore.textContent=user.score;
    text.compScore.textContent=comp.score;
    text.nbMancheMax.textContent=partie.manche+'/'+partie.nbMancheMax;
    text.nbEgalite.textContent=egalite;
}

function verif() {
    if (user.choice == 0 && comp.choice == 1 || user.choice == 1 && comp.choice == 2 || user.choice == 2 && comp.choice == 0) {
        return 'O';   
    } else if (user.choice == 1 && comp.choice == 0 || user.choice == 2 && comp.choice == 1 || user.choice == 0 && comp.choice == 2) {
        return 'U';
    } else {
        return 'E';
    }
}

function appuiSurPierre() {
    user.choice = 0;
    comp.choice = randomComp();
    gagnant = verif();
    changementImg();
    majScoreManche();
    verifManche();

}

function appuiSurFeuille() {
    user.choice = 1;
    comp.choice = randomComp();
    gagnant = verif();
    changementImg();
    majScoreManche();
    verifManche();

}

function appuiSurCiseaux() {
    user.choice = 2;
    comp.choice = randomComp();
    gagnant = verif();
    changementImg();
    majScoreManche();
    verifManche();

}   