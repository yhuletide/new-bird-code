var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 10}; //ball is now a class object. The params setting the balls position and radius.
var gravity = 0.15; //Sets gravity-the rate at which the ball falls down. // changed to .15 to make ball more controllable
var damping = 0.75; //This will make the ball slow down when it hits a wall.
var rectWidth = Math.floor(Math.random() * (125 - 100) + 100);//rectangle set width
var rectHeight = Math.floor(Math.random() * (190 - 170) + 170); //rectangle set height
var rectLower = {xPos: c.width-rectWidth, yPos: c.height-rectHeight, width: rectWidth, height: rectHeight};
var rectUpper = {xPos: c.width-rectWidth, yPos: 0, width: rectWidth, height: rectHeight};// determine the outsides of the rectangles all 4 sides are set.
var rectArray = []; // array is considered a placeholder.
var timer = 0; // be used to time the spawns of the pipes.
var score = 0; //Score counter that will increase every time the player goes through a pipe.

function drawCircle() { //This function will draw the ball that will be controlled by the player
  ctx.beginPath();//begins to draw ball on the canvas
  ctx.arc(ball.xPos, ball.yPos, ball.rad, 0, Math.PI*2); //Draws the ball using it's pre-determined loation and radius.
  ctx.fillStyle = "red"; //Makes the ball red.
  ctx.fill();
  ctx.stroke();
}

/* makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight)
@param lowRectX [object]- sets x position of the long, (bottom tube).
@param lowRectY [object]- sets y position of the long, (bottom tube).
@param lowRectWid [object]- determines the width of the long, (bottom tube).
@param lowRectHeight [object]- determines the height of the long, (bottom tube).
@param upRectX [object]- sets x position of the long, (top tube.
@param upRectY [object]- sets y position of the long, (top tube).
@param upRectWid [object]- determines the width of the long, (top tube).
@param upRectHeight [object]- determines the height of the long, (top tube).
*/
function makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){ //This function will create the pipes based on it's parameters.
  ctx.clearRect(0, 0, c.width, c.height); //Clears the canvas every frame.
  for (var i = 0; i < rectArray.length; i++) {
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL); // draws the base of the bottom pipe.
    ctx.fillStyle = "green"; //These set the color of the pipes to green.
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosL-15, rectArray[i].yPosL, rectArray[i].widthL+30, 40); //draws the top of the bottom pipe.
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU); //draws the base of the top pipe.
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosU-15, rectArray[i].heightU-40, rectArray[i].widthU+30, 40); //Will draw the top of the top pipe.
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
  }
}

/* collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight)
@param lowRectX [object]- sets x position of the long, (bottom tube).
@param lowRectY [object]- sets y position of the long, (bottom tube).
@param lowRectWid [object]- determines the width of the long, (bottom tube).
@param lowRectHeight [object]- determines the height of the long, (bottom tube).
@param upRectX [object]- sets x position of the long, (top tube.
@param upRectY [object]- sets y position of the long, (top tube).
@param upRectWid [object]- determines the width of the long, (top tube).
@param upRectHeight [object]- determines the height of the long, (top tube).
*/
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){//collision checks to make sure ball goes through or hits the pipes
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.xPos + ball.xMove + ball.rad < lowRectX + 2)) { //Every time the ball goes through a pipe gap.
    score ++; //The score will go up 1
    console.log(score);// goes to console
    document.getElementById('score').innerHTML = "Score = " + score;
  }

  if ((ball.xPos + ball.xMove + ball.rad > upRectX) && (ball.yPos + ball.rad < upRectHeight) && (ball.rad + ball.xPos < upRectX + upRectWid)) { // if the ball touches the coords of the pipes ;
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //the game ends and the score counter appears
  }
  if ((ball.yPos + ball.yMove - ball.rad < upRectHeight) && (ball.xPos + ball.rad < upRectWid + upRectX + 50) && (ball.rad + ball.xPos > upRectX)) {
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again.");
  }
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.yPos + ball.rad > lowRectY) && (ball.rad + ball.xPos < lowRectX + lowRectWid)) { //If the ball's position overlaps or touches with the corrdinates of the bottom pipes.
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again.");
  }
  if ((ball.yPos + ball.yMove + ball.rad > lowRectY) && (ball.xPos + ball.rad < lowRectWid + lowRectX + 50) && (ball.rad + ball.xPos > lowRectX)) {
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again.");//continues to alert the continue the console until the page is refreshed
  }
}

function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  makePipe(rectLower.xPos, rectLower.yPos, rectLower.width, rectLower.height, rectUpper.xPos, rectUpper.yPos, rectUpper.width, rectUpper.height); //This will actually draw the pipe, and will be used in a SetInterval function.
  if (timer == 300) { //timer will begin counting at start of game
    var chance = Math.floor(Math.random() * (1 - 4) + 4); //pipes will appear on the screen when the timer hits 300
    if (chance == 1) {
      var rectHUp = Math.floor(Math.random() * (190 - 150) + 150);
      var rectHLow = Math.floor(Math.random() * (190 - 150) + 150);
    }
    if (chance == 2) {
      var rectHUp = Math.floor(Math.random() * (310 - 290) + 290);
      var rectHLow = Math.floor(Math.random() * (90 - 70) + 70);
    }
    if (chance == 3) {
      var rectHUp = Math.floor(Math.random() * (90 - 70) + 70);
      var rectHLow = Math.floor(Math.random() * (310 - 290) + 290);
    }
    var rectW = Math.floor(Math.random() * (125 - 100) + 100);
    var newRect = {xPosL: c.width-rectW, yPosL: c.height-rectHLow, widthL: rectW, heightL: rectHLow, xPosU: c.width-rectW, yPosU: 0, widthU: rectW, heightU: rectHUp};// confused on what the new pipes are set.
    rectArray.push(newRect);
    timer = 0;
  }
  for (var i = 0; i < rectArray.length; i++) {
    makePipe(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    rectArray[i].xPosL --;
    rectArray[i].xPosU --;
  }
  drawCircle();
  if (ball.xPos + ball.xMove > c.width - ball.rad || ball.xPos + ball.xMove < ball.rad) {
    ball.xMove = -ball.xMove;
  }
  if (ball.yPos + ball.yMove > c.height - ball.rad || ball.yPos + ball.yMove < ball.rad) {
    ball.yMove = -ball.yMove * damping;
  }
  ball.yMove += gravity;
  ball.xPos = 250;//direction of x velocity.
  if (((ball.yPos + ball.yMove) + ball.rad) <= c.height) {
    ball.yPos += ball.yMove;
  }
  for (var i = 0; i < rectArray.length; i++) {
    collisionCheck(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
  }
  timer ++; //makes timer go up by 1 as each frame passes
}

setInterval(draw, 10);

document.addEventListener("keydown", makeBounce); //Looking for/locates a keypress.
function makeBounce(e) {
  if (e.key == " ") { //When a key is pressed... (the empty string is considered the spacebar)
    ball.yMove -= 5; //The ball will jump a distance of 5.
  }
  if (e.key == "r") {
    ball.xMove = -ball.xMove;
  }
}
