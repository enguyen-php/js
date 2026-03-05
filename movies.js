// OMDB API -> https://www.omdbapi.com/

// Faire une barre de recherche avec bouton pour rechercher et ajouter en favoris 
// On doit pouvoir recghercher un film par son nom et afficher les résultatrs en dessous 
// On doit également pouvoir accéder à une liste de fazvoris en cliquant sur le bouton de favoris 
// Chaque div de film doit contenir un bouton d'ajout au favoris / suppression des favoris sui déjà dedans 
// Les favoris doivent etre enregistrés en LocalStorage 

// BONUS : Tenter de le faire avec un système de classes et d'objets 

// Cette classe est un peu la classe globale de l'application
class MovieApp {
    // C'est cette classe que l'on devra instancier lors de notre arrivée sur la page de movies  
    // On recup les éléments HTML ici. On pourra aussi initialiser le tableau de favs dans cette classe (new FavManager)
    // On gère également la recherche de films, l'affichage de la page des favoris (ex : showFav())
    // Il faudra également les écouteurs d'événement 
    constructor() {
        this.apiUrl = "http://www.omdbapi.com/?apikey=eed08b06&s="
        this.input = document.querySelector(".searchInput")
        this.searchBtn = document.querySelector(".searchBtn")
        this.favBtn = document.querySelector(".favBtn")
        this.resultsZone = document.querySelector(".resultsZone")

        this.searchBtn.addEventListener("click", () => this.searchMovie(this.input.value)) 
        this.favBtn.addEventListener("click", () => this.showFav())


    }

    async searchMovie(query) {
        this.resultsZone.innerHTML = ""
        this.input.value = ""
    
        const res = await fetch(this.apiUrl + query, { headers : {
            "Accept": "application/json"
        }})
    
        const data = await res.json()
    
        if (!data.Response) {
            this.resultsZone.innerHTML = "Aucun film trouvé ... " + data.Error
            return

        } else {
            let movies = data.Search 
            console.log(movies)
    
            movies.forEach(movie => {
                let card = new Movie(movie).render()
                this.resultsZone.append(card)
            })
        }
    }

    showFav() {
        this.resultsZone.innerHTML = ""

        let favs = new FavManager().getFavs()

        if (!favs.length) {
            this.resultsZone.innerText = "Aucun favori enregistré"
        } else {
            favs.forEach(fav => {
                let card = new Movie(fav).render()
                this.resultsZone.append(card)
            })
        }
    }
}

// La classe Movie permet de générer une card pour un film 
class Movie {
    constructor(movie) {
        this.imdbId = movie.imdbId
        this.Title = movie.Title
        this.Poster = movie.Poster
        this.Type = movie.Type
        this.Year = movie.Year 
    }

    render() {
        // Créer les éléments HTML : div, titre, image etc 
        let h3 = document.createElement("h3")
        let img = document.createElement("img")
        let h4 = document.createElement("h4")
        let h5 = document.createElement("h5")
        let btn = document.createElement("button")
        let div = document.createElement("div")

        // Ajouter du contenu à ces éléments 
        h3.textContent = this.Title
        img.src = this.Poster
        h4.textContent = this.Year
        h5.textContent = this.Type
        btn.textContent = "Ajouter aux favoris"

        btn.addEventListener("click", () => {
            let favs = new FavManager()
            favs.addToFav(this)
        })

        // Insérer ces éléments dans notre div de container 
        div.append(h3, img, h4, h5, btn)

        // Le render nous retourne donc une div avec toutes les infos attendues
        return div
    }
}

// Cette classe permet de gérer les aspect liés aux favoris 
class FavManager {
    // Ici on recup les favs soit du LS soit oninitialise en tableau vide (dans un constructor par exemple)
    // Ici on gère l'ajout aux favoris 
    // Pkoi pas une méthode de type gfetter qui liste l'ensemble des favoris (on pourra la réutiliser 
    // dans la classe MovieAPp dans une méthode de type showFav par exemple)

    constructor() {
        this.favs = JSON.parse(localStorage.getItem("favorites")) || []
    }

    getFavs() {
        return this.favs
    }

    addToFav(movie) {
        // Ajout du movie dans les favs
        this.favs.push(movie)

        // On enregistre aussi en LS
        localStorage.setItem("favorites", JSON.stringify(this.favs))
    }
}

// On instancie MovieApp afin de créer/initialiser l'application
new MovieApp()


