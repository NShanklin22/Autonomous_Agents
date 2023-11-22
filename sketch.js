
const { Engine, Bodies, Composite, Constraint, Body, Vector } = Matter; // Extracts these variables from the Particle.js Matter object

let engine; // Creates an undefined engine object

let wall; // Creates an undefined wall object
let x;

let foodAlive = false;
let CellEnergy;
let distance;
let force = 0;
let pause = true;
let tx = 1;
let ty = 50;
let cells = [];

function setup() {
  createCanvas(1920, 1080);
  fill(255,0,0);
  engine = Engine.create(); // Engine was extracted from Matter and has a built in create() method
  engine.world.gravity.y = 0;
  Cell1 = new Cell(300,300,1000);
  cells.push(Cell1)
  wallN = new Boundary(5, height/2, 10, height);
  wallS = new Boundary(width/2, height-5, width, 10);
  wallE = new Boundary(width -5, height/2, 10, height);
  wallW = new Boundary(0, height/2, 10, height);
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function handleCollisions(event) {
  for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    //{!2} When we pull the “user data” object out of the Body object, we have to remind our program that it is a Particle object.  Box2D doesn’t know this.
    let particleA = bodyA.plugin.particle;
    let particleB = bodyB.plugin.particle;    
  }
}

function mousePressed() {
  if(mouseX > width-250 && mouseX < width - 200 && mouseY > 125 && mouseY < 175){
    if(pause==false){
      pause = true;
      fill(255,0,0);
    }else{
      pause = false;
      fill(0,255,0);
    }
  }
  rect(width-250,125,50,50)
}

function draw() {
  background(0);
  uiSetup();
  noStroke();
  console.log(cells.length);
  if(cells.length == 0){
    Cell2 = new Cell(random(0,width),random(0,height),1000);
    cells.push(Cell2)
  }else{
    console.log(cells[0].energy)
  }

  
  force = universeEnergy()
  if (!pause) {
    for(i=0; i < cells.length; i++){
      cells[i].update();
      if(cells[i].energy > 2000){
        let newCell;
        newCell = cells[i].split();
        if(newCell != null){
          cells.push(newCell);
        }
      }
      if(cells[i].energy < 800){
        Composite.remove(engine.world,cells[i]);
        cells.splice(i,1);
      }
    }
    Engine.update(engine);
  }
  rect(width-250,125,50,50)
  for(i=0; i < cells.length; i++){
    cells[i].show();
  }
  wallN.show();
  wallS.show();
  wallE.show();
  wallW.show();
}

function uiSetup(){
  textSize(55);
  push();
  fill(255);
  text("Pause", width - 300, 100);
  text("Cell Energy", width - 400, 300);
  pop();
}

function universeEnergy(){
  let x;
  let y;

  //{!2} x- and y-position mapped from noise
  x = map(noise(tx), 0, 1, -.0001, .0001);
  y = map(noise(ty), 0, 1, -.0001, .0001);
  let force = createVector(x,y);
  //{!2} Move forward through “time.”
  tx += 0.01;
  ty += 0.01;

  return force;
}