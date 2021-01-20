var Knife, Knife_IMG, GameOver_IMG ;
var fruit;
var fruit1_img,fruit2_img,fruit3_img,fruit4_img ;
var gamestate = "PLAY" ;




function preload(){
  Knife_IMG = loadImage("sword.png");
  GameOver_IMG = loadImage("gameover.png");
  fruit1_img = loadImage("fruit1.png");
  fruit2_img = loadImage("fruit2.png");
  fruit3_img = loadImage("fruit3.png");
  fruit4_img = loadImage("fruit4.png");
  alien1 = loadImage("alien2.png")
  alien2 = loadImage("alien1.png");
  go = loadImage("gameover.png");
  gameoversound = loadSound("gameover.mp3")
  knifeswoosh = loadSound("knifeSwooshSound.mp3")
  
 
}
function setup() {

  createCanvas(600,500);
  
  Knife = createSprite(200,150,10,10);
  Knife.addImage(Knife_IMG);
  Knife.scale = 0.5 ;
 
  console.log("Memory Leak Prevention" + " I'm running!");
  
   score = 0;
  fruitGroup = createGroup();
  enemyGroup=createGroup();
}


function draw(){
  background(33, 201, 207);
  position = Math.round(random(1,2));
  
    text("Score:" + score,300,30);
   if (gamestate == "PLAY") {
    Knife.y = World.mouseY ;
    Knife.x = World.mouseX ;
     fruits();
     Enemy();{
     if (fruitGroup.isTouching(Knife)) {
     score = score + 1;  
       fruitGroup.destroyEach();
       knifeswoosh.play();
     }
       if (enemyGroup.isTouching(Knife)) {
       gamestate = "END"
        gameoversound.play();
       fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
    
      Knife.addImage(go);
       Knife.x=200;
       Knife.y=200;
     }
  }
 } 

  
 drawSprites(); 
}
function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1_img);
    } else if (r == 2) {
      fruit.addImage(fruit2_img);
    } else if (r == 3) {
      fruit.addImage(fruit3_img);
    } else {
      fruit.addImage(fruit4_img);
    }
    
    fruit.y=Math.round(random(50,340));
   if (position == 1) {
    fruit.velocityX= (-7+(score/4));

   } else if (position == 2) {
     fruit.x = 0
     fruit.velocityX= (7+(score/4));
   }
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addAnimation("alien1", alien2);
    alien.y=Math.round(random(100,300));
    alien.velocityX=(-8+(score/10));
    alien.setLifetime=50;
    
    enemyGroup.add(alien);
  }
}