//board
let board;
let boardHeight = 500;
let boardWidth = 500;
let context;

//player
let PlayerHeight = 10;
let PlayerWidth = 80;

let player = {
    x: boardWidth / 2 - PlayerWidth / 2,
    y: boardHeight - PlayerHeight - 5,
    width: PlayerWidth,
    height: PlayerHeight,
    velocityX: 5 // Speed of player movement
}

let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 5;
let ballVelocityY  = 3;

let ball = {
    x: boardWidth/2 , 
    y: boardHeight/2 ,
    width : ballWidth ,
    height : ballHeight ,
    velocityX : ballVelocityX ,
    velocityY : ballVelocityY,
}

//block
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows=10;
let blockCount = 0;

//starting block corner top left 
let blockX=15;
let blockY=45;

let SCORE =0;
let gameover = false;

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');

    // Draw initial player
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Start the game loop
    requestAnimationFrame(update);

    // Add event listener for player movement
    document.addEventListener("keydown", movePlayer);

       createBlock();
}

function update() {
    requestAnimationFrame(update);

    if(gameover){
        return  ;
    }
    // Clear the board
    context.clearRect(0, 0, board.width, board.height);

    // Draw the player
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
     context. fillRect(ball.x , ball.y , ball.width , ball.height );
      
     // bounce ball off wall
     if( ball.y <= 0){
        ball.velocityY *= -1;
     }
     else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth){
      //  if ball touch left or right corner of canvas
        ball.velocityX *= -1; // reverse the direction
     }
     else if (ball.y + ball.height >= boardHeight){
// if ball touches bottom of canva
//gameover
context.font = "20px sans-serif";
context.fillText("game over : press 'space' to restart",80,400)
gameover = true;

     }

     //bounce the all of player paddle
     if(topCollision(ball,player) ||bottomCollision(ball,player)){
        ball.velocityY *= -1;
     }
     else if ( leftCollision (ball,player) || rightCollision(ball,player)){
        ball.velocityX *= -1;
     }
     //blocks
     context.fillStyle = "skyblue";
     for (let i=0 ; i< blockArray.length ; i++){
        let block = blockArray[i];
        if (!block.break){
            if ( topCollision(ball,block) || bottomCollision(ball,block)){
                block.break = true ;
                ball.velocityY *= -1;
                blockCount -= 1;
                SCORE += 100;
            }
            else if(leftCollision (ball,block) || rightCollision(ball,block)){
                block.break = true;
                ball.velocityX *= -1;
                blockCount -= 1;
                SCORE += 100;
            }
            context.fillRect(block.x,block.y,block.width,block.height);
        }
     }
   context.font = "20px sans-serif";
   context.fillText(SCORE ,10 , 25);
}

function movePlayer(e) {

    if (gameover){
        if(e.code == "Space")
        {
            resetGame();
        }
    }

    if (e.code == "ArrowLeft" && player.x > 0) {
        player.x -= player.velocityX;
    } else if (e.code == "ArrowRight" && player.x + player.width < boardWidth) {
        player.x += player.velocityX;
    }
}

function detectColiision(a,b){
    return a.x < b.x +b.width && //a's top left corner doesn't reach b's top right corner 
    a.x + a.width > b.x &&//a's top right corner passed b's top left corner 
    a.y < b.y + b.height &&//a's top right corner doesn't reach b's top left corner 
    a.y + a.height > b.y ;//a's top left corner passed b's top right corner 
}

function topCollision(ball,block){
    return detectColiision (ball,block)&&(ball.y+ball.height) >= block.y;
}
function bottomCollision(ball,block){
    return detectColiision (ball,block)&&(ball.y+ball.height) >= ball.y;
}
function rightCollision(ball,block){
    return detectColiision (ball,block)&&(ball.x+ball.width) >= ball.x;
}
function leftCollision(ball,block){
    return detectColiision (ball,block)&&(ball.x+ball.width) >= block.x;
}
function createBlock(){
    blockArray = [];//clear blockArray
    for (let c=0 ; c< blockColumns; c++){
        for (let r = 0 ; r < blockRows ; r++){
            let block = {
                x: blockX + c * blockWidth + c*10 ,// c*10 for space 10 pixel in coulemn
                y : blockY + r* blockHeight + r*10 ,// r*10 for space in rows
                width : blockWidth , 
                height : blockHeight ,
                break : false 
            }
            blockArray.push (block);

        }
    } blockCount = blockArray . length;
}
function resetGame(){
    gameover=false;
     player = {
        x: boardWidth / 2 - PlayerWidth / 2,
        y: boardHeight - PlayerHeight - 5,
        width: PlayerWidth,
        height: PlayerHeight,
        velocityX: 5 // Speed of player movement
    }
     ball = {
        x: boardWidth/2 , 
        y: boardHeight/2 ,
        width : ballWidth ,
        height : ballHeight ,
        velocityX : ballVelocityX ,
        velocityY : ballVelocityY,
    }    
  blockArray=[];
    SCORE = 0;
    createBlock()  ;
}