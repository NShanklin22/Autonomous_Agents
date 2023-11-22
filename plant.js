class Cell{
  constructor(x, y, e) {
    this.pos = createVector(x,y);
    this.energy = e;
    this.r = this.energy / 100;
    this.color = color(0,125,0);
    this.isSplitting = false;

    let options = {
      restitution: 0.6,
    };

    this.body = Bodies.circle(x, y, this.r, options);
    this.body.plugin.particle = this;
    Composite.add(engine.world, this.body);
  }

  checkEdge() {
    return this.body.position.y > height + this.r;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    push();
    fill(this.color);
    circle(this.body.position.x, this.body.position.y, this.r)
    pop();
  }
  
  grow(){
    this.energy += random(-25,30);
    this.r = this.energy / 100;
    this.body.radius = this.r;
  }

  split(){
    let splitProb = .5
    if(random(0,1) < splitProb){
      let newCell;
      let cellRadius;
      cellRadius = this.r
      newCell = new Cell(this.body.position.x + random(-cellRadius,cellRadius),this.body.position.y+ + random(-cellRadius,cellRadius),this.energy/2);
      this.energy = this.energy/2;
      return newCell;
    }
  }

  update(){
    this.grow();
  }
}

