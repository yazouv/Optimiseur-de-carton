let objets = [];

function convertirEnNombre(valeur) {
    // Remplacement des virgules par des points pour les valeurs décimales
    return parseFloat(valeur.replace(',', '.'));
}

function ajouterObjet() {
    const largeur = convertirEnNombre(document.getElementById('largeurObjet').value);
    const hauteur = convertirEnNombre(document.getElementById('hauteurObjet').value);
    const profondeur = convertirEnNombre(document.getElementById('profondeurObjet').value);

    if (largeur && hauteur && profondeur) {
        const nouvelObjet = { largeur, hauteur, profondeur };
        objets.push(nouvelObjet);
        mettreAJourListeObjets();
        reinitialiserChampsObjet();
        afficherResultats('Objet ajouté avec succès.', false);
    } else {
        afficherResultats('Veuillez entrer des dimensions valides pour l\'objet (utilisez des chiffres ou des virgules).', true);
    }
}

function reinitialiserChampsObjet() {
    document.getElementById('largeurObjet').value = '';
    document.getElementById('hauteurObjet').value = '';
    document.getElementById('profondeurObjet').value = '';
}

function mettreAJourListeObjets() {
    const listeObjets = document.getElementById('listeObjets');
    listeObjets.innerHTML = '';
    objets.forEach((obj, index) => {
        const item = document.createElement('li');
        item.classList.add('objet-item');
        item.innerHTML = `
            ${index + 1}. ${obj.largeur.toFixed(2)}x${obj.hauteur.toFixed(2)}x${obj.profondeur.toFixed(2)} 
            <button onclick="supprimerObjet(${index})">Supprimer</button>
        `;
        listeObjets.appendChild(item);
    });
}

function supprimerObjet(index) {
    objets.splice(index, 1);
    mettreAJourListeObjets();
    afficherResultats('Objet supprimé avec succès.', false);
}

function calculer() {
    const largeurCarton = convertirEnNombre(document.getElementById('largeurCarton').value);
    const hauteurCarton = convertirEnNombre(document.getElementById('hauteurCarton').value);
    const profondeurCarton = convertirEnNombre(document.getElementById('profondeurCarton').value);

    if (!largeurCarton || !hauteurCarton || !profondeurCarton) {
        afficherResultats('Veuillez entrer des dimensions valides pour le carton (utilisez des chiffres ou des virgules).', true);
        return;
    }

    if (objets.length === 0) {
        afficherResultats('Veuillez ajouter au moins un objet avant de calculer.', true);
        return;
    }

    let htmlResultats = '';
    let volumeTotalUtilise = 0;
    const volumeCarton = largeurCarton * hauteurCarton * profondeurCarton;

    objets.forEach((obj, index) => {
        const fitX = Math.floor(largeurCarton / obj.largeur);
        const fitY = Math.floor(hauteurCarton / obj.hauteur);
        const fitZ = Math.floor(profondeurCarton / obj.profondeur);
        const quantite = fitX * fitY * fitZ;
        const volumeObjet = obj.largeur * obj.hauteur * obj.profondeur * quantite;

        volumeTotalUtilise += volumeObjet;
        htmlResultats += `
            <div class="resultat-item">
                Objet ${index + 1} : ${obj.largeur.toFixed(2)}x${obj.hauteur.toFixed(2)}x${obj.profondeur.toFixed(2)} <br>
                Peut contenir : ${fitX} x ${fitY} x ${fitZ} = <b>${quantite}</b>
            </div>
        `;
    });

    const volumeRestant = volumeCarton - volumeTotalUtilise;
    htmlResultats += `
        <div class="resultat-item">
            <b>Volume total utilisé :</b> ${volumeTotalUtilise.toFixed(2)} cm³<br>
            <b>Volume restant :</b> ${volumeRestant.toFixed(2)} cm³
        </div>
    `;

    document.getElementById('contenuResultats').innerHTML = htmlResultats;
}

function afficherResultats(message, erreur = false) {
    const contenuResultats = document.getElementById('contenuResultats');
    contenuResultats.innerHTML = `<div style="color: ${erreur ? 'red' : 'green'};">${message}</div>`;
}
