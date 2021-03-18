
var gameStart = null,
gameSpeed = null,
gameArea = null,
gameAreaContext = null,
gameAreaWidth = 0,
gameAreaHeight = 0,
cellWidth = 0,
playerScore = 0,
snake = null,
snakeFood = null,
snakeDirection = null,
snakesize = 0,
timer = null;
 
function initialize(){
    gameStart = document.querySelector('#gameStart');
    gameSpeed = document.querySelector('#gameSpeed');
    gameArea = document.querySelector('#gameArea');
    gameAreaContext = gameArea.getContext('2d');
    gameAreaWidth = 400;
    gameAreaHeight = 600;
    cellWidth = 20;
    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;

    gameStart.onclick=function() {
        this.disabled =true;
       startGame()
    }
 }


function startGame(){
    playerScore=0;
    snakeDirection='right'
    speedSize=parseInt(gameSpeed.value);

    if (speedSize>9){
        speedSize=9;
    }else if (speedSize<1){
        speedSize=1;
    }
    snake=[];
    snake.push({x:0, y:cellWidth});
    createFood();
    clearInterval(timer);
    timer=setInterval(createGameArea ,500/speedSize);
}
function createFood() {
    snakeFood = {
        x: Math.round((Math.random() * (gameAreaWidth - cellWidth)) / cellWidth),
        y: Math.round((Math.random() * (gameAreaHeight - cellWidth)) / cellWidth)
    };
}
function createGameArea(){
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    gameAreaContext.fillStyle = '#FFFFFF';
    gameAreaContext.fillReact(0,0,gameAreaWidth,gameAreaHeight);
    gameAreaContext.strokeStyle = '#CCCCCC';
    gameAreaContext.stroke.React(0,0,gameAreaWidth,gameAreaHeight);

    if(snakeDirection=='right'){
        snakeX++;
    } else if(snakeDirection=='left'){
        snakeX--;
    }else if(snakeDirection=='down'){
        snakeY--;
    }else if(snakeDirection=='up'){
        snakeY++;
    }
    if (
        snakeX== -1 ||
        snakeX== gameAreaWidth/cellWidth ||
        snakeY== -1 ||
        snakeY== gameAreaHeight/cellWidth ||
        Control(snakeX, snakeY,snake))
     {
        writeScore();
        clearInterval(timer);
        gameStart.disabled=false;
        return;
    }
 if (snakeX == snakeFood.x && snakeY ==snakeFood.y){
     var newHead ={x: snakeX,y: snakeY};
     playerScore+=speedSize;
     createFood();
 }else {
     var newHead = snake.pop();
        newHead.x=snakeX;
        newHead.y=snakeY;
 }
 snake.unshift(newHead);
 for(var i=0; i<snake.lenth; i++){
     createSquare(snake[i].x,snake[i].y);
 }
 createSquare(snakeFood.x , snakeFood.y);
}


function Control(x,y,array){
    for(var i=0; i<array.lenth ; i++){
        if(array[1].x== x && array[1].y==y){return true;}
    }
    return false;
}


function writeScore(){
    gameAreaContext.font= "50px sans-serif";
    gameAreaContext.fillStyle= "#FFF333";
    gameAreaContext.fillText(
        'Score'+playerScore,
        gameAreaWidth/2-100,
        gameAreaHeight/2);
    }
function createSquare(x,y){
    gameAreaContext.fillStyle="#000000";
    gameAreaContext.fillReact(x*cellWidth, y*cellWidth, cellWidth,cellWidth);
}

function changeDirection(e){
    var keys =e.which;
    if(keys=="40" && snakeDirection != "up") {
        snakeDirection= "down";
    } else if(keys=="39" && snakeDirection != "left"){
        snakeDirection= "right";
    }else if(keys=="38" && snakeDirection != "down"){
        snakeDirection= "up";
    }else if(keys=="37" && snakeDirection != "right"){
        snakeDirection= "left";
    }
}

window.onkeydown = changeDirection;
window.onload = initialize;