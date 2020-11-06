//Create variables here
var dog,happyDog,database;
var dogImg,dogHappy;
var foodobject;
var feed,add;
var FeedTime;

function preload(){
  //load images here
 dogImg = loadImage("dogImg.png");
 dogHappy = loadImage("happydog.png");

}

function setup() {
  var canvas = createCanvas(1000,500);
  database = firebase.database();

  foodobject = new Food()
  foodStock = database.ref("Food");
  dog = createSprite(500,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  var dogo = database.ref('Food');
  dogo.on("value", readPosition);
feed = createButton("FEED DRAGO")
feed.position(500,15)
feed.mousePressed(FeedDog)
add = createButton("ADD FOOD")
add.position(400,15)
add.mousePressed(AddFood)

} 



function draw(){
 { background(46,139,87);
 foodobject.display()
 
 }
 drawSprites();
  
  fill(255,255,0);
 textSize(30);
  text("press the respective buttons to feed drago or add food for him!",70,70);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogHappy)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}

