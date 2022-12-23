Status="";
input="";
objects=[];

function preload(){

}

function setup(){
canvas=createCanvas(600,400);
canvas.center();
video=createCapture(VIDEO);
video.size(600,400);
video.hide();
}

function draw(){
image(video,0,0,600,400);
if(Status != ""){
objectdetector.detect(video,gotresults);
for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML="Status: Detected";
console.log("objects.length");
fill("red");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x +20, objects[i].y+20);
noFill();
stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label==input){
video.stop;
objectdetector.detect(gotresults);
document.getElementById("found").innerHTML= input + " " + "found";
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance(input+"found");
synth.speak(utterThis);
}
else{
document.getElementById("found").innerHTML= input + " " + "not found";
}
}
}
}

function startdetect(){
objectdetector=ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="Status: Detecting";
input = document.getElementById("input").value;
}

function modelloaded(){
console.log("'modelloaded'");
Status=true;
}

function gotresults(error,results){
if(error){
console.log(error);
}
else{
console.log(results);
objects=results;
}
}