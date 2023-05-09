const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const TOTAL = 220
const leapArray= []

const leapImg = new Image()
leapImg.src = './leap.png'
leapImg.onload = () =>{
    for (let i = 0; i < TOTAL; i++){
        leapArray.push(new leap())
    }
    render()
} 

function render(){
    ctx.clearRect(0,0, canvas.width, canvas.height) 
    leapArray.forEach(leap => {
        leap.animate()
    })
    window.requestAnimationFrame(render)
}


window.addEventListener('resize', () =>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

class leap{
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height * 2 - canvas.height
        this.w = 30 + Math.random() * 15
        this.h = 20 + Math.random() * 10
        this.opacity = this.w /45
        this.xSpeed = 2 + Math.random()
        this.ySpeed = 1 + Math.random()
        
        this.flip = Math.random()
        this.flipSpeed = Math.random() * 0.03
    }
    draw(){
        if (this.y > canvas.height || this.w > canvas.width){
            this.x = leapImg.width
            this.y = Math.random() * canvas.height * 2 - canvas.height
            this.xSpeed = 2 + Math.random()
            this.ySpeed = 1 + Math.random() * 0.5
            this.flip = Math.random()
        }

        ctx.globalAlpha = this.opacity
        ctx.drawImage(
            leapImg,
            this.x,
            this.y,
            this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
            this.w * (0.66 + (Math.sin(Math.cos(this.flip)) / 2)),
        )
    }
    animate(){
        this.x += this.xSpeed
        this.y += this.ySpeed
        this.draw()
        this.flip += this.flipSpeed
    }
}

