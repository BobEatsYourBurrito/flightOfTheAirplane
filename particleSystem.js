class ParticleSystem {
  constructor(origin) {
    this.pos = origin.copy();
    this.particles = [];
  }

  addParticle(particleAmount) {
   for(let i = 0; i < particleAmount; i++) {
      this.particles.push(new Particle(this.pos));
    }
  }

  run() {
    for(let i = 0; i < this.particles.length-1; i++) {
      let p = this.particles[i];
      let force = createVector(random(-0.3,0.3),random(-0.3,0.3), 1);
      this.particles[i].applyForce(force);
      this.particles[i].update();
      this.particles[i].render();

      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }
}
