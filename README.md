# js_leapAnimation

const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
// 캔버스 = 윈도우 전체 화면 설정 

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
// 이미지를 먼저 업로드하고 랜더함수가 실행되도록 한다.

function render(){
ctx.clearRect(0,0, canvas.width, canvas.height) 
    // 실행될때마다 그리고 지우고를 반복
leapArray.forEach(leap => {
leap.animate()
    })
window.requestAnimationFrame(render)
}


window.addEventListener('resize', () =>{
canvas.width = window.innerWidth
canvas.height = window.innerHeight
})
// 윈도우 사이즈가 변경될때마다 캔버스의 가로세로가 변경된다.

class leap{
constructor(){
this.x = Math.random() * canvas.width
this.y = Math.random() * canvas.height * 2 - canvas.height
        // 화면에 뿌려주기위한 사이즈 정의
this.w = 30 + Math.random() * 15
this.h = 20 + Math.random() * 10
        // 위치 랜덤 지정
this.opacity = this.w /45
        // w의 투명도 
this.xSpeed = 2 + Math.random()
this.ySpeed = 1 + Math.random()
        
this.flip = Math.random()
this.flipSpeed = Math.random() * 0.03
        // 잎이 떨어지는 위치 랜덤,잎이 떨어지는 속도
    }
    
 draw(){
if (this.y > canvas.height || this.w > canvas.width){
this.x = leapImg.width
this.y = Math.random() * canvas.height * 2 - canvas.height
this.xSpeed = 2 + Math.random()
this.ySpeed = 1 + Math.random() * 0.5
this.flip = Math.random()
        }
// x는 캔버스 바깥에 Img 생성되는것을 막기위해
// y축 값을 이렇게 설정한 이유는 y축 밖에서 시작해서 캔버스방향으로 떨어지는 것을 보기위해서

ctx.globalAlpha = this.opacity
ctx.drawImage(
leapImg,
this.x,
this.y,
this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
// 가로길이가 0.66에서 1배 사이값이 반복되면서 그려진다
this.w * (0.66 + (Math.sin(Math.cos(this.flip)) / 2)),
// 세로길이가 0.66에서 1배 사이값이 반복되면서 그려진다
        )
    }
animate(){
this.x += this.xSpeed
this.y += this.ySpeed
this.draw()
this.flip += this.flipSpeed
    }
}
