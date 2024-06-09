/* Pour démarrer le serveur, lancer l'environnement virtuel puis python manage.py runserver */


// Get the modal
function popup(btn, modal, croix, close){
 
  // When the user clicks on <span> (x), close the modal
  croix.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks on <span> (x), close the modal
  close.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// requête sur l'API pour trouver le ou les films le(s) mieux classé(s)
async function dataApi(filters){
  const apiEndpointClassement = "http://localhost:8000/api/v1/titles/"+filters;
  const responseClassement = await fetch(apiEndpointClassement);
  const dataClassement = await responseClassement.json();
  return dataClassement;
}


// Récupération des données de l'API pour un film donné
async function element(dataIdFilm){
  let dataFilm = await dataApi(dataIdFilm);
  let elementIdFilm = dataFilm.id;
  let elementImagFilm = dataFilm.image_url;
  let elementTitreFilm = dataFilm.title;
  let elementResumFilm = dataFilm.description;
  let elementYearFilm = dataFilm.year;
  let elementGenresFilm = dataFilm.genres;
  let elementRatedFilm = dataFilm.rated;
  let elementDurationFilm = dataFilm.duration;
  let elementCountriesFilm = dataFilm.countries;
  let elementImdbFilm = dataFilm.imdb_score;
  let elementDirectorsFilm = dataFilm.directors;
  let elementActorsFilm = dataFilm.actors;

  return [elementIdFilm, elementImagFilm, elementTitreFilm, elementResumFilm, elementYearFilm, elementGenresFilm, elementRatedFilm, elementDurationFilm, elementCountriesFilm, elementImdbFilm, elementDirectorsFilm, elementActorsFilm]
}


//Création du contenu de la popup
function contentPopup(elementIdFilm, elementTitre, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementImag, elementResum, elementActors){
  let divPopup = `
      <!-- Modal content -->     
      <div class="modal-content" id="content${elementIdFilm}">
        <div class="croix" id="croix${elementIdFilm}">x</div>
        <section class="box">

          <div>
            <h1>${elementTitre}</h1>
            <h2><span>${elementYear}</span> - <span>${elementGenres}</span><br>
            <span>${elementRated}</span> - <span>${elementDuration} minutes</span><span> (${elementCountries})</span><br>
            <span>IMDB score: ${elementImdb}/10</span></h2><br>
            <h3>Réalisé par:</h3>
            <p>${elementDirectors}</p>
          </div>
          <img class="image-resp1" src="${elementImag}", alt="${elementTitre}">
        </section>
              
        <p class="resume">${elementResum}</p>
        <img class="image-resp2" src="${elementImag}", alt="${elementTitre}">
        <h3>Avec :</h3>
        <p class="acteurs">${elementActors}</p>
        <button class="bouton pos close" id="close${elementIdFilm}">Fermer</button>
      </div>
    </div>
    `
    return(divPopup)
}


// Section : Meilleur film
async function fetchClassementGeneral(){
  
  const dataClassement = await dataApi("?sort_by=-imdb_score");
  const dataClassBestFilm = dataClassement.results[0];

  // Consultation de la page du film
  let dataIdBestFilm = dataClassBestFilm.id;

  // Récupération des données
  let [elementId, elementImag, elementTitre, elementResum, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementActors] = await element(dataIdBestFilm);
  
  // Interpolation
  // 1) Création du code. ` = s'appelle backtiks
  let div = `
    <div class="image-best">
      <img src="${elementImag}", alt="${elementTitre}">
    </div>
    <div class="content">
      <h1>${elementTitre}</h1>
      <p>${elementResum}</p>
      <!-- Trigger/Open The Modal (trigger = déclenchement)-->
      <button class="bouton" id="btn-open${elementId}">Détails</button>
        
      <!-- The Modal -->
      <div id="myModal${elementId}" class="modal">
    `;
  
  // 2) Insertion du code dans la page html
  let popUp = contentPopup(elementId, elementTitre, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementImag, elementResum, elementActors);
  let html = div + popUp;
  let bestFilm = document.querySelector(".best-film");
  bestFilm.innerHTML = html;
  
  // Pour ouvrir la popup ().content button.bouton
  let filmBtnOpen = document.querySelector("#btn-open"+elementId);
  let filmCross = document.querySelector("#croix"+elementId);
  let filmModal = document.querySelector("#myModal"+elementId);
  let filmBtnClose = document.querySelector("#close"+elementId);
  popup(filmBtnOpen, filmModal, filmCross, filmBtnClose);
}


//Pour les catégories : recherche du sixième film sur la page 2 de l'API
async function fetchClassementGenreSuit(apiEndpointGenreSuit){
  let responseGenreSuit = await fetch(apiEndpointGenreSuit);
  let dataGenreTotalSuit = await responseGenreSuit.json();  
  dataGenreTotalSuit.results[0];
}


// Pour les catégories : recherche des 6 films classés par genre - cat = position de la catégorie sur la page html
async function fetchClassementGenre(genre, cat){
  let filters = "?genre="+genre+"&sort_by=-imdb_score";
  let dataGenreTotal = await dataApi(filters);
  let dataGenreNbre = (dataGenreTotal.results).length;
  const nombreFilms = 6;
  
  let dataListGenre = [];
  if (dataGenreNbre < 5){
      for(let i=0; i<dataGenreNbre; i++){
        let dataFilmGenre = dataGenreTotal.results[i];
        let dataFilmGenreId = dataFilmGenre.id;
        let filmdetail = await element(dataFilmGenreId);
        dataListGenre.push(filmdetail);
      }
      displayFilm(dataGenreNbre, dataListGenre, cat);
      
    }
  else {
    for(let i=0; i<5; i++){
      let dataFilmGenre = dataGenreTotal.results[i];
      let dataFilmGenreId = dataFilmGenre.id;
      let filmdetail = await element(dataFilmGenreId);
      dataListGenre.push(filmdetail);
    }
    let filtersPage2 = "?genre="+genre+"&page=2&sort_by=-imdb_score";
    let dataGenreTotalSuit = await dataApi(filtersPage2);    
    let dataFilmGenreSuit = dataGenreTotalSuit.results[0];
    let dataFilmGenreSuitId = dataFilmGenreSuit.id;
    let filmdetailSuit = await element(dataFilmGenreSuitId);
    dataListGenre.push(filmdetailSuit);
    }
  displayFilm(nombreFilms, dataListGenre, cat);
}


// Affichage des films + données de l'API sur le site
function displayFilm(nombreFilms, dataList,cat){
  if (nombreFilms !== dataList.length){
    let nbreFilmsmanquants = nombreFilms-dataList.length;
    let j=nbreFilmsmanquants-2;
    while (j < nombreFilms){
      let idResearch = "cat"+cat+"-"+j;
      let divMask = document.getElementById(idResearch);
      divMask.remove();
      j++;
    }
  }
  else{
    let i=0;
    while (i < nombreFilms) {
      let codeCategory = "cat"+cat+"-"+i;
      let emplacementDomTitre = "#"+codeCategory+" .bandeau h2";
      let emplacementDomImag = "#"+codeCategory+" img";
      let [elementId, elementImag, elementTitre, elementResum, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementActors] = dataList[i];
      let titreFilm = document.querySelector(emplacementDomTitre);
      titreFilm.textContent = elementTitre;
      let imagFilm = document.querySelector(emplacementDomImag);
      imagFilm.src = elementImag;
      imagFilm.alt = titreFilm.textContent;
      
      let catbutton = "#cat"+cat+"-"+i+" button.bouton"
      let anchorButton = document.querySelector(catbutton);
      anchorButton.id = "btn-open"+elementId;
      let idModalFilm = "myModal"+codeCategory;
      let insertModalPart1 = `<div id=${idModalFilm} class="modal">`
      let popUp = contentPopup(elementId, elementTitre, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementImag, elementResum, elementActors);
      let insertModal = insertModalPart1 + popUp + `</div>`;
      anchorButton.insertAdjacentHTML("afterend", insertModal);

      let filmBtnOpen = document.querySelector("#btn-open"+elementId);
      let filmCross = document.querySelector("#croix"+elementId);
      let filmModal = document.querySelector("#"+idModalFilm);
      let filmBtnClose = document.querySelector("#close"+elementId);
      popup(filmBtnOpen, filmModal, filmCross, filmBtnClose);
      i++;
    }
  }
}


// Pour les catégories 4 et 5 (menus déroulants)
// 1. Création du html
function creaCat4or5(cat){
  let newSectionCat = `
  
    <div class="film4-5" id="cat${cat}-0">
        
      <div class="bandeau">
          <h2></h2>
          <button class="bouton">Détails</button>
      </div>
      
      <img>
    </div>
    
    <div class="film4-5" id="cat${cat}-1">
        
      <div class="bandeau">
          <h2></h2>
          <button class="bouton">Détails</button>
      </div>
      
      <img>
    </div>

    <div class="film4-5" id="cat${cat}-2">
        
      <div class="bandeau">
          <h2></h2>
          <button class="bouton">Détails</button>
      </div>
      
      <img>
    </div>

    <div class="film4-5" id="cat${cat}-3">
        
      <div class="bandeau">
          <h2></h2>
          <button class="bouton">Détails</button>
      </div>
      
      <img>
    </div>

    <div class="film4-5" id="cat${cat}-4">
        
      <div class="bandeau">
          <h2></h2>
          <button class="bouton">Détails</button>
      </div>
      
      <img>
    </div>

    <div class="film4-5" id="cat${cat}-5">
        
      <div class="bandeau">
          <h2></h2>
          <button class="bouton">Détails</button>
      </div>
      
      <img>
    </div>
  </section>
  <button class="suite bouton pos" id="s${cat}" onclick="toggleImages(${cat})">Voir plus</button>;
  `
  return (newSectionCat)
}

// 2. Raccordement au menu déroulant
document.addEventListener("DOMContentLoaded", function() {
  const menuDeroulant = document.getElementById("choix1");
  const conteneurFlex = document.getElementById("category4");
  // Écouteur d'événement pour le changement d'option
  menuDeroulant.addEventListener("change", function() {
      const optionSelectionnee = menuDeroulant.value;
      console.log(optionSelectionnee);
      let contentDiv4 = creaCat4or5(4);
      conteneurFlex.innerHTML = contentDiv4;
      fetchClassementGenre(optionSelectionnee, 4);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const menuDeroulant = document.getElementById("choix2");
  const conteneurFlex = document.getElementById("category5");
  // Écouteur d'événement pour le changement d'option
  menuDeroulant.addEventListener("change", function() {
      const optionSelectionnee = menuDeroulant.value;
      console.log(optionSelectionnee);
      let contentDiv5 = creaCat4or5(5);
      conteneurFlex.innerHTML = contentDiv5;
      fetchClassementGenre(optionSelectionnee, 5);
  });
});
/*
close.onclick = function() {
  modal.style.display = "none";
}
*/

// Bouton plus ou moins

let imagesVisibles = false;

function toggleImages(cat) {
  let image1 = document.getElementById('cat'+cat+'-4');
  let image2 = document.getElementById('cat'+cat+'-5');
  let button = document.getElementById('s'+cat);

  if (imagesVisibles) {
      image1.style.display = "none";
      image2.style.display = "none";
      button.textContent = "Afficher plus";
      imagesVisibles = false;
  } else {
      image1.style.display = "block";
      image2.style.display = "block";
      button.textContent = "Afficher moins";
      imagesVisibles = true;
  }
}

//BEST FILM
fetchClassementGeneral();


// LES CATEGORIES

// 1,2,3

fetchClassementGenre("Mystery", 1);
fetchClassementGenre("Fantasy", 2);
fetchClassementGenre("Sci-Fi", 3);

