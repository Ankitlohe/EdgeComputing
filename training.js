let video;
let features;
let knn;
let labelP;
let ready = false;
let x;
let y;
let label = 'nothing';
let smallToothpest;
function setup() {
  var cn=createCanvas(320, 240);
  cn.hide();
  video = createCapture(VIDEO);
  video.size(320, 240);
  features = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
  labelP = createP('');
 
  labelP.style('font-size', '32pt');
  x = width / 2;
  y = height / 2;
 
  smallToothpest = createButton('Toothpest-Small');
  smallToothpest.id('smalltootpest');
  smallToothpest.addClass('trnbtn');

  smallToothpest.mousePressed(function() {
	     const logits = features.infer(video);
  knn.addExample(logits, 'Toothpest-Small');
  console.log('Toothpest-Small');
  goClassify();
  });

  mediumToothpest = createButton('Toothpest-Medium');
  mediumToothpest.id('MediumTootpest');
  mediumToothpest.addClass('trnbtn');
  mediumToothpest.mousePressed(function() {
  const logits = features.infer(video);
  knn.addExample(logits, 'Toothpest-Medium');
  console.log('Toothpest-Medium');
  goClassify();
  });

  largeToothpest = createButton('Toothpest-Large');
  largeToothpest.id('LargeTootpest');
  largeToothpest.addClass('trnbtn');
  largeToothpest.mousePressed(function() {
  const logits = features.infer(video);
  knn.addExample(logits, 'Toothpest-Large');
  console.log('Toothpest-Large');
  goClassify();
  });

  saveButton = createButton('save');
  saveButton.id('savebtn');
  
  saveButton.mousePressed(function () {
    save(knn, 'model.json');
  });
  var div = createDiv();
  div.style('border','1px solid black');
  div.style('padding','8px');
  div.id('trainingdiv');
  div.addClass('trainingdiv');
  
 // let trntitle=createElement('h1','Training Module');
 // trntitle.style('text-align','center');
  //document.getElementById("trainingdiv").appendChild(trntitle.elt);
  document.getElementById("trainingdiv").appendChild(largeToothpest.elt);
  document.getElementById("trainingdiv").appendChild(mediumToothpest.elt);
  document.getElementById("trainingdiv").appendChild(smallToothpest.elt);
  document.getElementById("trainingdiv").appendChild(saveButton.elt);
  
}

function goClassify() {
  const logits = features.infer(video);
  knn.classify(logits, function(error, result) {
    if (error) {
      console.error(error);
    } else {
     
	  label = result.label;
      labelP.html(result.label);
	  //console.log(result);
	  console.log(result.label);// comment on model.json`loaded otherwise uncomment
      //goClassify();// uncomment on model.json loaded otherwise comment this line
    }
	
  });
}

//start line-->these line should be uncomment on model.js added otherwise comment
/* function gotResult(error, result){
	if(error){
		console.error(error);
	}else{
		labelP.html(result.label);
		//console.log(result);
	}
}


 function mousePressed(){
	if(knn.getNumLabels()>0){
		
		
	 const logits = features.infer(video);
	 knn.classify(logits,gotResult);
	}
}  */
//End line---->
  
/* function keyPressed() {
  const logits = features.infer(video);
  if (key == 'l') {
    knn.addExample(logits, 'left');
    console.log('left');
  } else if (key == 'r') {
    knn.addExample(logits, 'right');
    console.log('right');
  } else if (key == 'u') {
    knn.addExample(logits, 'up');
    console.log('up');
  } else if (key == 'd') {
    knn.addExample(logits, 'down');
    console.log('down');
  } else if (key == 's') {
    save(knn, 'model.json');
    //knn.save('model.json');
  }
} */

function modelReady() {
  console.log('model ready!');
  // Comment back in to load your own model!
  // knn.load('model.json', function() {   //comment these lines
   //  console.log('knn loaded');			//on deleting
   //});									//model.json from root folder
}

function draw() {
  background(0);
  fill(255);
  ellipse(x, y, 24);

  if (label == 'left') {
    x--;
  } else if (label == 'right') {
    x++;
  } else if (label == 'up') {
    y--;
  } else if (label == 'down') {
    y++;
  }

  //image(video, 0, 0);
  if (!ready && knn.getNumLabels() > 0) {
    goClassify();
    ready = true;
  }
}

// Temporary save code until ml5 version 0.2.2
const save = (knn, name) => {
  const dataset = knn.knnClassifier.getClassifierDataset();
  if (knn.mapStringToIndex.length > 0) {
    Object.keys(dataset).forEach(key => {
      if (knn.mapStringToIndex[key]) {
        dataset[key].label = knn.mapStringToIndex[key];
      }
    });
  }
  const tensors = Object.keys(dataset).map(key => {
    const t = dataset[key];
    if (t) {
      return t.dataSync();
    }
    return null;
  });
  let fileName = 'myKNN.json';
  if (name) {
    fileName = name.endsWith('.json') ? name : `${name}.json`;
  }
  saveFile(fileName, JSON.stringify({ dataset, tensors }));
};

const saveFile = (name, data) => {
  const downloadElt = document.createElement('a');
  const blob = new Blob([data], { type: 'octet/stream' });
  const url = URL.createObjectURL(blob);
  downloadElt.setAttribute('href', url);
  downloadElt.setAttribute('download', name);
  downloadElt.style.display = 'none';
  document.body.appendChild(downloadElt);
  downloadElt.click();
  document.body.removeChild(downloadElt);
  URL.revokeObjectURL(url);
};