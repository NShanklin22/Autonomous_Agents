class Cell{
  constructor(x, y, e,generation) {
    this.pos = createVector(x,y);
    this.energy = e;
    this.r = this.energy / 100;
    this.color = color(0,125,0);
    this.isSplitting = false;
    this.generation = generation;
    this.connectedCells = [];

    let options = {
      restitution: 0.1,
    };

    this.body = Bodies.circle(x, y, this.r, options);
    this.body.plugin.particle = this;
    Composite.add(world, this.body);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    push();
    fill(this.color);
    circle(this.body.position.x, this.body.position.y, this.r)
    pop();
  }
  
  grow(universeEnergy){
    console.log(universeEnergy)
    this.energy += universeEnergy;
    this.r = this.energy / 100;
    this.body.radius = this.r;
  }

  split(splitProb){
    if(random(0,1) < splitProb && this.generation < 4){
      let newCell;
      let splitDirection = createVector(random(-1,1),random(-1,1));
      let splitDistance = this.r/2;

      let splitVector = splitDirection.copy().mult(splitDistance);

      // Calculate the position for the new cell based on splitVector
      let newX = this.body.position.x + splitVector.x;
      let newY = this.body.position.y + splitVector.y;

      push();
      stroke(255);
      strokeWeight(10);
      line(this.pos.x,this.pos.y, newX,newY);
      pop();
      newCell = new Cell(newX, newY,this.energy/2, this.generation+1);
      
      this.energy = this.energy/2;
      var options = {
          bodyA: this.body,
          bodyB: newCell.body,
          length: this.body.radius,
          stiffness: 0.40
      }
      // var constraint = Constraint.create(options)
      // Composite.add(world, constraint);
      return newCell;
    }
  }

  update(universePower){
    if(this.generation < 4){
      this.grow(universePower);
    }
  }
}

