var ghost,ghostimage,door,doorimage,wall,wallimage,climber,climberimage,invisibleblock;

var doorgroup,climbergroup,invisibleblockgroup;

var gamestate="play";

function preload(){
  ghostimage=loadImage("ghost-standing.png");
  
  doorimage=loadImage("door.png");
  
  wallimage=loadImage("tower.png");
  
  climberimage=("climber.png");
}



function setup(){
  createCanvas(600,600);
  
  wall=createSprite(300,200,200,200);
wall.addImage("background",wallimage);
  wall.velocityY=2;
  
  ghost=createSprite(200,500,20,20);
  ghost.addImage("ghost",ghostimage);
  ghost.scale=0.3;
  
  doorgroup=new Group();
  climbergroup=new Group();
  invisibleblockgroup=new Group();
  
  
  
}

function draw(){
  background(0);
  
  if(gamestate==="play"){
  if(wall.y>600){
    wall.y=300;    
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;    
  }
  
  if(keyDown("left")){
   ghost.x=ghost.x-2;     
  }
  
  
  if(keyDown("right")){
   ghost.x=ghost.x+2;     
  }
    ghost.velocityY=ghost.velocityY+0.1;
  
  spawndoors();
    if(invisibleblockgroup.isTouching(ghost)){
    
    gamestate="end";    
  }
    if(climbergroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    drawSprites();
 }
  
  if(gamestate==="end"){
    textSize(42);
    text("GAMEOVER",300,300);   
  }
  
}

function spawndoors(){
  if(frameCount%150===0){
door=createSprite(200,200,50,50);
  door.addAnimation("gate",doorimage);
  door.velocityY=wall.velocityY;
    door.x=Math.round(random(120,500));
    
    doorgroup.add(door);
    
  climber=createSprite(200,250,50,50);
    climber.addAnimation("climb",climberimage);
    climber.velocityY=door.velocityY;
    climber.x=door.x;
    climber.scale=0.8;
    door.depth=ghost.depth;
    ghost.depth=door.depth+1;
    
    climbergroup.add(climber);
    
    invisibleblock=createSprite(200,265,65,10);
    invisibleblock.velocityY=climber.velocityY;
    invisibleblock.x=climber.x;
    invisibleblock.visible=false;
    
    invisibleblockgroup.add(invisibleblock);
    
    
    
  }  
}