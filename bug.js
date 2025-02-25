
class Bug {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = .11;
    this.r = 18;
    this.debug = true;
  }

  flee(target){
    let force = this.seek(target);
    force.mult(-1);
    return  force;
  }

  seek(prey) {
    // Step 1: Calculate the desired velocity
    let desired = p5.Vector.sub(prey.pos, this.pos);
    
    // Step 2: Set the magnitude of the desired velocity to the maximum speed
    desired.setMag(this.maxSpeed);
    
    // Step 3: Calculate the steering force
    let steer = p5.Vector.sub(desired, this.vel);
    
    // Step 4: Limit the steering force to the maximum force
    steer.limit(this.maxForce);
    
    return steer;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  setDebug(){
    this.debug = !this.debug;
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
    strokeWeight(5);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    line(0, 0, -this.r, -20);
    line(0, 0, -this.r, 20);
    line(0, 0, this.r, -20);
    line(0, 0, this.r, 20);

    line(-this.r, -20, -this.r *1.5 , -20);
    line(-this.r, 20,  -this.r *1.5 , 20);
    line(this.r, -20, this.r *1.5 , -20);
    line( this.r, 20, this.r *1.5 , 20);

    circle(this.r, 0, 15)
    circle(-this.r, 0, 15)

    strokeWeight(2);
    line(this.r, 0, this.r *1.5 , -10);
    line( this.r, 0, this.r *1.5 , 10);
    pop();

    if (this.debug) {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      noStroke();
      fill(255);
      textSize(20);
      fill(255, 0, 0);
      circle(0, 0, this.r / 2);
      text("x: " + round(this.pos.x), 50, -50);
      text("y: " + round(this.pos.y), 50, -30);
  
      // Draw arrow for direction
      stroke(255, 0, 0);
      strokeWeight(2);
      fill(255, 0, 0);
      line(0, 0, this.r * 9, 0); // Arrow shaft
      triangle(this.r * 9, 0, this.r * 8, -5, this.r * 8, 5); // Arrowhead
  
      pop();
    }


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

class Target extends Bug {
  constructor(x, y) {
    super(x, y);
    this.r = 25;
    this.vel = p5.Vector.random2D();
    this.maxSpeed = 1.5;
  }

  show() {
    stroke(255);
    strokeWeight(5);
    fill(255, 0, 0);
    push();
    circle(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }
}
