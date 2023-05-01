let width = 0, height = 0, eyes = [], eyeSize = 100;
let slider, img, blaze;

function setup() {
  slider = createSlider(0, 100, 100);
  createFileInput(handleFile);
  noStroke();
}

function draw() {
  clear();
  for(let eye of eyes){
    if(eyeSize !== slider.value()){
      eye.setS((slider.value()/100)*width);
    }
    eye.drawEye();
  }
  for(let eye of eyes){
    eye.drawPupil();  
  }
  eyeSize = slider.value();
}

async function handleFile(file) {
  if (file.type === 'image') {
    width = 0, height = 0, eyes = [], eyeSize = 100;
    img = undefined, blaze = undefined;
    img = createImg(file.data, '');
    img.hide();
    
    // if(!blaze){
      blaze = await blazeface.load();
      blaze.scoreThreshold = 0.25;
      // blaze.iouThreshold = 0.1
      console.log(blaze);
    // }
    
    const predictions = await blaze.estimateFaces(img.elt, false);
    if(predictions.length > 0){
      img.show();
      eyes = [];
      width = img.elt.width;
      height = img.elt.height;
      const canvas = createCanvas(width, height);
      for(let face of predictions){
        eyes.push(new EyePair(face.landmarks[0][0],face.landmarks[0][1],face.landmarks[1][0],face.landmarks[1][1],width))
        //eyes.push(new GooglyEye(face.landmarks[0][0], face.landmarks[0][1],width));
        //eyes.push(new GooglyEye(face.landmarks[1][0], face.landmarks[1][1],width));
      }
    }else{
      alert('No faces found in image');
    }
  } else {
    alert("File needs to be an image.")
  }
}