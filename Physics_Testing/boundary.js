// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular boundary

class Boundary {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      let options = { isStatic: true };
      this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options); // creates a body object
      Composite.add(engine.world, this.body); // Adds the body object to the world
    }
  
    // Drawing the box
    // this draws the body
    show() {
      push();
      rectMode(CENTER);
      fill(127);
      noStroke();
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
  }