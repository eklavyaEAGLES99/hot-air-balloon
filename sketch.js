var balloon,balloonImage1,balloonImage2;

// create database and position variable here
var database,position
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

  function setup(){
    database = firebase.database();

    createCanvas(500,500);
    balloon = createSprite(250,250,10,10);
  balloon.scale=0.2;
    var balloonPosition = database.ref("Balloon/Position");
    balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
      changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,+1);
  }

  drawSprites();
}
function changePosition(x,y){
  database.ref("Balloon/Position").set({
      "x": position.x + x,
      "y": position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Could not read position");
}