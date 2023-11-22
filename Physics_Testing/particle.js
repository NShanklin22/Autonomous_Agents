class Particle {
    constructor(x, y) {
      this.width = random(40, 80);
      this.height = random(40,80);
      this.color = color(0,125,0);
  
      let options = {
        restitution: 0.6,
      };
      this.body = Bodies.rectangle(x, y, this.width,this.height, options);
  
      this.body.plugin.particle = this;

      console.log(engine)
  
      Composite.add(engine.world, this.body);
    }
  
    // Change color when hit
    change() {
      this.col = color(random(0, 255), random(0, 255), random(0, 255));
    }
    
    
    checkEdge() {
      return this.body.position.y > height + this.radius;
    }
    
      // This function removes a body from the Matter.js world.
    removeBody() {
      Composite.remove(engine.world, this.body);
    }
  
  
    // Drawing the box
    show() {
      fill(this.color);
      stroke(0);
      strokeWeight(2);
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      circle(0, 0, this.width, this.height);
      pop();
    }
  }