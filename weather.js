// APP WEATHER 

// Reproduire le widget Météo déjà effectuén en PHP 
// Afficher le temps, les degrés; le logo du temps, la description mais aussi que : 

// Par défaut la météo affiche le temps local -> il est possible grace au navigateur de récupérer votre position lat et long
// Pour la doc de la Géoloc -> https://www.w3schools.com/html/html5_geolocation.asp
// Pour l'api -> https://home.openweathermap.org/

// Bonus : Un in put qui permet de rechercher AUSSI via le nom de la ville 

// Etape 1 : Récupérer la localisation du Browser 


const locate = document.querySelector(".locate")
const container = document.querySelector(".container")

locate.addEventListener("click", () => {
    // getLocation()
    fetchWeather("62.021964", "129.591533")
})


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
        }, 
        error)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
} 


async function fetchWeather(lat, lng) {
    // Requete API vers weather API
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=28a46ed081fa271f6e1f3b7415825368&units=metric`

    // Avec await ici je viens fetch la weather API
    let data = await fetch(apiUrl, { headers: {"Accept" : "applicatopn/json"}})

    // Attention à bien utiliser await également pour la conversion depuis JSON 
    data = await data.json()

    console.log(data)

    // On recup les infos depuis l'API
    let city = data.name
    let temp = data.main.temp
    let { main, icon, description } = data.weather[0]
  
    // On vient ensuite créer les éléments HTML adequats et on leur ajoute 
    // le contenu texte correspondant
    let h3 = document.createElement("h3")
    h3.textContent = city

    let h4 = document.createElement("h4")
    h4.textContent = temp + "°C"

    let img = document.createElement("img")
    img.src = `https://openweathermap.org/payload/api/media/file/${icon}.png`

    let h5 = document.createElement("h5")
    h5.textContent = main

    let p = document.createElement("p")
    p.textContent = description

    // On vient enfin tout injecter le tout dans notre container
    container.append(h3, h4, img, h5, p)
} 

// function success(position) {
    
//     console.log(position)

//     let lat = position["coords"]["latitude"]
//     let lng = position["coords"]["longitude"]

//     // Fonction d'appel cers l'API météo afin de récupérer les infos 
//     fetchWeather(lat, lng)
// }

function error(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
          break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
          break;
      }
}


