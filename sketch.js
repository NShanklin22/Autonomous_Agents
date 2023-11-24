
const { Engine, Bodies, Composite, Constraint, Body, Vector } = Matter; // Extracts these variables from the Particle.js Matter object

let engine; // Creates an undefined engine object
let world;

let wall; // Creates an undefined wall object
let x;
let totalEnergy = 0;
let universePower;
let distance;
let force = 0;
let pause = true;
let tx = 1;
let splitProb;
let ty = 50;
let initialSetup = false;
let menuSeparation = 25;
let cells = [];
let cellsToRemove = [];

function setup() {
  createCanvas(1920, 1080);
  fill(255,0,0);
  worldSetup();

  button = createButton('Start');
  button.size(150,25)
  button.position(50, menuSeparation*13);
  button.mousePressed(pauseSimulation);

  sliderSplitProb = createSlider(0, 100, 5);
  sliderSplitProb.position(50, menuSeparation*3);
  sliderSplitProb.style('width', '150px');

  sliderSplitEnergy = createSlider(500, 10000, 2000);
  sliderSplitEnergy.position(50, menuSeparation*5);
  sliderSplitEnergy.style('width', '150px');

  slideruniversePower = createSlider(0, 50, 5);
  slideruniversePower.position(50, menuSeparation*7);
  slideruniversePower.style('width', '150px');
}

function pauseSimulation(){
  pause = !pause
  if(pause){
    button.html("Start ")
  }else{
    button.html("Stop")
  }
}

function naturalForce(){
  let x;
  let y;

  //{!2} x- and y-position mapped from noise
  x = map(noise(tx), 0, 1, -.00001, .00001);
  y = map(noise(ty), 0, 1, -.00001, .00001);
  let force = createVector(x,y);
  //{!2} Move forward through “time.”
  tx += 0.01;
  ty += 0.01;

  return force;
}

function handleCollisions(event) {
  for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    //{!2} When we pull the “user data” object out of the Body object, we have to remind our program that it is a Particle object.  Box2D doesn’t know this.
    let particleA = bodyA.plugin.particle;
    let particleB = bodyB.plugin.particle;    
    console.log(event)
  }
}

function mousePressed() {

}

function calcCellForce(Cell1,Cell2){
  var force = 10;
  var deltaVector = Matter.Vector.sub(Cell1.body.position, Cell2.body.position);
  var normalizedDelta = Matter.Vector.normalise(deltaVector);
  var forceVector = Matter.Vector.mult(normalizedDelta, force);
  // Body.applyForce(myBody, myBody.position, forceVector);
  return(normalizedDelta)
}

function draw() {
  background(0);
  updateMenu();
  noStroke();
  
  splitProb = sliderSplitProb.value()/100;

  force = naturalForce()
  if (!pause) {
    totalEnergy = 0;
    for(i=0; i <cells.length; i++){


      totalEnergy = totalEnergy + cells[i].energy
      universePower = slideruniversePower.value();
      cells[i].update(universePower);
      if(cells[i].energy > sliderSplitEnergy.value()){
        let newCell;
        newCell = cells[i].split(splitProb);
        if(newCell != null){
          cells.push(newCell);
        }
      }
      Body.applyForce( cells[i].body, {x: cells[i].body.position.x, y: cells[i].body.position.y}, force)
    }
    if(cells.length == 0){
      newCell = new Cell(random(0,width),random(0,height),1000, 1);
      cells.push(newCell)
    }
    Engine.update(engine);
    if(i > 2){
      testForce = calcCellForce(cells[0],cells[1])
      console.log(testForce)
    }
  }

  for(i=0; i < cells.length; i++){
    cells[i].show();
  }

  wallN.show();
  wallS.show();
  wallE.show();
  wallW.show();
}

function updateMenu(){
  push();
  fill(255);
  textSize(20);
  text("Split Probability", 50, menuSeparation * 3);
  text(sliderSplitProb.value() + "%", 225, menuSeparation * 3 + 15);
  text("Split Energy", 50,  menuSeparation * 5);
  text(sliderSplitEnergy.value() + " Units", 225,  menuSeparation * 5 + 20);
  text("Universe Power", 50, menuSeparation*7);
  text(slideruniversePower.value() + " Units/s", 225, menuSeparation*7 + 20);
  text("Total Cell Energy", 50, menuSeparation*9);
  text(int(totalEnergy), 50, menuSeparation*10);
  text("Total Cells", 50, menuSeparation*11);
  text(cells.length, 50, menuSeparation*12);
  // Pause/play button at 225px
  pop();
}

function worldSetup(){
  engine = Engine.create(); // Engine was extracted from Matter and has a built in create() method
  world = engine.world;
  world.gravity.y = 0;
  Cell1 = new Cell(width/2,height/2,1000,1);
  cells.push(Cell1)
  wallN = new Boundary(width/2, 0, width, 10);
  wallS = new Boundary(width/2, height-5, width, 10);
  wallE = new Boundary(width -5, height/2, 10, height);
  wallW = new Boundary(0, height/2, 10, height);
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}