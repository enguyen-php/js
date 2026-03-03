// OMDB API -> https://www.omdbapi.com/

// Faire une barre de recherche avec bouton pour rechercher et ajouter en favoris 

// On doit pouvoir recghercher un film par son nom et afficher les résultatrs en dessous 
// On doit également pouvoir accéder à une liste de fazvoris en cliquant sur le bouton de favoris 
// Chaque div de film doit contenir un bouton d'ajout au favoris / suppression des favoris sui déjà dedans 
// Les favoris doivent etre enregistrés en LocalStorage 

// BONUS : Tenter de le faire avec un système de classes et d'objets

let moviesArray = JSON.parse(localStorage.getItem("movies")) || []

let apiKey = "81e7fc82"

let apiUrl = "https://www.omdbapi.com/?apikey="

const favoriteBtn = document.querySelector(".favoriteBtn")

const container = document.querySelector(".movies-container")
const input = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")
const favoriteButton = document.querySelector(".favorite-button")

searchButton.addEventListener("click", () => {
    if (input.value != "") {
        let inputValue = input.value
        let url = apiUrl + apiKey + "&s=" + inputValue
        console.log(url)
        
        fetch(apiUrl + apiKey + "&s=" + inputValue)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.Error != "Movie not found!") {
                let x = 0
                container.innerHTML = ""
                data.Search.forEach((Title, x=x+1) =>
                    displayMovies(data.Search[x].Title, data.Search[x].Poster))
                    console.log(data.Search)
            
            } else {
                container.innerHTML = "<p>Désolé aucun film ne correspond à votre recherche</p>"
            }
        })
        .catch(err => {
            console.log(err)
            container.innerHTML = "<p>Désolé aucun film ne correspond à votre recherche</p>"
        })
    }
})

favoriteBtn.addEventListener("click", () => {
    
})

function displayMovies(title, imgUrl) {
    let h2 = document.createElement("h2")
    let img = document.createElement("img")
    let button = document.createElement("button")

    h2.textContent = title
    img.src = imgUrl
    button.textContent = "Mettre en favori"
    button.classList = "favorite-button"

    container.append(h2, img, button)

    let favoriteButton = document.querySelector(".favorite-button")

    favoriteButton.addEventListener("click", () => {
    console.log("clic")

    let movieObject = {
        content : title
    }

    moviesArray.push(movieObject)

    localStorage.setItem("movies", JSON.stringify(moviesArray   ))
})
}