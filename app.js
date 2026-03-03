// METEO APP

const container = document.querySelector(".container")
const locateBtn = document.querySelector(".locate")

// A mettre dans un .env qui sera lui meme dans un .gitignore
let apiKey = "8a46ed081fa271f6e1f3b7415825368"
let lat = 48.7847490960824
let lng = 2.0421617832514154

// On va créer un widget météo qui affiche le temps en direct
// On voudra que cela se présente comme suis : 

// - Le nom de la ville puis les 2 lettres du pays (FR, UK etc)
// - Le logo / icone du temps qu'il fait (chercher open weather api icons dans google ...)
// - En dessous on affiche la température, en degrés celsius (c'est pas défaut en farenheit)

// 2 types de fonctionnement : 
// 1) possibilité de se géolocaliser en cliquant sur un bouton (avec le navigateur chercher la fonction geoLocate ...)
// 2) BONUS : Possibilité de chercher via le nom d'une ville (il faudra un input, récupérer sa valeur avec value et chercher via 
// le bon endpoint la ville en question)

// Etapes à suivre : 

// - Coder le HTML (bouton geolocate, différents emplacements à remplir)
// - Trouver et coder une fonction de geolocalisation. C'est possible...  (cf w3)
// - Pour chaque click sur le bouton on recup lat et lng 
// - Suite à cela on peut récup la météo actuelle
// - Afficher ensuite les infos de manière adequat dans le html

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`

// Fonction de géolocalisation => Geolocate API
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("pas de geoloc")
    }
}

// Avec showPosition on recupo la position en paramètre de cette fonction
function showPosition(position) {
    console.log(position)
    // callApi(position)
}

// Fonction qui vient récup les données depuis l'API
function callApi(position) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        displayInfos(data)
    })
    .catch(err => console.log(err))
}

// Affiche les données de l'API dans notre HTML
function displayInfos(data) {
    let city = data.name
    let temp = data.main.temp
    let country = data.sys.country
    let icon = data.weather[0].icon
    let main = data.weather[0].main
    let description = data.weather[0].description

    let div = document.createElement("div")

    div.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <h2>${temp} °C - ${city}, ${country}
        <h2>${main}, ${description}</h2>
    `
    container.append(div)
}

// Récupérer la localisation de notre navigateurl
locateBtn.addEventListener("click", () => {
    console.log("locate pushed")
    getLocation()
})