/* Pour démarrer le serveur, lancer l'environnement virtuel puis python manage.py runserver */

// Get the modal
function popup(btn){
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal   var btn = document.querySelector("bouton");

  // Get the <span> element that closes the modal
  var span = document.querySelector("bouton pos");

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//fonctions

// Best Film
async function fetchClassementGeneral(){
  // requête sur l'API pour trouver le film le mieux classé
  const apiEndpointClassement = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
  const responseClassement = await fetch(apiEndpointClassement);
  const dataClassement = await responseClassement.json();
  const dataClassBestFilm = dataClassement.results[0];
  // Consultation de la page du film
  let dataAdressBestFilm = dataClassBestFilm.url;
  let responseBestFilm = await fetch(dataAdressBestFilm);
  let dataBestFilm = await responseBestFilm.json();
  //titre
  let elementTitreBestFilm = dataBestFilm.title;
  let bestFilmTitre = document.querySelector(".content h1");
  bestFilmTitre.textContent = elementTitreBestFilm;
  //Description
  let elementResumBestFilm = dataBestFilm.description;
  let bestFilmResum = document.querySelector(".content p");
  bestFilmResum.textContent = elementResumBestFilm;
  // Image
  let elementImagBestFilm = dataBestFilm.image_url;
  let bestFilmImage = document.querySelector(".image-best img");
  bestFilmImage.src = elementImagBestFilm;
  bestFilmImage.alt = bestFilmTitre.textContent;
  let bestFilmBouton = document.querySelector(".content button.bouton");
  popup(bestFilmBouton);
}

async function fetchClassementGenreSuit(apiEndpointGenreSuit){
  let responseGenreSuit = await fetch(apiEndpointGenreSuit);
  let dataGenreTotalSuit = await responseGenreSuit.json();  
  /*for(let k=0; k<j; k++){*/
  dataGenreTotalSuit.results[0];
    //dataListGenre.push(dataFilmGenreSuit);
  
}

async function fetchClassementGenre(genre, cat){
  let apiEndpointGenre = "http://localhost:8000/api/v1/titles/?genre="+genre+"&sort_by=-imdb_score";
  let responseGenre = await fetch(apiEndpointGenre);
  let dataGenreTotal = await responseGenre.json();
  let dataGenreNbre = (dataGenreTotal.results).length;
  let dataListGenre = [];
  let nombreFilms = 6;

  if(dataGenreNbre = 5){
    for(let i=0; i<nombreFilms; i++){
      let dataFilmGenre = dataGenreTotal.results[i];
      dataListGenre.push(dataFilmGenre);
      let apiEndpointGenreSuit = dataGenreTotal.next;
      let responseGenreSuit = await fetch(apiEndpointGenreSuit);
      let dataGenreTotalSuit = await responseGenreSuit.json();    
      let dataFilmGenreSuit = dataGenreTotalSuit.results[0];
      dataListGenre.push(dataFilmGenreSuit);
      }
    displayFilm(nombreFilms, dataListGenre, cat);
  }
  if (dataGenreNbre < 5){
    for(let i=0; i<dataGenreNbre; i++){
      let dataFilmGenre = dataGenreTotal.results[i];
      dataListGenre.push(dataFilmGenre);
    }
    displayFilm(dataGenreNbre, dataListGenre, cat);
  }
}

function displayFilm(nombreFilms, dataList,cat){
  let i=0;
  while (i < nombreFilms) {
    //console.log(i);
    let emplacementDomTitre = "#cat"+cat+"-"+i+" .bandeau h2";
    //console.log(emplacementDomTitre);
    let emplacementDomImag = "#cat"+cat+"-"+i+ " img";
    let film = dataList[i];
    let elementTitreFilm = film.title;
    //console.log(elementTitreFilm);
    let titreFilm = document.querySelector(emplacementDomTitre);
    //console.log(titreFilm);
    titreFilm.textContent = elementTitreFilm;
    let elementImagFilm = film.image_url;
    let imagFilm = document.querySelector(emplacementDomImag);
    imagFilm.src = elementImagFilm;
    imagFilm.alt = titreFilm.textContent;
    i++
  }
}

// _________

//BEST FILM
fetchClassementGeneral();


// LES CATEGORIES

// 1,2,3

fetchClassementGenre("Mystery", 1);
fetchClassementGenre("Fantasy", 2);
fetchClassementGenre("Sci-Fi", 3);

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
