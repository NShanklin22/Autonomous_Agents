
const { Engine, Bodies, Composite, Constraint, Body, Vector } = Matter; // Extracts these variables from the Particle.js Matter object

let engine; // Creates an undefined engine object
let world;
let pause = false;
let bug;
let prey;
let food;

function setup() {
  createCanvas(1920, 1080);
  fill(255,0,0);
  bug = new Bug(100, 100);
  prey = new Target(500, 200);
  worldSetup();
}

function pauseSimulation(){
  pause = !pause
  if(pause){
    button.html("Start ")
  }else{
    button.html("Stop")
  }
}

function draw() {
  background(0);
  updateMenu();
  noStroke();

  let seekForce = bug.seek(prey);
  bug.applyForce(seekForce);

  bug.update();
  bug.show();

  prey.applyForce(prey.flee(bug));
  prey.show();
  prey.update();
}

function mouseClicked(){
  food = createVector(mouseX, mouseY);
}


function updateMenu(){
  push();
  fill(255);
  textSize(20);
  pop();
}

function worldSetup(){
  engine = Engine.create(); // Engine was extracted from Matter and has a built in create() method
  world = engine.world;
  world.gravity.y = 0;
}