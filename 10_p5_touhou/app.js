class Bullet {

  constructor(){
    this._position = createVector() // 座標
    this._velocity = createVector() // 移動ベクトル
    this._angle = 0 // 向き
  }

  update() {
    this._position.add(this._velocity)
    this._draw()
    return this._collisionField()
  }

  _draw() {
  }

  _collisionField() {
    return !(this._position.x > 0 &&
      this._position.x < width &&
      this._position.y > 0 &&
      this._position.y < height)
  }

  setPosition(postion) {
    this._position = postion
  }

  setVelocity(velocity) {
    this._velocity = velocity
    this._angle = this._velocity.heading()
  }

}

class Danmaku {

  constructor() {
    this._bullets = new Array()
  }
  update() {
    this._updateBullets()

  }

  _updateBullets() {
    this._bullets = this._bullets.filter(bullet => !bullet.update())
  }

}

class Bullet01 extends Bullet {

  constructor(){
    super()
  }

  _draw(){
    fill(255)
    noStroke()
    push()
    translate(this._position.x, this._position.y)
    push()
    rotate(this._angle)
    rect(-15,-8,30,16)
    pop()
    pop()
  }

}

class Danmaku01 extends Danmaku {

  constructor() {
    super()
  }

  update(){
    super.update()
    if(frameCount %2 === 1) {
      let bullet = new Bullet01()
      bullet.setPosition(createVector(width/2, height/2))
      bullet.setVelocity(p5.Vector.random2D().mult(5))
      this._bullets.push(bullet)
    }
  }

}

let danmaku

function setup() {
  createCanvas(windowWidth, windowHeight)
  danmaku = new Danmaku01()
}

function draw() {
  background(0)
  danmaku.update()
}
