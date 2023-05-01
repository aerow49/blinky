class GooglyEye{
  constructor(x,y,s){
    this.x = x; this.y = y; this.s = s;
  }
  
  drawEye(isBlinking, eyeBounds){
    if(!isBlinking){
      fill(255);
    }else{
      fill(0);
    }
    circle(this.x, this.y, eyeBounds);
  }
  
  drawPupil(isBlinking, eyeOffset, eyeBounds){
    if(!isBlinking){
      fill(0);
      circle(this.x+eyeOffset.x, this.y+eyeOffset.y, eyeBounds/3);
    }
  }
}