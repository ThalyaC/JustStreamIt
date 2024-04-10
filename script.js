/* Pour démarrer le serveur, lancer l'environnement virtuel puis python manage.py runserver */
/*
function menuDeroulant(){
  const menuGenre = document.getElementById('choix1');
  const indexSelect = menuGenre.value;
  prompt='index sélectionné:'+ indexSelect;
}
*/

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
async function dataApi(filters){
  // requête sur l'API pour trouver le ou les films le(s) mieux classé(s)
  const apiEndpointClassement = "http://localhost:8000/api/v1/titles/"+filters;
  const responseClassement = await fetch(apiEndpointClassement);
  const dataClassement = await responseClassement.json();
  return dataClassement;
}


// Best Film
async function fetchClassementGeneral(){
  const dataClassement = await dataApi("?sort_by=-imdb_score");
  const dataClassBestFilm = dataClassement.results[0];
  // Consultation de la page du film
  let dataIdBestFilm = dataClassBestFilm.id;
  let dataBestFilm = await dataApi(dataIdBestFilm);
  
  let elementImagBestFilm = dataBestFilm.image_url;
  let elementTitreBestFilm = dataBestFilm.title;
  let elementResumBestFilm = dataBestFilm.description;

  let div = `
    <div class="image-best">
      <img src="${elementImagBestFilm}", alt="${elementTitreBestFilm}">
    </div>
    <div class="content">
      <h1>${elementTitreBestFilm}</h1>
      <p>${elementResumBestFilm}</p>
      <!-- Trigger/Open The Modal -->
      <button class="bouton">Détails</button>
        
      <!-- The Modal -->
      <div id="myModal" class="modal">

        <!-- Modal content -->
            
        <div class="modal-content">
          <div class="croix">x</div>
          <section class="box">

            <div>
              <h1 id="titre">The Big Lebowski</h1>
              <h2><span id="sortie">1998</span> - <span id="genre">Comedy, Crime, Sport</span><br>
              <span id="rated">PG-13</span> - <span id="duree">117 minutes</span><span id="paysOrigine"> (USA / UK)</span><br>
              <span id="scoreImdb">IMDB score: 8.1/10</span></h2><br>
              <h3>Réalisé par:</h3>
              <p id="realisateur">Joel Cohen, Ethan Cohen</p>
            </div>
            <img class="image-resp1" src="images/biglebo.png", alt="Affiche de The big Lebowski">
          </section>
                
          <p class="resume">When "the dude" Lebowski is mistaken for a millionaire Lebowski, two thugs urinate on his rug to coerce him into paying a debt he knows nothing about. While attempting to gain recompense for the ruined rug from his wealthy counterpart, he accepts a one-time job with high pay-off. He enlists the help of his bowling buddy, Walter, a gun-toting Jewish-convert with anger issues. Deception leads to more trouble, and it soon seems that everyone from porn empire tycoons to nihilists want something from The Dude.</p>
          <img class="image-resp2" src="images/biglebo.png", alt="Affiche de The big Lebowski">
          <h3>Avec :</h3>
          <p class="acteurs">David Huddleston, Flea, Jack Kehler, Jeff Bridges, Jimmie Dale Gilmore, John Goodman, John Turturro, Julianne Moore, Mark Pellegrino, Peter Stormare, Philip Moon, Philip Seymour Hoffman, Steve Buscemi, Tara Reid, Torsten Voges</p>
          <button class="bouton pos">Fermer</button>
        </div>
      </div>
    </div>
    `;
  let body = document.querySelector(".best-film");
  body.innerHTML = div; 
/* 
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
  bestFilmImage.alt = bestFilmTitre.textContent;*/
  let bestFilmBouton = document.querySelector(".content button.bouton");
  popup(bestFilmBouton);
}

async function fetchClassementGenreSuit(apiEndpointGenreSuit){
  let responseGenreSuit = await fetch(apiEndpointGenreSuit);
  let dataGenreTotalSuit = await responseGenreSuit.json();  
  dataGenreTotalSuit.results[0];
}

async function fetchClassementGenre(genre, cat){
  let apiEndpointGenre = "http://localhost:8000/api/v1/titles/?genre="+genre+"&sort_by=-imdb_score";
  let responseGenre = await fetch(apiEndpointGenre);
  let dataGenreTotal = await responseGenre.json();
  let dataGenreNbre = (dataGenreTotal.results).length;
  const nombreFilms = 6;
  
  let dataListGenre = [];
  //let nombreFilms = 6;
  if (dataGenreNbre < 5){
      for(let i=0; i<dataGenreNbre; i++){
        let dataFilmGenre = dataGenreTotal.results[i];
        dataListGenre.push(dataFilmGenre);
      }
      displayFilm(dataGenreNbre, dataListGenre, cat);
    }
  else {
    for(let i=0; i<5; i++){
      let dataFilmGenre = dataGenreTotal.results[i];
      dataListGenre.push(dataFilmGenre);
    }
    let apiEndpointGenreSuit = dataGenreTotal.next;
    let responseGenreSuit = await fetch(apiEndpointGenreSuit);
    let dataGenreTotalSuit = await responseGenreSuit.json();    
    let dataFilmGenreSuit = dataGenreTotalSuit.results[0];
    dataListGenre.push(dataFilmGenreSuit);
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
      i++;
    }
  }
}



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
