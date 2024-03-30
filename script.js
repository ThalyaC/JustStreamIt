
console.log("hello, World!")
/*
// Get the modal
var modal = Popup.getElementById("myModal");

// Get the button that opens the modal
var btn = Index.getElementById("Bouton");

// Get the <span> element that closes the modal
var span = Popup.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
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

///

fetch(" http://localhost:8000/api/v1/titles")
  .then((response)=>{
    return response.json();
  })
  .then((json)=>{
    console.log(json);
  });

///ou

GET /api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=


"/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains= HTTP/1.1

*/

// verification de la connexion au serveur
const response = fetch('http://localhost:8000/api/v1/titles');
console.log(response);

//fonctions

// Best Film
async function fetchClassementGeneral(){
  // requête sur l'API pour trouver le film le mieux classé
  const apiEndpointClassement = "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=";
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
}

// Category 1 : Mystery
/*async function fetchClassementMysterySuit(j, apiEndpointMysterySuit){
  const responseMysterySuit = await fetch(apiEndpointMysterySuit);
  const dataMysteryTotal = await responseMysterySuit.json();
  let dataListMysterySuite =[];
  for(let k=0; k<j; k++){
    const dataMysterySuit = dataMysteryTotal.results[k];
    //let dataAdressFilmMysterySuit = dataMysterySuit.url;
    dataListMysterySuite.push(dataMysterySuit);
  return dataListMysterySuite;
  }
}*/

async function fetchClassementMystery(){
  const apiEndpointMystery = "http://localhost:8000/api/v1/titles/?genre=Mystery&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
  const responseMystery = await fetch(apiEndpointMystery);
  const dataMysteryTotal = await responseMystery.json();
  const dataMysteryNbre = (dataMysteryTotal.results).length;
  console.log(dataMysteryNbre);
  let dataListMystery = [];
  let nombreFilms = 6;

  for(let i=0; i<nombreFilms; i++){
    if(nombreFilms <= dataMysteryNbre){
      const dataFilmMystery = dataMysteryTotal.results[i];
      //console.log(dataMystery)
      //let dataAdressFilmMystery = dataMystery.url;
      dataListMystery.push(dataFilmMystery); // changer le nom de datamystery pas assez clair
      console.log(dataListMystery.length);
      mystery(dataListMystery);
    }
    
    else{
      
      for(let i=0; i<dataMysteryNbre; i++){
        const dataFilmMystery = dataMysteryTotal.results[i];
        //console.log(dataMystery)
        //let dataAdressFilmMystery = dataMystery.url;
        dataListMystery.push(dataFilmMystery);
      }
      //for(let i=dataMysteryNbre; i<nombreFilms; i++){
      j=nombreFilms-dataListMystery.length;
      //let dataMysteryAjout = [];
      const apiEndpointMysterySuit = dataMysteryTotal.next;
      const responseMysterySuit = await fetch(apiEndpointMysterySuit);
      const dataMysteryTotalSuit = await responseMysterySuit.json();
      //let dataListMysterySuit =[];
      
      for(let k=0; k<j; k++){
        const dataMysterySuit = dataMysteryTotalSuit.results[k];
        //console.log(dataMysterySuit)
        //let dataFilmMysterySuit = dataMysterySuit.url;
        //dataListMysterySuite.push(dataFilmMysterySuit);
        //dataMysteryAjout = fetchClassementMysterySuit(j, apiEndpointMysterySuit);
        dataListMystery.push(dataMysterySuit)
        
      }
      //dataListMystery.concat(dataListMysterySuit);
      mystery(dataListMystery);
    }
  }
}

function mystery(dataListMystery){
  const filmUnMystery = dataListMystery[0];
  let elementTitreFilmUnMystery = filmUnMystery.title;
  let c1F1Titre = document.querySelector("#cat1-0 .bandeau h2");
  c1F1Titre.textContent = elementTitreFilmUnMystery;
  let elementImagFilmUnMystery = filmUnMystery.image_url;
  let c1F1Image = document.querySelector("#cat1-0 img");
  c1F1Image.src = elementImagFilmUnMystery;
  c1F1Image.alt = c1F1Titre.textContent;

  const filmDeuxMystery = dataListMystery[1];
  let elementTitreFilmDeuxMystery = filmDeuxMystery.title;
  let c1F2Titre = document.querySelector("#cat1-1 .bandeau h2");
  c1F2Titre.textContent = elementTitreFilmDeuxMystery;
  let elementImagFilmDeuxMystery = filmDeuxMystery.image_url;
  let c1F2Image = document.querySelector("#cat1-1 img");
  c1F2Image.src = elementImagFilmDeuxMystery;
  c1F2Image.alt = c1F2Titre.textContent;

  const filmTroisMystery = dataListMystery[2];
  let elementTitreFilmTroisMystery = filmTroisMystery.title;
  let c1F3Titre = document.querySelector("#cat1-2 .bandeau h2");
  c1F3Titre.textContent = elementTitreFilmTroisMystery;
  let elementImagFilmTroisMystery = filmTroisMystery.image_url;
  let c1F3Image = document.querySelector("#cat1-2 img");
  c1F3Image.src = elementImagFilmTroisMystery;
  c1F3Image.alt = c1F3Titre.textContent;

  const filmQuatreMystery = dataListMystery[3];
  let elementTitreFilmQuatreMystery = filmQuatreMystery.title;
  let c1F4Titre = document.querySelector("#cat1-3 .bandeau h2");
  c1F4Titre.textContent = elementTitreFilmQuatreMystery;
  let elementImagFilmQuatreMystery = filmQuatreMystery.image_url;
  let c1F4Image = document.querySelector("#cat1-3 img");
  c1F4Image.src = elementImagFilmQuatreMystery;
  c1F4Image.alt = c1F4Titre.textContent;

  const filmCinqMystery = dataListMystery[4];
  let elementTitreFilmCinqMystery = filmCinqMystery.title;
  let c1F5Titre = document.querySelector("#cat1-4 .bandeau h2");
  c1F5Titre.textContent = elementTitreFilmCinqMystery;
  let elementImagFilmCinqMystery = filmCinqMystery.image_url;
  let c1F5Image = document.querySelector("#cat1-4 img");
  c1F5Image.src = elementImagFilmCinqMystery;
  c1F5Image.alt = c1F5Titre.textContent;

  const filmSixMystery = dataListMystery[5];
  let elementTitreFilmSixMystery = filmSixMystery.title;
  let c1F6Titre = document.querySelector("#cat1-5 .bandeau h2");
  c1F6Titre.textContent = elementTitreFilmSixMystery;
  let elementImagFilmSixMystery = filmSixMystery.image_url;
  let c1F6Image = document.querySelector("#cat1-5 img");
  c1F6Image.src = elementImagFilmSixMystery;
  c1F6Image.alt = c1F6Titre.textContent;
}

async function fetchClassementFantasy(){
  const apiEndpointFantasy = "http://localhost:8000/api/v1/titles/?genre=Fantasy&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
  const responseFantasy = await fetch(apiEndpointFantasy);
  const dataFantasyTotal = await responseFantasy.json();
  const dataFantasyNbre = (dataFantasyTotal.results).length;
  console.log(dataFantasyNbre);
  let dataListFantasy = [];
  let nombreFilms = 6;

  for(let i=0; i<nombreFilms; i++){
    if(nombreFilms <= dataFantasyNbre){
      const dataFilmFantasy = dataFantasyTotal.results[i];
      dataListFantasy.push(dataFilmFantasy);
      console.log(dataListFantasy.length);
      displayFantasyFilm(nombreFilms, dataListFantasy);
    }
    
    else{
      for(let i=0; i<dataFantasyNbre; i++){
        const dataFilmFantasy = dataFantasyTotal.results[i];
        dataListFantasy.push(dataFilmFantasy);
      }
      j=nombreFilms-dataListFantasy.length;
      const apiEndpointFantasySuit = dataFantasyTotal.next;
      const responseFantasySuit = await fetch(apiEndpointFantasySuit);
      const dataFantasyTotalSuit = await responseFantasySuit.json();
      
      for(let k=0; k<j; k++){
        const dataFilmFantasySuit = dataFantasyTotalSuit.results[k];
        dataListFantasy.push(dataFilmFantasySuit);
      }
      displayFantasyFilm(nombreFilms, dataListFantasy);
      console.log(displayFantasyFilm);
    }
  }
}

function displayFantasyFilm(nombreFilms, dataListFantasy){
  let i=0;
  while (i < nombreFilms) {
    console.log(i);
    let emplacementDomTitre = "#cat2-"+i+" .bandeau h2";
    console.log(emplacementDomTitre);
    let emplacementDomImag = "#cat2-"+i+ " img";
    let filmFantasy = dataListFantasy[i];
    let elementTitreFilmFantasy = filmFantasy.title;
    console.log(elementTitreFilmFantasy);
    let titreFilm = document.querySelector(emplacementDomTitre);
    console.log(titreFilm);
    titreFilm.textContent = elementTitreFilmFantasy;
    let elementImagFilmFantasy = filmFantasy.image_url;
    let imagFilm = document.querySelector(emplacementDomImag);
    imagFilm.src = elementImagFilmFantasy;
    imagFilm.alt = titreFilm.textContent;
    i++
  }
}

async function fetchClassementSciFi(){
  const apiEndpointSci = "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";
  const responseSci = await fetch(apiEndpointSci);
  const dataSciTotal = await responseSci.json();
  const dataSciNbre = (dataSciTotal.results).length;
  console.log(dataSciNbre);
  let dataListSci = [];
  let nombreFilms = 6;

  for(let i=0; i<nombreFilms; i++){
    if(nombreFilms <= dataSciNbre){
      const dataFilmSci = dataSciTotal.results[i];
      dataListSci.push(dataFilmSci);
      console.log(dataListSci.length);
      displayFilm(nombreFilms, dataListSci);
    }
    
    else{
      for(let i=0; i<dataSciNbre; i++){
        const dataFilmSci = dataSciTotal.results[i];
        dataListSci.push(dataFilmSci);
      }
      j=nombreFilms-dataListSci.length;
      const apiEndpointSciSuit = dataSciTotal.next;
      const responseSciSuit = await fetch(apiEndpointSciSuit);
      const dataSciTotalSuit = await responseSciSuit.json();
      
      for(let k=0; k<j; k++){
        const dataFilmSciSuit = dataSciTotalSuit.results[k];
        dataListSci.push(dataFilmSciSuit);
      }
      displayFilm(nombreFilms, dataListSci);
      console.log(displayFantasyFilm);
    }
  }
}

function displayFilm(nombreFilms, dataList){
  let i=0;
  while (i < nombreFilms) {
    console.log(i);
    let emplacementDomTitre = "#cat3-"+i+" .bandeau h2";
    console.log(emplacementDomTitre);
    let emplacementDomImag = "#cat3-"+i+ " img";
    let film = dataList[i];
    let elementTitreFilm = film.title;
    console.log(elementTitreFilm);
    let titreFilm = document.querySelector(emplacementDomTitre);
    console.log(titreFilm);
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
let bestFilmBouton = document.querySelector(".content button.bouton a");
console.log(bestFilmBouton);

/* LES CATEGORIES

notation exemple : c1F1 = catégorie 1 Film 1 */

// Catégorie 1 : Mystery

fetchClassementMystery();
let c1F1Bouton = document.querySelector("#cat1-0 button.bouton a");
console.log(c1F1Bouton);




//Film 2
let c1F2Bouton = document.querySelector("#cat1-1 button.bouton a");
console.log(c1F2Bouton);

//Film 3
let c1F3Bouton = document.querySelector("#cat1-2 button.bouton a");
console.log(c1F3Bouton);

//Film 4
let c1F4Bouton = document.querySelector("#cat1-3 button.bouton a");
console.log(c1F4Bouton);

//Film 5
let c1F5Bouton = document.querySelector("#cat1-4 button.bouton a");
console.log(c1F5Bouton);

//Film 6
let c1F6Bouton = document.querySelector("#cat1-5 button.bouton a");
console.log(c1F6Bouton);

// Catégorie 2 : Fantasy

fetchClassementFantasy();

//Film 1


let c2F1Bouton = document.querySelector("#cat2-0 button.bouton a");
console.log(c2F1Bouton);


//Film 2


let c2F2Bouton = document.querySelector("#cat2-1 button.bouton a");
console.log(c2F2Bouton);


//Film 3


let c2F3Bouton = document.querySelector("#cat2-2 button.bouton a");
console.log(c2F3Bouton);


//Film 4


let c2F4Bouton = document.querySelector("#cat2-3 button.bouton a");
console.log(c1F4Bouton);


//Film 5


let c2F5Bouton = document.querySelector("#cat2-4 button.bouton a");
console.log(c2F5Bouton);


//Film 6


let c2F6Bouton = document.querySelector("#cat2-5 button.bouton a");
console.log(c2F6Bouton);

//category 3
fetchClassementSciFi();