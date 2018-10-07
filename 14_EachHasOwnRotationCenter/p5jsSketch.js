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

}

function draw() {
    background(100);
    background(randomHue, 100, 100, 0.25); 
    randomHue = (randomHue + 0.5)% 360;
    translate(windowWidth / 2 , windowHeight /2);
    // translate (mouseX, mouseY);

    triangleArray.forEach(function(triangle, index, triangleArray) {        
        triangle.colourShift();
        triangle.show();
        triangle.decreaseRotate(); 
        // triangle.colourShift();
        // triangle.dragRotate();
        // if (triangle.alpha <= 0.05) {
        //   triangleArray.splice(index, 1);
        // }
        if (isDragged){
          triangle.increaseRotate();
      // triangle.colourShift();
        }  
    });



    ArrayClamp (triangleArray, maxTriangles);

} // end of draw

function mousePressed() { 
   if (mouseIsPressed) {
      if (mouseButton === LEFT) {
      }
      if (mouseButton === RIGHT) {
      }
      ArrayClamp (triangleArray, 0);
    }
}

function mouseDragged () {
    isDragged = true;
    triangleSpawn(triangleArray);
    setTimeout(10000);                        
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

        var v0 = createVector(randomTriangleSeed() /4, randomTriangleSeed() /4);
        var v1 = createVector(randomTriangleSeed() , randomTriangleSeed());
        var v2 = createVector(randomTriangleSeed() , randomTriangleSeed());

        // var v1 = createVector(mouseX + rando1, mouseY+ rando2);
        // var v2 = createVector(mouseX - rando2, mouseY+ rando1);

        var hue = random (1, 360);
        var triangle = new DrawTriangle(v0, v1, v2, hue);
        setTimeout(1000); 
        arr.push(triangle);
    }
}

function randomTriangleSeed() {
        var num = floor(random(1, triangleSize ));
        num *= floor(random(0, 1) == 1 ? 1 : -1);
        return num; 
}


class DrawTriangle {
    constructor (startPoint, midPoint, endPoint, hue) {
      this.originX = mouseX + (triangleSize / 2) - (windowWidth / 2);
      this.originY = mouseY + (triangleSize / 2) - (windowHeight / 2);
      this.startX = startPoint.x;
      this.startY = startPoint.y;
      this.midX = midPoint.x;
      this.midY = midPoint.y;
      this.endX = endPoint.x;
      this.endY = endPoint.y;
      this.randomAngle = random (1, 360);
      this.randomSpin = random (0, 1);
      this.hue = hue;
      this.alpha = random(0.1, 0.9);
    }

    colourShift() {
      this.hue = (this.hue + random(0.1, 0.5)) % 360;
    }

    increaseRotate() {
      // this.midX
      // this.midY
      // this.endX
      // this.endY
      rotate(this.randomAngle / (mouseY / 30));
    }

    decreaseRotate() {
      // this.midX
      // this.midY
      // this.endX
      // this.endY
      rotate(-this.randomAngle / (mouseX / 30));
    }

    show() {
      push();
      // translate(windowWidth / 2 , windowHeight /2);
      translate(this.originX , this.originY);

      fill(this.hue, 100, 100, this.alpha);
      // rotate(this.randomAngle);
      this.randomAngle += this.randomSpin;
      triangle(this.startX, this.startY, this.midX, this.midY, this.endX, this.endY);

      // TEST circle to show origin
      // fill(100, 100, 100);
      // ellipse(0, 0, 40, 40);

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
