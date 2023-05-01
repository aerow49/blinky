class EyePair{
  constructor(xL,yL,xR,yR,s){
    this.l = new GooglyEye(xL, yL, s), this.r = new GooglyEye(xR, yR, s), this.s = s;
    this.isBlinking = false;
    this.blinkCount = 0;
    this.eyeOffset = {x:0, y:0};
  }
  
  drawEye(){
    this.update();
    this.l.drawEye(this.isBlinking, this.eyeBounds);
    this.r.drawEye(this.isBlinking, this.eyeBounds);
  }
  
  drawPupil(){
    this.l.drawPupil(this.isBlinking, this.eyeOffset, this.eyeBounds);
    this.r.drawPupil(this.isBlinking, this.eyeOffset, this.eyeBounds);
  }
  
  update(){
    const pupilBounds = ((this.eyeBounds/3)*0.5)+(this.eyeBounds/3)/2;
    this.eyeBounds = this.s/10;
    this.eyeOffset.x = map(mouseX, 0, this.s, -pupilBounds, pupilBounds);
    this.eyeOffset.y = map(mouseY, 0, this.s, -pupilBounds, pupilBounds);
    this.isBlinking = (random(0,1000) > 995) || this.blinkCount > 0;
    if(this.isBlinking){
      if(this.blinkCount === 0){
        this.blinkCount = 20;
      }
      this.blinkCount--;
      this.isBlinking = this.blinkCount > 0;
    }
  }
  
  setS(s){
    this.s = s;
    this.l.s = s;
    this.r.s = s;
  }
}