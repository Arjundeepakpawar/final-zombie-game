var bg, bgImg
var player, shooterImg, shooterShooting
var zombie, zombieImg, zombieGroup
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var  life = 3
var score = 0
var monsterZombie, monsterZombieImg
var princess, princessImg
var bullets, bulletGroup, bulletImg
var count = 1
var monsterExists = false
var monsterLife = 200
var lifeImage


function preload(){
bgImg = loadImage("./assets/bg.jpeg")
shooterImg = loadImage("./assets/shooter_2.png")
shooterShooting = loadImage("./assets/shooter_3.png")
zombieImg = loadImage("./assets/zombie.png")
heart1Img = loadImage("./assets/heart_1.png")
heart2Img = loadImage("./assets/heart_2.png")
heart3Img = loadImage("./assets/heart_3.png")
monsterZombieImg = loadImage("./assets/zombie_monster.png")
princessImg = loadImage("./assets/princess.png")
bulletImg = loadImage("./assets/bullet.png")
lifeImage = loadImage("./assets/life.png")

}






function setup() {
  createCanvas(windowWidth, windowHeight);
 bg = createSprite(displayWidth/2 - 20,displayHeight/2 - 40,20 , 20 )
bg.addImage(bgImg)
bg.scale = 1.1
player = createSprite(displayWidth - 1150, displayHeight - 300,50,50  )
player.addImage(shooterImg)
player.scale = 0.3
player.setCollider("rectangle",0, 0, 300, 300)
zombieGroup = new Group()
heart1 = createSprite(displayWidth - 150,40,20,20)
heart1.addImage("heart1",heart1Img)
heart1.visible = false
heart1.scale = 0.4

heart2 = createSprite(displayWidth - 100,40,20,20)
heart2.addImage("heart2",heart2Img)
heart2.visible = false
heart2.scale = 0.4

heart3 = createSprite(displayWidth - 150,40,20,20)
heart3.addImage("heart3",heart3Img)
heart3.scale = 0.4
 
princess = createSprite(displayWidth - 1450,displayHeight - 450,50,50)
princess.addImage(princessImg)
princess.scale = 0.1
princess.setCollider("rectangle",0,0,400,400)

bulletGroup = new Group()


}


function draw() {
  background(0);  
  if(life === 3){
    heart3.visible = true
    heart2.visible  = false
    heart1.visible = false
  }
  else if(life === 2){
    heart3.visible = false
    heart2.visible  = true
    heart1.visible = false


  }
else if(life === 1){

  heart3.visible = false
    heart2.visible  = false
    heart1.visible = true
}
if(life === 0){
gameOver2()
zombieGroup.setVelocityXEach(0)

}
if(zombieGroup.isTouching(princess)){
gameOver2()
zombieGroup.setVelocityXEach(0)

}


  if(keyDown("UP_ARROW")&&player.y> 60 ){
  player.y = player.y - 30
  }
  if(keyDown("DOWN_ARROW")&&player.y<displayHeight - 195  ){
    player.y = player.y + 30
    }
  if(keyWentDown("space")){
  bullets = createSprite(displayWidth - 1150,player.y - 30,20,10)

  bullets.velocityX = 20
  bulletGroup.add(bullets)
  bullets.addImage(bulletImg)
  bullets.scale = 0.05 
  player.depth = bullets.depth
  player.depth = player.depth + 2
  player.addImage(shooterShooting)

  }
  else if(keyWentUp("space")){

player.addImage(shooterImg)
  }
if(zombieGroup.isTouching(player)){
for(var i = 0; i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy()
life = life-1

}

}


}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
  zombieGroup[i].destroy()
  score = score+5
  bulletGroup.destroyEach()
  
  }
  
  }
  
  
  }

if(score<=50){
  enemy()

}
else if(score>50&&score<60&&count === 1){
monsterZombie = createSprite(displayWidth - 200,random(100,500),40,40)
monsterZombie.addImage(monsterZombieImg)
monsterZombie.velocityX = -1
monsterZombie.setCollider("rectangle",0,0,600,600)
count = count-1
monsterExists = true
monsterZombie.scale = 0.3
}

  drawSprites()  
  if(monsterExists){
    if(monsterZombie.isTouching(bulletGroup)){
      for(var i = 0; i<bulletGroup.length;i++){
       if(bulletGroup[i].isTouching(monsterZombie)){
        monsterLife = monsterLife -  5
        bulletGroup[i].destroy()

       }


      }
    
    }
    
    }
    if(monsterLife===0){

monsterZombie.destroy()
bulletGroup.destroyEach()
gameOver()
    }
   
  push();
    image(lifeImage, width / 2 - 130, 50, 20, 20);
    fill("white");
    rect(width / 2 - 100, 50, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100,50, monsterLife, 20);
    noStroke();
    pop();
  textSize(20)
  fill("white")
   text("Score ="+ score,displayWidth - 200,displayHeight/2 - 220)
}
function enemy(){
  if(frameCount%100===0){
    zombie = createSprite(random(displayWidth  +  100,500),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.setCollider("rectangle",0,0,600,600)
    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }
  

}
function gameOver() {
  swal({
    title: `Game Won`,
    text: "You Killed All The Zombies",
    imageUrl:
    "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}

function gameOver2() {
  swal({
    title: `Game lost`,
    text: "You Lost The Game",
    imageUrl:
    "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}
