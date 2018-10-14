// found solution to problem of getting class instance to refer to itself:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

function setup() {
    createCanvas (windowWidth, windowHeight);
    frameRate (30);
    noStroke();
    colorMode (HSB,360,100,100);
    randomHue = random (1, 360);
    maxTriangles = 100;
    minTriangles = 1;

    triangleSize = 250;
    triangleArray = [];

    angleMode(DEGREES);
    // rectMode(CENTER);
    isDragged = false;
    spinToggle = 1;
    deathDelay = 3000; //In miliseconds

}

function draw() {
    background(100);
    background(randomHue, 100, 100, 0.25); 
    randomHue = (randomHue + 0.5)% 360;
    // translate(windowWidth / 2 , windowHeight /2);
    // translate (mouseX, mouseY);

    triangleArray.forEach(function(triangle, index, triangleArray) {        
        // triangle.colourShift();
        triangle.show();
        // triangle.rotateThis();
        // triangle.spinDirection = 1;
        // triangle.decreaseRotate(); 
        // triangle.colourShift();
        // triangle.dragRotate();
        // if (triangle.alpha <= 0.05) {
        //   triangleArray.splice(index, 1);
        // }

        // if (isDragged){
        //   triangle.increaseRotate();
        // }  else {
        //   triangle.decreaseRotate();
        // }

        // DELETE AFTE X SECONDS
        if(triangle.isDead) {
          triangleArray.splice (index,1);
        }
    });

    ArrayClamp (triangleArray, maxTriangles);

} // end of draw

function mousePressed() { 
   if (mouseIsPressed) {
      if (mouseButton === LEFT) {
      }
      if (mouseButton === RIGHT) {
        ArrayClamp (triangleArray, 0);
      }
      
    }
}

function mouseDragged () {
    isDragged = true;
    triangleSpawn(triangleArray);
    // setTimeout(10000);                        
}

function mouseReleased() {
    isDragged = false;
}

function triangleSpawn(arr) {   
    for (i = 0; i < minTriangles; i ++) {
        // rando0 = random(-triangleSize / 2, triangleSize / 2);
        // rando1 = random(-triangleSize,triangleSize);
        // rando2 = random(-triangleSize,triangleSize);
        // var v0 = createVector (mouseX, mouseY);
        var origin = createVector(mouseX, mouseY);
        var v0 = createVector(randomTriangleSeed() /4, randomTriangleSeed() /4);
        // var v1 = createVector(randomTriangleSeed() , randomTriangleSeed());
        // var v2 = createVector(randomTriangleSeed() , randomTriangleSeed());

        // var v1 = createVector(mouseX + rando1, mouseY+ rando2);
        // var v2 = createVector(mouseX - rando2, mouseY+ rando1);

        // var hue = random (1, 360);
        var triangle = new DrawTriangle(origin, v0);
        arr.push(triangle);
    }
}

function randomTriangleSeed() {
        var num = floor(random(1, triangleSize ));
        num *= floor(random(0, 1) == 1 ? 1 : -1);
        return num; 
}


class DrawTriangle {
    constructor (origin, startPoint ) {
      // this.originX = mouseX + (triangleSize / 2) - (windowWidth / 2);
      // this.originY = mouseY + (triangleSize / 2) - (windowHeight / 2);
      this.originX = origin.x;
      this.originY = origin.y;
      this.startX = startPoint.x;
      this.startY = startPoint.y;
      this.midX = randomTriangleSeed();
      this.midY = randomTriangleSeed();
      this.endX = randomTriangleSeed();
      this.endY = randomTriangleSeed();
      this.randomAngle = random (1, 360);
      this.randomSpin = random (0, 1);
      this.hue = random (1, 360);
      this.alpha = random(0.1, 0.9);
      this.spinDirection = spinToggle;
      this.isDead = false;
      this.autoDeath = setTimeout(() => {this.dimMak()}, random(deathDelay / 2,deathDelay )); //see notes at top

    }

    // increaseRotate(direction) {
    //   rotate(this.randomAngle / (mouseY / 30 * this.spinDirection));
    // }
    // decreaseRotate() {
    //   rotate(this.randomAngle / (mouseY / 30 * this.spinDirection));
    // }
    // rotateThis() {
    //   rotate(this.randomAngle / (mouseY / 30 * this.spinDirection));
    // }

    dimMak(){
      this.isDead = true;
    }

    show() {
      push();
      // translate(windowWidth / 2 , windowHeight /2);
      translate(this.originX , this.originY);
      // rotate(this.randomAngle / (mouseY / 30 * this.spinDirection));
      rotate(this.randomAngle * this.spinDirection);
      fill(this.hue, 100, 100, this.alpha);
      
      this.randomAngle += this.randomSpin;
      triangle(this.startX, this.startY, this.midX, this.midY, this.endX, this.endY);
      spinToggle = -spinToggle;
      
      // TEST circle to show origin
      fill(100, 100, 100);
      ellipse(0, 0, 20, 20);

      pop();
    }
} // end DrawTriangle class

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

function ArrayClamp (arrayToBeChecked, maxLength) {
    var  arrLength = arrayToBeChecked.length;
    if(arrLength  > maxLength){
        arrayToBeChecked.splice(0, arrLength - maxLength);
    }
}
