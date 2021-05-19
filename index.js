const grid = document.querySelector('.grid')
const scoreId = document.getElementById('score')
const startBtn = document.getElementById('start')
const title = document.getElementById('title')
let gridArray = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let timeId = 0

function createGrid(){
   for(let i=0 ; i < 100 ; i++){
   const square = document.createElement('div')
   square.classList.add('square')
   grid.appendChild(square)
   gridArray.push(square)
   } 
}
createGrid()

currentSnake.forEach(index => gridArray[index].classList.add('snake'))

function startGame(){
    currentSnake.forEach(index => gridArray[index].classList.remove('snake'))
    gridArray[appleIndex].classList.remove('apple')
    clearInterval(timeId)
    currentSnake = [2,1,0]
    score = 0
    scoreId.textContent = score
    direction = 1
    intervalTime = 1000
    appleGeneretor()
    currentSnake.forEach(index => gridArray[index].classList.add('snake'))
    timeId = setInterval(move, intervalTime)
}

function move(){ 
    if((currentSnake[0] + width >= width*width && direction === 10) ||
    (currentSnake[0] % width === width-1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0  && direction === -10)||
    (gridArray[currentSnake[0]+direction].classList.contains('snake'))){
    return clearInterval(timeId)
    title.textContent = "GAME OVER"
    }
    //graving the last div from the snake array 
    const tail = currentSnake.pop()
    // remove class from the last div  in the grid array
    gridArray[tail].classList.remove('snake')
    // add item to the first place in the snake array
    currentSnake.unshift(currentSnake[0] + direction) 
    gridArray[currentSnake[0]].classList.add('snake')
    
     if(gridArray[currentSnake[0]].classList.contains('apple')){
        gridArray[currentSnake[0]].classList.remove('apple')
        
        gridArray[tail].classList.add()
        currentSnake.push(tail)
        
        appleGeneretor()
        
        score++
        scoreId.textContent = score
        
        intervalTime = intervalTime * 0.9
        timeId = setInterval(move, intervalTime)
            }
}

function appleGeneretor(){
    do{
        appleIndex = Math.floor(Math.random() * gridArray.length)
    }while(gridArray[appleIndex].classList.contains('snake'))
    gridArray[appleIndex].classList.add('apple')
}
appleGeneretor()

//clearInterval(timeId)
// 37 left
// 38 top
// 39 right
//40 down

function control(e){
    if(e.keyCode === 37){
        console.log('left pressed')
        direction = -1
    }
    else if(e.keyCode === 38){
        console.log('top pressed')
        direction = -width
    }
    else if(e.keyCode === 39){
        console.log('right pressed')
        direction = 1
    }
    else if(e.keyCode === 40){
        direction = width
    }
}

document.addEventListener('keyup',control)

startBtn.addEventListener('click', startGame)