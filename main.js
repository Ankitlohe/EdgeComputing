let video;
let features;
let knn;
let labelP;
let ready = false;
let x;
let y;
let label = 'nothing';

function setup() {
  var cn=createCanvas(100, 300);
  cn.hide();
  video = createCapture(VIDEO);
  video.size(600, 400);
  features = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
  labelP = createP('');
  
  labelP.style('font-size', '32pt');
   labelP.id('caminput');
  labelP.addClass('caminput');
  x = width / 2;
  y = height / 2;
  
  
    var billingdiv = createDiv();
  billingdiv.style('border','1px solid black');
  billingdiv.style('padding','8px');
  billingdiv.style('margin-top','8px');
  billingdiv.id('billingdiv');
  billingdiv.addClass('billingdiv');
  
  billButton = createButton('Insert to Bill');
  billButton.style('margin-top','8px');
  billButton.style('display','block');
  billButton.style('background-color','green');
  billButton.style('border','1px solid black');
  billButton.style('font-weight','bold');
  billButton.style('font-size','18px');
  billButton.style('width','100%');
  billButton.id('blbtn');
  billButton.addClass('billbtn');
  document.getElementById("billingdiv").appendChild(billButton.elt);
document.getElementById("blbtn").setAttribute("onclick","addToBill()");


  var tbl = document.createElement("TABLE");
    tbl.setAttribute("id", "billtable");
    document.body.appendChild(tbl);
  
    var tbltr = document.createElement("TR");
    tbltr.setAttribute("id", "tbltr");
    document.getElementById("billtable").appendChild(tbltr);
  
    var td1 = document.createElement("TH");
    var tdcell1 = document.createTextNode("Sr. No");
    var td2 = document.createElement("TH");
    var tdcell2 = document.createTextNode("Product Id");

    var td3 = document.createElement("TH");
    var tdcell3 = document.createTextNode("Name of Product");
    var td4 = document.createElement("TH");
    var tdcell4 = document.createTextNode("Quantity");
    var td5 = document.createElement("TH");
    var tdcell5 = document.createTextNode("Cost Of Product");
    var td6 = document.createElement("TH");
    var tdcell6 = document.createTextNode("Final Cost Of Product");
    var td7 = document.createElement("TH");
    var tdcell7 = document.createTextNode("");

    td1.appendChild(tdcell1);
    td2.appendChild(tdcell2);
    td3.appendChild(tdcell3);
    td4.appendChild(tdcell4);
    td5.appendChild(tdcell5);
    td6.appendChild(tdcell6);
    td7.appendChild(tdcell7);
    document.getElementById("tbltr").appendChild(td1);
    document.getElementById("tbltr").appendChild(td2);
    document.getElementById("tbltr").appendChild(td3);
    document.getElementById("tbltr").appendChild(td4);
    document.getElementById("tbltr").appendChild(td5);
    document.getElementById("tbltr").appendChild(td6);
    document.getElementById("tbltr").appendChild(td7);


var tbltrtotal = document.createElement("TR");
tbltrtotal.setAttribute("id", "tbltrtotal");
document.getElementById("billtable").appendChild(tbltrtotal);

var tdtotal1 = document.createElement("TD");
var tdcelltotal1 = document.createTextNode("");
var tdtotal2 = document.createElement("TD");
var tdcelltotal2 = document.createTextNode("");

var tdtotal3 = document.createElement("TD");
var tdcelltotal3 = document.createTextNode("");
var tdtotal4 = document.createElement("TD");
var tdcelltotal4 = document.createTextNode("");
var tdtotal5 = document.createElement("TD");
var tdcelltotal5 = document.createTextNode("");
var tdtotal6 = document.createElement("TD");
var totlcost=localStorage.getItem("totalcost");

//on page reload local sorage zero

localStorage.setItem("totalcost", 0);
var tdcelltotal6 = document.createTextNode(0);
var tdtotal7 = document.createElement("TD");
var tdcelltotal7 = document.createTextNode("Final Cost");
tdtotal6.setAttribute("id", "ttl");

tdtotal1.appendChild(tdcelltotal1);
tdtotal2.appendChild(tdcelltotal2);
tdtotal3.appendChild(tdcelltotal3);
tdtotal4.appendChild(tdcelltotal4);
tdtotal5.appendChild(tdcelltotal5);
tdtotal6.appendChild(tdcelltotal6);
tdtotal7.appendChild(tdcelltotal7);
document.getElementById("tbltrtotal").appendChild(tdtotal1);
document.getElementById("tbltrtotal").appendChild(tdtotal2);
document.getElementById("tbltrtotal").appendChild(tdtotal3);
document.getElementById("tbltrtotal").appendChild(tdtotal4);
document.getElementById("tbltrtotal").appendChild(tdtotal5);
document.getElementById("tbltrtotal").appendChild(tdtotal6);
document.getElementById("tbltrtotal").appendChild(tdtotal7);
//clear entire local storage
window.localStorage.clear();
}
function addToBill(){

  let inpt=document.getElementById("caminput").innerHTML;
  let localitem=localStorage.getItem(inpt);
  
  if(localitem==null){
  var orders = [{
    productId : "234",
    productName  : "Toothpest-Small",
    qty     : 1,
    cost  : 20
    
  },{
    productId : "247",
    productName  : "Toothpest-Medium",
    qty     : 1,
    cost  : 30
  },{
    productId : "351",
    productName  : "Toothpest-Large",
    qty     : 1,
    cost  : 40
  },{
    productId : "114",
    productName  : "abc potato chips-small",
    qty     : 1,
    cost  : 10
  },{
    productId : "256",
    productName  : "abc potato chips-large",
    qty     : 1,
    cost  : 50
  },{
    productId : "257",
    productName  : "test",
    qty     : 1,
    cost  : 50
  }];
  var pid = "";
  var pname = "";
  var pqty = "";
  var pcost = "";
  var srno = document.getElementById('billtable').getElementsByTagName("tr").length;
  var i;
  var itmname=inpt;
  index = orders.findIndex(x => x.productName ===inpt);
  if(itmname===orders[index].productName){
  for(i=0;i<1;i++){
    pid += orders[index].productId;
    pname += orders[index].productName;
    pqty += orders[index].qty;
    pcost += orders[index].cost;
    
  }
 
  }
  //insert tabel row

var table = document.getElementById("billtable");
var row = table.insertRow(srno-1);//1
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);//id
var cell3 = row.insertCell(2);//name
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);
var cell7 = row.insertCell(6);
cell1.innerHTML = (srno-1);
cell2.innerHTML = pid;
cell3.innerHTML = pname;
cell4.innerHTML = pqty;
cell5.innerHTML = pcost;
cell6.innerHTML = (pcost*pqty);
cell6.setAttribute("class", "countable");
cell5.setAttribute("id","cost"+pid);
cell6.setAttribute("id","ttlcost"+pid);
cell4.setAttribute("id",pid);
cell7.innerHTML = " ";
  //sum of column

cell3.setAttribute("class", "pnm");

var cls = document.getElementById("billtable").getElementsByTagName("td");
var sum = 0;
for (var j = 0; j < cls.length; j++){
    if(cls[j].className == "countable"){
        sum += isNaN(cls[j].innerHTML) ? 0 : parseInt(cls[j].innerHTML);
    }
}
localStorage.setItem("totalcost", sum);
localStorage.setItem(pname, pid);
document.getElementById('ttl').innerHTML=localStorage.getItem("totalcost");


}else{
 var qtyitm=document.getElementById(localitem).innerHTML;
 var totalqty=parseInt(qtyitm)+1;
 var cost=document.getElementById("cost"+localitem).innerHTML;
 var finalcost=cost*totalqty;
 document.getElementById(localitem).innerHTML=totalqty;

 document.getElementById("ttlcost"+localitem).innerHTML=finalcost;

 var cls = document.getElementById("billtable").getElementsByTagName("td");
 var sum = 0;
 for (var j = 0; j < cls.length; j++){
    if(cls[j].className == "countable"){
        sum += isNaN(cls[j].innerHTML) ? 0 : parseInt(cls[j].innerHTML);
    }
 }
localStorage.setItem("totalcost", sum);
localStorage.setItem(pname, pid);
document.getElementById('ttl').innerHTML=localStorage.getItem("totalcost");

}    
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
	  //console.log(result.label);// comment on model.json`loaded otherwise uncomment
      //goClassify();// uncomment on model.json loaded otherwise comment this line
    }
	
  });
}
//let count=1;
//start line-->these line should be uncomment on model.js added otherwise comment
function gotResult(error, result){
	
	if(error){
		console.error(error);
	}else{
		labelP.html(result.label);
		
		//var t=document.getElementById("caminput").innerHTML;
		//console.log(t);
		
		/* var num=count++;
		if(num%2==0){
			//even
			labelP.html(result.label);
			if(result.label!="nothing" && result.label!=""){	
			addToBill();
			console.log("inserted.."+count);	
			noLoop();
			//delay
			;
		}
		}else{	
			 setTimeout(function () { loop(); }, 10000);
			 console.log("Waiting");
			 
			 
		} */
		
	}
}


 /* function mousePressed(){
	if(knn.getNumLabels()>0){
		
		
	 const logits = features.infer(video);
	 knn.classify(logits,gotResult);
	}
}  */
//End line---->
function keyPressed() {
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
}

function modelReady() {
  console.log('model ready!');
  // Comment back in to load your own model!
   knn.load('model.json', function() {   //comment these lines
     console.log('knn loaded');			//on deleting
   });									//model.json from root folder
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
  if(knn.getNumLabels()>0){	
	 const logits = features.infer(video);
	 knn.classify(logits,gotResult);
	 
	}

    
//console.log(label);
  //image(video, 0, 0);
  /* if (!ready && knn.getNumLabels() > 0) {
    goClassify();
    ready = true;
  } */
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