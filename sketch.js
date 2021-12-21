var PLAY = 1;
var END = 0;
var gameState = PLAY;
var starting, startingImage;
var end, endImage;

var pokemon,pikachu;
var pokeball, greatball;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  pikachu = loadAnimation("pikachu running.webp");
  groundImage = loadImage("pixel-frame-0 (8).png");
  
  cloudImage = loadImage("cloud.png");
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  //600 and 200
  createCanvas(windowWidth, windowHeight);
  
  pokemon = createSprite(width/12,height/1.25);
  pokemon.addAnimation("pikachu", pikachu);

  

  pokemon.scale = 0.5;
  
  ground = createSprite(width/3,height - height/10,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width - width/4,height - height/10);
  restart.addImage(restartImg);
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(width/3,height - height/20,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
 
  
  score = 0;
  ground.scale = 0.2;
  gameOver.scale = 0.2;
  restart.scale = 0.2;
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
 
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && pokemon.y >= width/2) {
        pokemon.velocityY = -height/20 + height/100
    }
    
    //add gravity
    pokemon.velocityY = pokemon.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(pokemon)){
        //trex.velocityY = -12;
        gameState = END;
      
    }
  }
   if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
  
    
     
     
      ground.velocityX = 0;
      pokemon.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  pokemon.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState = PLAY;
obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
pokemon.changeAnimation(pikachu);
score = 0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width,height /1.2121212121212121212121212121,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width,height/2 + height/5,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = pokemon.depth;
    trex.depth = pokemon.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

