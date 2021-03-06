var score =0;
var gun,bubble, bullet, backBoard, gameOver;
var gunImg,bubbleImg, bulletImg, gameOverImg,  blastImg, backBoardImg;
var bubbleGroup, bulletGroup;
var obstaclesGroup;
var spaceKeyActive= false
var life =3;
var score=0;
var gameState=1
function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  bubbleImg = loadImage("waterBubble.png")
  gameOverImg = loadImage("gameOver.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  

  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  
  bulletGroup = createGroup();   
  bubbleGroup = createGroup();   
  
  heading= createElement("h2");
  scoreboard= createElement("h2");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  
    if (frameCount % 60 === 0) {
      drawBubble();
    }

    if(keyDown("space")){
      shootBullet();
      spaceKeyActive=true
    }

    if (bubbleGroup.collide(backBoard)) {
      handleGameover();
    }
    
    if(bubbleGroup.collide(bulletGroup))
    {
      handleBubbleCollision();
    }
    drawSprites();
  }
    
  
}

function drawBubble(){
   bubble = createSprite(800,random(20,780),40,40);
   bubble.addImage(bubbleImg);
   bubble.scale = 0.1;
   bubble.velocityX = -8;
   bubble.lifetime = 400;
   bubbleGroup.add(bubble);
}

function shootBullet(){
  bullet= createSprite(100, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.2
  bullet.velocityX= 5
  bulletGroup.add(bullet)
}

function handleBubbleCollision(){
  console.log("hello")
  
   //for(var i=0;  i<bubbleGroup; i++)
    //{
      //if (bubbleGroup.collide(bulletGroup(get(i)))) {
        if (life > 0) {
            score=score+1;
        }

        blast= createSprite(bullet.x+60, bullet.y, 50,50);
        blast.addImage(blastImg)
        blast.scale=0.3
        blast.life=20
        bulletGroup.destroyEach()
        bubbleGroup.destroyEach()
       
      //    bulletGroup.get(i).velocityX=0
      //    bubbleGroup.get(i).velocityX=0
      //    bulletGroup.get(i).destroy()
      //    bubbleGroup.get(i).destroy()
          
    //  }
  //}  
  
}

function handleGameover(){
  
    life=life-1;
    bubbleGroup.destroyEach();

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  //}
}
