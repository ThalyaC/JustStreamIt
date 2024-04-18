/* Pour démarrer le serveur, lancer l'environnement virtuel puis python manage.py runserver */
/*
function menuDeroulant(){
  const menuGenre = document.getElementById('choix1');
  const indexSelect = menuGenre.value;
  prompt='index sélectionné:'+ indexSelect;
}
*/

// Get the modal
function popup(btn, modal, croix, close){
  //var modal = document.querySelector(`#${myModalUnique}`);
  //var modal = document.getElementById(myModalUnique);

  //var btn = document.querySelector("bouton");

  // Get the <span> element that closes the modal
  //var croix = document.querySelector(".croix");
  
  // When the user clicks on <span> (x), close the modal
  croix.onclick = function() {
    modal.style.display = "none";
  }

  //var close = document.querySelector(".close");
  
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


//fonctions
async function dataApi(filters){
  // requête sur l'API pour trouver le ou les films le(s) mieux classé(s)
  const apiEndpointClassement = "http://localhost:8000/api/v1/titles/"+filters;
  const responseClassement = await fetch(apiEndpointClassement);
  const dataClassement = await responseClassement.json();
  return dataClassement;
}

async function element(dataIdFilm){
  // Récupération des données de l'API
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

function contentPopup(elementIdFilm, elementTitre, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementImag, elementResum, elementActors){
  //Création du contenu de la popup
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

async function fetchClassementGeneral(){
  // Best Film
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
  //console.log(filmBtnOpen);
  let filmCross = document.querySelector("#croix"+elementId);
  //console.log(filmCross);
  let filmModal = document.querySelector("#myModal"+elementId);
  //console.log(filmModal);
  let filmBtnClose = document.querySelector("#close"+elementId);
  //console.log(filmBtnClose);
  popup(filmBtnOpen, filmModal, filmCross, filmBtnClose);
}

async function fetchClassementGenreSuit(apiEndpointGenreSuit){
  let responseGenreSuit = await fetch(apiEndpointGenreSuit);
  let dataGenreTotalSuit = await responseGenreSuit.json();  
  dataGenreTotalSuit.results[0];
}

async function fetchClassementGenre(genre, cat){
  let filters = "?genre="+genre+"&sort_by=-imdb_score";
  let dataGenreTotal = await dataApi(filters);
  let dataGenreNbre = (dataGenreTotal.results).length;
  const nombreFilms = 6;
  
  let dataListGenre = [];
  if (dataGenreNbre < 5){
      for(let i=0; i<dataGenreNbre; i++){
        let dataFilmGenre = dataGenreTotal.results[i];
        //essai
        let dataFilmGenreId = dataFilmGenre.id;
        //let filmdetail = await dataApi(dataFilmGenreId);
        let filmdetail = await element(dataFilmGenreId);
        //dataListGenre.push(dataFilmGenre);
        dataListGenre.push(filmdetail);
      }
      displayFilm(dataGenreNbre, dataListGenre, cat);
    }
  else {
    for(let i=0; i<5; i++){
      let dataFilmGenre = dataGenreTotal.results[i];
      //dataListGenre.push(dataFilmGenre);
      //essai
      let dataFilmGenreId = dataFilmGenre.id;
      //let filmdetail = await dataApi(dataFilmGenreId);
      let filmdetail = await element(dataFilmGenreId);
      dataListGenre.push(filmdetail);
    }
    //let apiEndpointGenreSuit = dataGenreTotal.next;
    let filtersPage2 = "?genre="+genre+"&page=2&sort_by=-imdb_score";
    //let responseGenreSuit = await fetch(apiEndpointGenreSuit);
    //let dataGenreTotalSuit = await responseGenreSuit.json();
    let dataGenreTotalSuit = await dataApi(filtersPage2);    
    let dataFilmGenreSuit = dataGenreTotalSuit.results[0];
    //essai
    let dataFilmGenreSuitId = dataFilmGenreSuit.id;
    //let filmdetailSuit = await dataApi(dataFilmGenreSuitId);
    let filmdetailSuit = await element(dataFilmGenreSuitId);
    //dataListGenre.push(dataFilmGenre);
    dataListGenre.push(filmdetailSuit);
    //dataListGenre.push(dataFilmGenreSuit);
    }
  displayFilm(nombreFilms, dataListGenre, cat);
}

function displayFilm(nombreFilms, dataList,cat){
  if (nombreFilms !== dataList.length){
    let nbreFilmsmanquants = nombreFilms-dataList.length;
    console.log(nbreFilmsmanquants);
    let j=nbreFilmsmanquants-2;
    console.log(j);
    while (j < nombreFilms){
      console.log(j);
      let idResearch = "cat"+cat+"-"+j;
      console.log(idResearch);
      let divMask = document.getElementById(idResearch);
      divMask.remove();
      j++;
    }
  }
  else{
    let i=0;
    while (i < nombreFilms) {
      //console.log(i);
      let codeCategory = "cat"+cat+"-"+i;
      let emplacementDomTitre = "#"+codeCategory+" .bandeau h2";
      //console.log(emplacementDomTitre);
      let emplacementDomImag = "#"+codeCategory+" img";
      //let film = dataList[i];
      let [elementId, elementImag, elementTitre, elementResum, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementActors] = dataList[i];
      //let elementTitreFilm = film.title;
      //console.log(elementTitreFilm);
      let titreFilm = document.querySelector(emplacementDomTitre);
      //console.log(titreFilm);
      titreFilm.textContent = elementTitre;
      //let elementImagFilm = film.image_url;
      let imagFilm = document.querySelector(emplacementDomImag);
      imagFilm.src = elementImag;
      imagFilm.alt = titreFilm.textContent;
      
      let catbutton = "#cat"+cat+"-"+i+" button.bouton"
      let anchorButton = document.querySelector(catbutton);
      console.log(anchorButton);
      anchorButton.id = "btn-open"+elementId;
      let idModalFilm = "myModal"+codeCategory;
      let insertModalPart1 = `<div id=${idModalFilm} class="modal">`
      let popUp = contentPopup(elementId, elementTitre, elementYear, elementGenres, elementRated, elementDuration, elementCountries, elementImdb, elementDirectors, elementImag, elementResum, elementActors);
      let insertModal = insertModalPart1 + popUp + `</div>`;
      anchorButton.insertAdjacentHTML("afterend", insertModal);
      /*
      // Pour ouvrir la popup
      let FilmBouton = document.querySelector(".content button.bouton");
      popup(FilmBouton, idModalFilm);*/
      //console.log(c1F1Bouton);
      // Pour ouvrir la popup ().content button.bouton
        // Pour ouvrir la popup ().content button.bouton
    let filmBtnOpen = document.querySelector("#btn-open"+elementId);
    console.log(filmBtnOpen);
    let filmCross = document.querySelector("#croix"+elementId);
    console.log(filmCross);
    let filmModal = document.querySelector("#"+idModalFilm);
    console.log(filmModal);
    let filmBtnClose = document.querySelector("#close"+elementId);
    console.log(filmBtnClose);
    popup(filmBtnOpen, filmModal, filmCross, filmBtnClose);
      i++;
    }
  }
}

/*function affectationModalFilm()*/

function creaCatAutre(){
  let newSection = document.createElement("section");
  let parentNewSection = document.querySelector("category-autre1");
  parentNewSection.appendChild(newSection);
}

// _________

//BEST FILM
fetchClassementGeneral();


// LES CATEGORIES

// 1,2,3

fetchClassementGenre("Mystery", 1);
fetchClassementGenre("Fantasy", 2);
fetchClassementGenre("Sci-Fi", 3);
function genre(){
  let menuGenre = document.getElementById("choix1");
  menuGenre.addEventListener("change", (event) =>{
    fetchClassementGenre(event.target.value, 4);
    creaCatAutre();

  })
}
genre();



/*
let c1F1Bouton = document.querySelector("#cat1-0 button.bouton a");
//console.log(c1F1Bouton);




//Film 2
let c1F2Bouton = document.querySelector("#cat1-1 button.bouton a");
//console.log(c1F2Bouton);

//Film 3
let c1F3Bouton = document.querySelector("#cat1-2 button.bouton a");
//console.log(c1F3Bouton);

//Film 4
let c1F4Bouton = document.querySelector("#cat1-3 button.bouton a");
//console.log(c1F4Bouton);

//Film 5
let c1F5Bouton = document.querySelector("#cat1-4 button.bouton a");
//console.log(c1F5Bouton);

//Film 6
let c1F6Bouton = document.querySelector("#cat1-5 button.bouton a");
//console.log(c1F6Bouton);

// Catégorie 2 : Fantasy



//Film 1


let c2F1Bouton = document.querySelector("#cat2-0 button.bouton a");
//console.log(c2F1Bouton);


//Film 2


let c2F2Bouton = document.querySelector("#cat2-1 button.bouton a");
//console.log(c2F2Bouton);


//Film 3


let c2F3Bouton = document.querySelector("#cat2-2 button.bouton a");
//console.log(c2F3Bouton);


//Film 4


let c2F4Bouton = document.querySelector("#cat2-3 button.bouton a");
//console.log(c1F4Bouton);


//Film 5


let c2F5Bouton = document.querySelector("#cat2-4 button.bouton a");
//console.log(c2F5Bouton);


//Film 6


let c2F6Bouton = document.querySelector("#cat2-5 button.bouton a");
//console.log(c2F6Bouton);

//category 3 ...*/