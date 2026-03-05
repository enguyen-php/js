// JEU AVEC MARIO 
const mario = document.querySelector(".mario")

let style = window.getComputedStyle(mario, null)

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const sprite = new Image()
sprite.src = 'assets/mario_tuxedo_noBg.png'

window.addEventListener("keydown", (event) => {

    if (event.key == "ArrowLeft") {
        // On récupère la position Left de Mario 
        let positionLeft = style.getPropertyValue("left")
        // On enlève de la string les caractères px
        positionLeft = positionLeft.slice(0, -2)
        // On convertit notre string en integer
        positionLeft = parseInt(positionLeft)
        // On enlève 2 (déplacement vers la gauche )
        positionLeft = positionLeft - 4
        // On met à jour le style de Mario depuis le JS 
        mario.style.left = `${positionLeft}px`

    } else if (event.key == "ArrowRight") {

        mario.classList.add('walking');
    mario.classList.remove('facing-left');

        // déplace vers la droite 
        let positionLeft = style.getPropertyValue("left")
        // On enlève de la string les caractères px
        positionLeft = positionLeft.slice(0, -2)
        // On convertit notre string en integer
        positionLeft = parseInt(positionLeft)
        // On enlève 2 (déplacement vers la gauche )
        positionLeft = positionLeft + 4
        // On met à jour le style de Mario depuis le JS 
        mario.style.left = `${positionLeft}px`

    } else if (event.code == "Space") {
        // mario saute 
        console.log("le saut !")

        mario.classList.add("jump")

        setTimeout(() => mario.classList.remove("jump"), 300) 
        
        

    } else if (event.key == "ArrowDown" || event.key == "Control") {
        // Mario se baisse
    }
})

// ANIMATION PERSONNAGE

// Infos de base du sprite 
const frameWidth = 58
const frameHeight = 64 
const walkFrames = [0, 1, 2, 3, 4, 5]
const crouchFrame = 6

let currentFrame = 0
let frameTimer = 0
let posX = 50
let velocityX = 0 

function update(deltaTime) {
    // 1. Maj position
    posX += velocityX

    // 2. Raletissement
    velocityX *= 0.95 

    // 3. Vitesse animation sur vélocité
    if (Math.abs(velocityX) > 0.1) {
        frameTimer += Math.abs(velocityX) * 0.1 
        currentFrame = walkFrames[Math.floor(frameTimer) % walkFrames.length]
    } else {
        // Idle ?
        currentFrame = 0 
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.drawImage(
        sprite,
        currentFrame * frameWidth, 0, // Source X, Y
        frameWidth, frameHeight,       // Source W, H
        posX, 100,                     // Destination X, Y
        frameWidth, frameHeight        // Destination W, H
    )
    
    requestAnimationFrame((t) => update(t))
}

draw()