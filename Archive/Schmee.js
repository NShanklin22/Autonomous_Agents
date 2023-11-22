
class Schmee {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = .2;
    this.r = 16;
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.edges();
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r;
    } else if (this.pos.x - this.r < 0) {
      this.pos.x = 0 + this.r;
    }
    if (this.pos.y + this.r > height) {
      this.pos.y = height - this.r;
    } else if (this.pos.y - this.r < 0) {
      this.pos.y = 0 + this.r;
    }
  }
}

class Prey extends Schmee {
  constructor(x, y) {
    super(x,y)
    this.maxSpeed = 3;
    this.maxForce = .2;
  }

  flee(target){
    return this.seek(target).mult(-1);
  }

  dead(){
    this.pos.x = random(0,width);
    this.pos.y = random(0,height)
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255,0,0);
    push();
    translate(this.pos.x,this.pos.y);
    circle(0,0, 40);
  }
}